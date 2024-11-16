import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { baseSepolia } from "wagmi/chains";
import gameAbi from "./src/abis/Game";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "game",
      abi: gameAbi,
      address: {
        [baseSepolia.id]: "0x474e84b54C897e062001b13CdB97497BB515b68b",
      },
    },
  ],
  plugins: [react()],
});
