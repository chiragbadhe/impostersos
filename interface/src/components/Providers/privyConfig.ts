import type { PrivyClientConfig } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
  loginMethods: ["wallet"],
  appearance: {
    showWalletLoginFirst: true,
  },
  supportedChains: [baseSepolia],
};
