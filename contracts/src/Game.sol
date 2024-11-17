// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract CatchTheImposter is IEntropyConsumer {
    IEntropy public entropy;
    uint256 public stakeAmount;
    address public immutable owner;

    uint256 public constant GAME_DURATION = 10 minutes;

    uint256 private roomCount;

    struct Room {
        address[] players;
        mapping(address => bool) votesSubmitted;
        mapping(address => address) votes;
        mapping(address => bool) isCorrect;
        uint256 totalPlayers;
        uint256 gameStartTime;
        uint256 totalVotes;
        uint256 imposterIndex;
        bool gameStarted;
        bool gameEnded;
        mapping(address => uint256) rewards;
        mapping(address => bool) rewardClaimed;
        uint256 forfeitedStake;
        uint256 correctGuessers;
        bool rewardsCalculated;
        string ipfsHash;
    }

    mapping(uint256 => Room) public rooms;

    event RoomCreated(uint256 indexed roomId, address indexed creator);
    event GameEnded(uint256 indexed roomId, address[] players);

    error GameNotEnded();
    error PlayerNotInRoom();
    error RewardAlreadyClaimed();
    error NoRewardAvailable();

    mapping(uint64 => uint256) private pendingRooms; // Maps sequence number to roomId
    mapping(uint256 => bool) private roomPending; // Tracks if room is waiting for random number

    constructor(uint256 _stakeAmount, address _entropyAddress) {
        entropy = IEntropy(_entropyAddress);
        owner = msg.sender;
        stakeAmount = _stakeAmount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setStakeAmount(uint256 _newStakeAmount) external onlyOwner {
        require(_newStakeAmount > 0, "Stake amount must be greater than 0");
        stakeAmount = _newStakeAmount;
    }

    function getRoomPlayers(
        uint256 roomId
    ) external view returns (address[] memory) {
        return rooms[roomId].players;
    }

    function createRoom(
        uint256 numberOfPlayers,
        string calldata _ipfsHash,
        uint256 _imposterIndex,
        bool usePyth
    ) external payable {
        require(
            numberOfPlayers >= 3 && numberOfPlayers <= 6,
            "Invalid number of players"
        );
        require(msg.value == stakeAmount, "Incorrect stake amount");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        if (!usePyth)
            require(_imposterIndex < numberOfPlayers, "Invalid imposter index");

        uint256 roomId = roomCount;
        roomCount++;

        Room storage room = rooms[roomId];
        room.totalPlayers = numberOfPlayers;
        room.gameStarted = false;
        room.gameEnded = false;
        room.totalVotes = 0;
        room.gameStartTime = 0;
        room.players = new address[](0);
        room.players.push(msg.sender);
        room.ipfsHash = _ipfsHash;

        if (usePyth) {
            roomPending[roomId] = true;
            _requestRandomNumber(
                keccak256(abi.encodePacked(roomId, block.timestamp))
            );
        } else {
            room.imposterIndex = _imposterIndex;
        }

        emit RoomCreated(roomId, msg.sender);
    }

    function joinRoom(uint256 roomId) external payable {
        Room storage room = rooms[roomId];
        require(room.players.length > 0, "Room does not exist");
        require(!room.gameStarted, "Game already started");
        require(!roomPending[roomId], "Room waiting for random number");
        require(room.players.length < 6, "Room is full");
        require(msg.value == stakeAmount, "Incorrect stake amount");

        for (uint256 i = 0; i < room.players.length; i++) {
            require(room.players[i] != msg.sender, "Player already joined");
        }

        room.players.push(msg.sender);

        // Start the game when the last player joins
        if (room.players.length == room.totalPlayers) {
            room.gameStarted = true;
            room.gameStartTime = block.timestamp;
        }
    }

    function vote(uint256 roomId, address voteFor) external {
        Room storage room = rooms[roomId];
        require(room.gameStarted, "Game has not started");
        require(!room.gameEnded, "Game has ended");
        require(
            block.timestamp <= room.gameStartTime + GAME_DURATION,
            "Voting period has ended"
        );
        require(!room.votesSubmitted[msg.sender], "Player has already voted");

        bool isValidVote = false;
        for (uint256 i = 0; i < room.players.length; i++) {
            if (room.players[i] == voteFor) {
                isValidVote = true;
                break;
            }
        }
        require(isValidVote, "Invalid vote");

        room.votesSubmitted[msg.sender] = true;
        room.votes[msg.sender] = voteFor;

        // Track if the vote is correct
        if (
            voteFor == room.players[room.imposterIndex] &&
            msg.sender != room.players[room.imposterIndex]
        ) {
            room.isCorrect[msg.sender] = true;
        }

        room.totalVotes++;

        // Call endGame if this was the last vote
        if (room.totalVotes == room.players.length) {
            endGame(roomId);
        }
    }

    function endGame(uint256 roomId) public {
        Room storage room = rooms[roomId];
        require(room.gameStarted, "Game has not started");
        require(!room.gameEnded, "Game already ended");
        require(
            block.timestamp >= room.gameStartTime + GAME_DURATION ||
                room.totalVotes == room.players.length,
            "Game still active"
        );

        room.gameEnded = true;
        _calculateRewards(roomId);

        emit GameEnded(roomId, room.players);
    }

    function hasPlayerVoted(
        uint256 roomId,
        address player
    ) external view returns (bool) {
        Room storage room = rooms[roomId];
        require(room.players.length > 0, "Room does not exist");

        bool isPlayerInRoom = false;
        for (uint256 i = 0; i < room.players.length; i++) {
            if (room.players[i] == player) {
                isPlayerInRoom = true;
                break;
            }
        }
        require(isPlayerInRoom, "Player is not in this room");

        return room.votesSubmitted[player];
    }

    function _calculateRewards(uint256 roomId) internal {
        Room storage room = rooms[roomId];
        if (!room.gameEnded) revert GameNotEnded();
        if (room.rewardsCalculated) return; // Already calculated

        // First pass: calculate forfeited stakes and correct guessers
        for (uint256 i = 0; i < room.players.length; i++) {
            address player = room.players[i];
            if (!room.votesSubmitted[player]) {
                room.forfeitedStake += stakeAmount;
            } else if (room.isCorrect[player]) {
                room.correctGuessers++;
            } else {
                room.forfeitedStake += stakeAmount;
            }
        }

        // Second pass: calculate and store each player's reward
        uint256 rewardPerCorrect = room.correctGuessers > 0
            ? room.forfeitedStake / room.correctGuessers
            : 0;
        address imposter = room.players[room.imposterIndex];

        for (uint256 i = 0; i < room.players.length; i++) {
            address player = room.players[i];

            if (room.correctGuessers == room.players.length - 1) {
                room.rewards[player] = stakeAmount; // Everyone gets stake back
            } else if (room.isCorrect[player]) {
                room.rewards[player] = stakeAmount + rewardPerCorrect;
            } else if (player == imposter && room.votes[player] == imposter) {
                room.rewards[player] = stakeAmount;
            } else {
                room.rewards[player] = 0;
            }
        }

        room.rewardsCalculated = true;
    }

    function claimReward(uint256 roomId) external {
        Room storage room = rooms[roomId];
        if (!room.gameEnded) revert GameNotEnded();
        if (!room.rewardsCalculated) revert("Rewards not calculated");
        if (room.rewardClaimed[msg.sender]) revert RewardAlreadyClaimed();

        uint256 reward = room.rewards[msg.sender];
        if (reward == 0) revert NoRewardAvailable();

        room.rewardClaimed[msg.sender] = true;
        payable(msg.sender).transfer(reward);
    }

    function getClaimableReward(
        uint256 roomId,
        address player
    ) external view returns (uint256) {
        Room storage room = rooms[roomId];
        if (
            !room.gameEnded ||
            !room.rewardsCalculated ||
            room.rewardClaimed[player]
        ) return 0;

        return room.rewards[player];
    }

    // @param userRandomNumber The random number generated by the user.
    function _requestRandomNumber(bytes32 userRandomNumber) internal {
        address entropyProvider = entropy.getDefaultProvider();
        uint256 fee = entropy.getFee(entropyProvider);

        // Get sequence number from entropy request
        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(
            entropyProvider,
            userRandomNumber
        );

        // Store roomId for this request
        pendingRooms[sequenceNumber] = roomCount - 1;
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {
        uint256 roomId = pendingRooms[sequenceNumber];
        Room storage room = rooms[roomId];

        require(roomPending[roomId], "Room not pending");

        // Calculate imposter index based on total players
        room.imposterIndex = uint256(randomNumber) % room.totalPlayers;

        // Clean up
        roomPending[roomId] = false;
        delete pendingRooms[sequenceNumber];
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    function _mapRandomNumber(
        bytes32 randomNumber,
        uint256 totalPlayers
    ) internal pure returns (uint256) {
        uint256 range = totalPlayers - 1;
        return uint256(randomNumber) % range;
    }

    function isRoomPending(uint256 roomId) external view returns (bool) {
        return roomPending[roomId];
    }

    function getImposter(uint256 roomId) external view returns (address) {
        Room storage room = rooms[roomId];
        require(room.players.length > 0, "Room does not exist");
        require(room.gameStarted, "Game has not started");
        return room.players[room.imposterIndex];
    }

    function hasClaimedReward(
        uint256 roomId,
        address player
    ) external view returns (bool) {
        Room storage room = rooms[roomId];
        require(room.players.length > 0, "Room does not exist");
        return room.rewardClaimed[player];
    }
}
