export default [
  {
    type: "constructor",
    inputs: [],
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
    name: "STAKE_AMOUNT",
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
    name: "createRoom",
    inputs: [
      {
        name: "roomId",
        type: "uint256",
        internalType: "uint256",
      },
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
] as const;
