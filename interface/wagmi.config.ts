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
        [baseSepolia.id]: "0x86Ad3a06D4A28abfF9460CC4A604F83c4d537Fa7",
      },
    },
  ],
  plugins: [react()],
});
