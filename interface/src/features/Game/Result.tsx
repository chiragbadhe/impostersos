import {
  useReadGameGetClaimableReward,
  useReadGameHasClaimedReward,
  useWriteGameClaimReward,
} from "@/generated";
import { SupportedChain, supportedChain } from "@/utils/chain";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { formatEther } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";

interface ResultProps {
  roomId: bigint;
  setPopConfetti: (v: boolean) => void;
}

export function Result({ roomId, setPopConfetti }: ResultProps) {
  const [claimHash, setClaimHash] = useState("");
  const { address, chain } = useAccount();
  const { data: hasAlreadyClaimed, refetch: fetchClaimStatus } =
    useReadGameHasClaimedReward({
      args: address ? [roomId, address] : undefined,
    });

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
            setClaimHash(hash);
            await client?.waitForTransactionReceipt({ hash });
            await fetchClaimStatus();
            setPopConfetti(true);
          }
        } catch (error) {
          console.error("Failed to claim", error);
        }
      },
    });

  return (
    <>
      <div className="flex flex-col space-y-4 relative items-center justify-center">
        {claimableReward && claimableReward > BigInt(0) ? (
          <p className="text-2xl">🎉 Congratulations, You Earned 🎉</p>
        ) : isFetchingClaimableReward ? (
          <p className="text-2xl">Calculating Reward...</p>
        ) : (
          <p className="text-2xl text-red-300">Better Luck Next Time!</p>
        )}
        {claimableReward && (
          <div className="text-5xl">
            {formatEther(claimableReward)}{" "}
            {supportedChain[(chain?.id as SupportedChain) ?? 84532]
              .nativeCurrency.symbol ?? "ETH"}
          </div>
        )}
        <div className="flex items-center space-x-4">
          {claimableReward &&
          claimableReward > BigInt(0) &&
          !hasAlreadyClaimed ? (
            <button
              onClick={() => handleClaimReward()}
              disabled={isClaimPending}
              className="px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 bg-white text-green-600 hover:scale-105"
            >
              {isClaimPending ? "Claiming..." : "Claim Reward"}
            </button>
          ) : (
            <Link href="/">
              <button className="px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 bg-white text-gray-900 hover:scale-105">
                Play Again!
              </button>
            </Link>
          )}
          {hasAlreadyClaimed && (
            <Link
              href={`${supportedChain[(chain?.id as SupportedChain) ?? 84532].blockscoutExplorer}/tx/${claimHash}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 bg-white text-gray-900 hover:scale-105">
                View on Blockscout
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
