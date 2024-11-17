import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import {
  baseSepolia,
  flowTestnet,
  morphHolesky,
  scrollSepolia,
} from "wagmi/chains";
import gameAbi from "./src/abis/Game";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "game",
      abi: gameAbi,
      address: {
        [baseSepolia.id]: "0x6E45968ceC51384F15B1161D03179AD5Bf0C341A",
        [flowTestnet.id]: "0x4a56DaC578438f566e71587a256a823c8a75B376",
        [scrollSepolia.id]: "0x4a56DaC578438f566e71587a256a823c8a75B376",
        [morphHolesky.id]: "0x4a56DaC578438f566e71587a256a823c8a75B376",
      },
    },
  ],
  plugins: [react()],
});
