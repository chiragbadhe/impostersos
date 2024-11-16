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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const gameAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_stakeAmount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numberOfPlayers', internalType: 'uint256', type: 'uint256' },
      { name: 'imposterIndex', internalType: 'uint256', type: 'uint256' },
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
    name: 'hasPlayerVoted',
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const gameAddress = {
  84532: '0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7',
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const gameConfig = { address: gameAddress, abi: gameAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGame = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"GAME_DURATION"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameGameDuration = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'GAME_DURATION',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getClaimableReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameGetClaimableReward =
  /*#__PURE__*/ createUseReadContract({
    abi: gameAbi,
    address: gameAddress,
    functionName: 'getClaimableReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"getRoomPlayers"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameGetRoomPlayers = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'getRoomPlayers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"hasPlayerVoted"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameHasPlayerVoted = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'hasPlayerVoted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameOwner = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"rooms"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameRooms = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'rooms',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"stakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useReadGameStakeAmount = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'stakeAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"claimReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameClaimReward = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'claimReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameCreateRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'createRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"endGame"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameEndGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameJoinRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"setStakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameSetStakeAmount = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'setStakeAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"vote"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWriteGameVote = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useSimulateGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"claimReward"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useSimulateGameEndGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useSimulateGameJoinRoom = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"setStakeAmount"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useSimulateGameVote = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWatchGameEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__ and `eventName` set to `"GameEnded"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7)
 */
export const useWatchGameRoomCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameAbi,
    address: gameAddress,
    eventName: 'RoomCreated',
  })
