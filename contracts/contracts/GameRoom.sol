// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Reward.sol";

contract GameRoom is Ownable {
    struct Vote {
        address voter;
        address suspect;
        bool hasVoted;
    }

    struct Room {
        string roomId;
        address[] players;
        uint256 imposterImageIndex;
        bool isActive;
        mapping(address => uint256) guesses;
        mapping(address => Vote) votes;
        uint256 minPlayers;
        uint256 maxPlayers;
        uint256 startTime;
        uint256 endTime;
        uint256 votingEndTime;
        mapping(address => uint256) voteCount;
        bool votingStarted;
    }

    Reward public rewardToken;
    mapping(string => Room) public rooms;
    mapping(address => string) public playerCurrentRoom;
    uint256 public constant GAME_DURATION = 300; // 5 minutes
    uint256 public constant VOTING_DURATION = 120; // 2 minutes
    uint256 public constant REWARD_AMOUNT = 100 * 10**18; // 100 tokens

    event RoomCreated(string roomId, address creator);
    event PlayerJoined(string roomId, address player);
    event GuessSubmitted(string roomId, address player, uint256 guessIndex);
    event GameStarted(string roomId, uint256 startTime);
    event VotingStarted(string roomId, uint256 votingStartTime);
    event VoteSubmitted(string roomId, address voter, address suspect);
    event GameEnded(string roomId, address[] winners);

    constructor(address _rewardToken) {
        rewardToken = Reward(_rewardToken);
    }

    function createRoom(string memory roomId, uint256 minPlayers, uint256 maxPlayers) public {
        require(rooms[roomId].players.length == 0, "Room already exists");
        require(minPlayers >= 3 && maxPlayers <= 10, "Invalid player limits");
        
        Room storage newRoom = rooms[roomId];
        newRoom.roomId = roomId;
        newRoom.isActive = true;
        newRoom.minPlayers = minPlayers;
        newRoom.maxPlayers = maxPlayers;
        newRoom.players.push(msg.sender);
        newRoom.votingStarted = false;
        
        playerCurrentRoom[msg.sender] = roomId;
        emit RoomCreated(roomId, msg.sender);
    }

    function joinRoom(string memory roomId) public {
        Room storage room = rooms[roomId];
        require(room.isActive, "Room does not exist");
        require(room.players.length < room.maxPlayers, "Room is full");
        require(bytes(playerCurrentRoom[msg.sender]).length == 0, "Already in a room");

        room.players.push(msg.sender);
        playerCurrentRoom[msg.sender] = roomId;
        emit PlayerJoined(roomId, msg.sender);

        if (room.players.length >= room.minPlayers) {
            startGame(roomId);
        }
    }

    function startGame(string memory roomId) internal {
        Room storage room = rooms[roomId];
        require(room.isActive, "Room is not active");
        require(room.startTime == 0, "Game already started");

        room.startTime = block.timestamp;
        room.endTime = block.timestamp + GAME_DURATION;
        room.imposterImageIndex = uint256(keccak256(abi.encodePacked(block.timestamp, roomId))) % 9; // 0-8 for 9 images

        emit GameStarted(roomId, room.startTime);
    }

    function submitGuess(string memory roomId, uint256 guessIndex) public {
        Room storage room = rooms[roomId];
        require(room.isActive, "Room is not active");
        require(room.startTime > 0 && block.timestamp <= room.endTime, "Game not in progress");
        require(bytes(playerCurrentRoom[msg.sender]).length > 0, "Not in room");

        room.guesses[msg.sender] = guessIndex;
        emit GuessSubmitted(roomId, msg.sender, guessIndex);

        // Check if all players have submitted guesses
        bool allGuessed = true;
        for (uint i = 0; i < room.players.length; i++) {
            if (room.guesses[room.players[i]] == 0) {
                allGuessed = false;
                break;
            }
        }

        if (allGuessed) {
            startVoting(roomId);
        }
    }

    function startVoting(string memory roomId) internal {
        Room storage room = rooms[roomId];
        require(!room.votingStarted, "Voting already started");
        
        room.votingStarted = true;
        room.votingEndTime = block.timestamp + VOTING_DURATION;
        emit VotingStarted(roomId, block.timestamp);
    }

    function submitVote(string memory roomId, address suspect) public {
        Room storage room = rooms[roomId];
        require(room.votingStarted, "Voting not started");
        require(block.timestamp <= room.votingEndTime, "Voting period ended");
        require(!room.votes[msg.sender].hasVoted, "Already voted");
        require(isPlayerInRoom(roomId, suspect), "Suspect not in room");

        room.votes[msg.sender] = Vote(msg.sender, suspect, true);
        room.voteCount[suspect]++;
        
        emit VoteSubmitted(roomId, msg.sender, suspect);

        // Check if all players have voted
        bool allVoted = true;
        for (uint i = 0; i < room.players.length; i++) {
            if (!room.votes[room.players[i]].hasVoted) {
                allVoted = false;
                break;
            }
        }

        if (allVoted || block.timestamp >= room.votingEndTime) {
            endGame(roomId);
        }
    }

    function isPlayerInRoom(string memory roomId, address player) internal view returns (bool) {
        Room storage room = rooms[roomId];
        for (uint i = 0; i < room.players.length; i++) {
            if (room.players[i] == player) {
                return true;
            }
        }
        return false;
    }

    function endGame(string memory roomId) public {
        Room storage room = rooms[roomId];
        require(room.isActive, "Room not active");
        require(room.startTime > 0, "Game not started");
        require(block.timestamp >= room.votingEndTime || msg.sender == owner(), "Voting still in progress");

        // Find winners - players who correctly guessed the imposter image AND voted for the most suspected player
        address mostSuspectedPlayer = findMostSuspectedPlayer(roomId);
        address[] memory winners = new address[](room.players.length);
        uint256 winnerCount = 0;

        for (uint i = 0; i < room.players.length; i++) {
            address player = room.players[i];
            if (room.guesses[player] == room.imposterImageIndex && 
                room.votes[player].hasVoted && 
                room.votes[player].suspect == mostSuspectedPlayer) {
                winners[winnerCount] = player;
                winnerCount++;
            }
        }

        // Distribute rewards
        address[] memory finalWinners = new address[](winnerCount);
        for (uint i = 0; i < winnerCount; i++) {
            finalWinners[i] = winners[i];
        }

        rewardToken.distributeRewards(finalWinners, REWARD_AMOUNT);
        
        room.isActive = false;
        emit GameEnded(roomId, finalWinners);

        // Clear player room assignments
        for (uint i = 0; i < room.players.length; i++) {
            delete playerCurrentRoom[room.players[i]];
        }
    }

    function findMostSuspectedPlayer(string memory roomId) internal view returns (address) {
        Room storage room = rooms[roomId];
        address mostSuspected = address(0);
        uint256 maxVotes = 0;

        for (uint i = 0; i < room.players.length; i++) {
            address player = room.players[i];
            if (room.voteCount[player] > maxVotes) {
                maxVotes = room.voteCount[player];
                mostSuspected = player;
            }
        }

        return mostSuspected;
    }

    function getRoomPlayers(string memory roomId) public view returns (address[] memory) {
        return rooms[roomId].players;
    }

    function getRoomStatus(string memory roomId) public view returns (
        bool isActive,
        uint256 playerCount,
        uint256 startTime,
        uint256 endTime,
        uint256 votingEndTime,
        bool votingStarted
    ) {
        Room storage room = rooms[roomId];
        return (
            room.isActive,
            room.players.length,
            room.startTime,
            room.endTime,
            room.votingEndTime,
            room.votingStarted
        );
    }
}