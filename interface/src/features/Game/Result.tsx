import {
  useReadGameGetClaimableReward,
  useWriteGameClaimReward,
} from "@/generated";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { formatEther } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";

interface ResultProps {
  roomId: bigint;
}

export function Result({ roomId }: ResultProps) {
  const { address } = useAccount();
  const router = useRouter();

  const { data: claimableReward, isPending: isFetchingClaimableReward } =
    useReadGameGetClaimableReward({
      args: address ? [roomId, address] : undefined,
    });
  const client = usePublicClient({ chainId: baseSepolia.id }); // TODO: support more chains
  const { writeContractAsync: claimReward } = useWriteGameClaimReward();
  const { mutateAsync: handleClaimReward, isPending: isClaimPending } =
    useMutation({
      mutationKey: ["claim"],
      mutationFn: async () => {
        try {
          if (claimableReward && claimableReward > BigInt(0)) {
            const hash = await claimReward({
              args: [roomId],
            });
            await client?.waitForTransactionReceipt({ hash });
            // TODO: replace w/ confetti here
            router.push("/");
          }
        } catch (error) {
          console.error("Failed to claim", error);
        }
      },
    });

  return (
    <div className="flex flex-col space-y-4 relative items-center justify-center">
      {claimableReward && claimableReward > BigInt(0) ? (
        <p className="text-2xl">🎉 Congratulations, You Earned 🎉</p>
      ) : isFetchingClaimableReward ? (
        <p className="text-2xl">Calculating Reward...</p>
      ) : (
        <p className="text-2xl text-red-300">Better Luck Next Time!</p>
      )}
      {claimableReward && (
        <div className="text-5xl">{formatEther(claimableReward)} ETH</div>
      )}
      {claimableReward && claimableReward > BigInt(0) && (
        <button
          onClick={() => {
            handleClaimReward();
          }}
          disabled={isClaimPending}
          className={`px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 bg-white text-green-600 hover:scale-105`}
        >
          {isClaimPending ? "Claiming..." : "Claim Reward"}
        </button>
      )}
    </div>
  );
}
