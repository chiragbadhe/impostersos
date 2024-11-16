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
        [baseSepolia.id]: "0xe441fB85AEd17A1eF3481B7620D10e3801a45760",
      },
    },
  ],
  plugins: [react()],
});
