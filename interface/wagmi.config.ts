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
        [baseSepolia.id]: "0x6E45968ceC51384F15B1161D03179AD5Bf0C341A",
      },
    },
  ],
  plugins: [react()],
});
