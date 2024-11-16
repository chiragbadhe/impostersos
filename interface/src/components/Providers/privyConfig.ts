import type { PrivyClientConfig } from "@privy-io/react-auth";
import {
  baseSepolia,
  flowTestnet,
  lineaSepolia,
  mantleSepoliaTestnet,
  morphHolesky,
  scrollSepolia,
} from "viem/chains";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
  loginMethods: ["wallet"],
  appearance: {
    showWalletLoginFirst: true,
  },
  supportedChains: [
    baseSepolia,
    flowTestnet,
    mantleSepoliaTestnet,
    scrollSepolia,
    morphHolesky,
    lineaSepolia,
  ],
};
