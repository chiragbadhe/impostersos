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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const gameAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'GAME_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'STAKE_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roomId', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'roomId', internalType: 'uint256', type: 'uint256' }],
    name: 'joinRoom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rooms',
    outputs: [
      { name: 'gameStartTime', internalType: 'uint256', type: 'uint256' },
      { name: 'totalVotes', internalType: 'uint256', type: 'uint256' },
      { name: 'imposterIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'gameStarted', internalType: 'bool', type: 'bool' },
      { name: 'gameEnded', internalType: 'bool', type: 'bool' },
    ],
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
] as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const gameAddress = {
  84532: '0x474e84b54C897e062001b13CdB97497BB515b68b',
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const gameConfig = { address: gameAddress, abi: gameAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useReadGame = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"GAME_DURATION"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useReadGameGameDuration = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'GAME_DURATION',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"STAKE_AMOUNT"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useReadGameStakeAmount = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'STAKE_AMOUNT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"rooms"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useReadGameRooms = /*#__PURE__*/ createUseReadContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'rooms',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWriteGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWriteGameCreateRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'createRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"endGame"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWriteGameEndGame = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWriteGameJoinRoom = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"vote"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWriteGameVote = /*#__PURE__*/ createUseWriteContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useSimulateGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"createRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useSimulateGameEndGame = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'endGame',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"joinRoom"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useSimulateGameJoinRoom = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'joinRoom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gameAbi}__ and `functionName` set to `"vote"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useSimulateGameVote = /*#__PURE__*/ createUseSimulateContract({
  abi: gameAbi,
  address: gameAddress,
  functionName: 'vote',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWatchGameEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gameAbi,
  address: gameAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gameAbi}__ and `eventName` set to `"GameEnded"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
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
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x474e84b54C897e062001b13CdB97497BB515b68b)
 */
export const useWatchGameRoomCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gameAbi,
    address: gameAddress,
    eventName: 'RoomCreated',
  })
