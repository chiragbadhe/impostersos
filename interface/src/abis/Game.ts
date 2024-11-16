export default [
  {
    type: "constructor",
    inputs: [
      {
        name: "_stakeAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "GAME_DURATION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimReward",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createRoom",
    inputs: [
      {
        name: "numberOfPlayers",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "imposterIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "endGame",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getClaimableReward",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "player",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoomPlayers",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasPlayerVoted",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "player",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "joinRoom",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rooms",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "totalPlayers",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "gameStartTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalVotes",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "imposterIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "gameStarted",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "gameEnded",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "forfeitedStake",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "correctGuessers",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "rewardsCalculated",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setStakeAmount",
    inputs: [
      {
        name: "_newStakeAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stakeAmount",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vote",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "voteFor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "GameEnded",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "players",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoomCreated",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "GameNotEnded",
    inputs: [],
  },
  {
    type: "error",
    name: "NoRewardAvailable",
    inputs: [],
  },
  {
    type: "error",
    name: "PlayerNotInRoom",
    inputs: [],
  },
  {
    type: "error",
    name: "RewardAlreadyClaimed",
    inputs: [],
  },
] as const;
