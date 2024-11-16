import { baseSepolia, flowTestnet } from "viem/chains";
import { http } from "wagmi";

import { createConfig } from "@privy-io/wagmi";

export const config = createConfig({
  chains: [baseSepolia, flowTestnet],
  transports: {
    [baseSepolia.id]: http(),
    [flowTestnet.id]: http(),
  },
});
