import {
  baseSepolia,
  flowTestnet,
  morphHolesky,
  scrollSepolia,
} from "viem/chains";

export const supportedChain = {
  [baseSepolia.id]: {
    ...baseSepolia,
    usePyth: true,
    blockscoutExplorer: "https://base-sepolia.blockscout.com",
  },
  [scrollSepolia.id]: {
    ...scrollSepolia,
    usePyth: false,
    blockscoutExplorer: "https://scroll-sepolia.blockscout.com",
  },
  [flowTestnet.id]: {
    ...flowTestnet,
    usePyth: false,
    blockscoutExplorer: "https://evm-testnet.flowscan.io",
  },
  [morphHolesky.id]: {
    ...morphHolesky,
    usePyth: false,
    blockscoutExplorer: "https://explorer-holesky.morphl2.io",
  },
} as const;

export type SupportedChain = keyof typeof supportedChain;
