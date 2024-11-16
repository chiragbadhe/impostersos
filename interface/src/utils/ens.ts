import { Address, createPublicClient, GetEnsTextParameters, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://attentive-chaotic-river.quiknode.pro/dc83840c9306d1c2a504f0334109a8647433e5d9"
  ),
});

export async function getENSName(address: Address) {
  return client.getEnsName({ address });
}

export async function getEnsText(args: GetEnsTextParameters) {
  return client.getEnsText(args);
}
