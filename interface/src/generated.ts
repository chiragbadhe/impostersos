import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const gameAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_stakeAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_entropyAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'GAME_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sequence', internalType: 'uint64', type: 'uint64' },
      { name: 'provider', internalType: 'address', type: 'address' },
      { name: 'randomNumber', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: '_entropyCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numberOfPlayers', internalType: 'uint256', type: 'uint256' },
      { name: '_ipfsHash', internalType: 'string', type: 'string' },
      { name: '_imposterIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'usePyth', internalType: 'bool', type: 'bool' },
    ],
    name: 'createRoom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'endGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'entropy',
    outputs: [{ name: '', internalType: 'contract IEntropy', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roomId', internalType: 'uint256', type: 'uint256' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'getClaimableReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'getImposter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'getRoomPlayers',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roomId', internalType: 'uint256', type: 'uint256' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'hasClaimedReward',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roomId', internalType: 'uint256', type: 'uint256' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'hasPlayerVoted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'isRoomPending',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'joinRoom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rooms',
    outputs: [
      { name: 'totalPlayers', internalType: 'uint256', type: 'uint256' },
      { name: 'gameStartTime', internalType: 'uint256', type: 'uint256' },
      { name: 'totalVotes', internalType: 'uint256', type: 'uint256' },
      { name: 'imposterIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'gameStarted', internalType: 'bool', type: 'bool' },
      { name: 'gameEnded', internalType: 'bool', type: 'bool' },
      { name: 'forfeitedStake', internalType: 'uint256', type: 'uint256' },
      { name: 'correctGuessers', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardsCalculated', internalType: 'bool', type: 'bool' },
      { name: 'ipfsHash', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newStakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setStakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roomId', internalType: 'uint256', type: 'uint256' },
      { name: 'voteFor', internalType: 'address', type: 'address' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'roomId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'players',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'GameEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'roomId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoomCreated',
  },
  { type: 'error', inputs: [], name: 'GameNotEnded' },
  { type: 'error', inputs: [], name: 'NoRewardAvailable' },
  { type: 'error', inputs: [], name: 'PlayerNotInRoom' },
  { type: 'error', inputs: [], name: 'RewardAlreadyClaimed' },
] as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const gameAddress = {
  84532: '0x6E45968ceC51384F15B1161D03179AD5Bf0C341A',
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const gameConfig = { address: gameAddress, abi: gameAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGame = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"GAME_DURATION"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameGameDuration = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'GAME_DURATION',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"entropy"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameEntropy = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'entropy',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getClaimableReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameGetClaimableReward =
  /*#__PURE__*/ createUseReadContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: 'getClaimableReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getImposter"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameGetImposter = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'getImposter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getRoomPlayers"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameGetRoomPlayers = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'getRoomPlayers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"hasClaimedReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameHasClaimedReward = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'hasClaimedReward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"hasPlayerVoted"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameHasPlayerVoted = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'hasPlayerVoted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"isRoomPending"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameIsRoomPending = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'isRoomPending',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameOwner = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"rooms"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameRooms = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'rooms',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"stakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useReadGameStakeAmount = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'stakeAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"_entropyCallback"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameEntropyCallback = /*#__PURE__*/ createUseWriteContract(
  { abi: gameAbi, address: gameAddress, functionName: '_entropyCallback' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"claimReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameClaimReward = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'claimReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameCreateRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'createRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"endGame"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameEndGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameJoinRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"setStakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameSetStakeAmount = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'setStakeAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"vote"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWriteGameVote = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"_entropyCallback"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameEntropyCallback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: '_entropyCallback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"claimReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameCreateRoom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: 'createRoom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"endGame"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameEndGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameJoinRoom = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"setStakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameSetStakeAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: 'setStakeAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"vote"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useSimulateGameVote = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWatchGameEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__ and `eventName` set to `"GameEnded"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWatchGameGameEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameAbi,
    address: gameAddress,
    eventName: 'GameEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__ and `eventName` set to `"RoomCreated"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6E45968ceC51384F15B1161D03179AD5Bf0C341A)
 */
export const useWatchGameRoomCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameAbi,
    address: gameAddress,
    eventName: 'RoomCreated',
  })
