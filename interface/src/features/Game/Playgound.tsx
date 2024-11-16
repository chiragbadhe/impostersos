/* eslint-disable @next/next/no-img-element */
import {
  useReadGameGetImposter,
  useReadGameHasPlayerVoted,
  useWriteGameVote,
} from "@/generated";
import { formatAddress } from "@/utils/format";
import { playersWithMetadata } from "@/utils/game";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mic, MicOff } from "lucide-react";
import { useMemo, useState } from "react";
import { Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";

interface PlaygroundProps {
  players: Address[];
  roomId: bigint;
  ipfs: string;
}

export function Playground({ players, roomId, ipfs }: PlaygroundProps) {
  const [selectedImposter, setSelectedImposter] = useState<Address | null>(
    null
  );
  const [isMuted, setIsMuted] = useState(false);
  const { address } = useAccount();

  const { data: hasAlreadyVoted } = useReadGameHasPlayerVoted({
    args: address ? [roomId, address] : undefined,
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: playersData } = useQuery({
    queryKey: ["players", players],
    queryFn: async () => {
      return await playersWithMetadata({ players });
    },
  });

  const client = usePublicClient({ chainId: baseSepolia.id }); // TODO: support more chains
  const { writeContractAsync: vote } = useWriteGameVote();
  const { mutateAsync: handleVote, isPending: isVotePending } = useMutation({
    mutationKey: ["vote"],
    mutationFn: async () => {
      try {
        if (!selectedImposter) return;
        console.log(`voting for ${selectedImposter} as imposter...`);
        const hash = await vote({
          args: [roomId, selectedImposter],
        });
        await client?.waitForTransactionReceipt({ hash });
      } catch (error) {
        console.error("Failed to vote", error);
      }
    },
  });

  const { data: photos, isLoading: isPhotosLoading } = useQuery({
    queryKey: ["photos", ipfs],
    queryFn: async () => {
      const response = await fetch(
        `https://moccasin-anxious-heron-473.mypinata.cloud/ipfs/${ipfs}`
      );
      const photos = await response.json();
      return photos;
    },
  });

  const { data: imposter } = useReadGameGetImposter({ args: [roomId] });

  const isImposter = useMemo(() => {
    if (!address || !imposter) return false;
    return address.toLowerCase() === imposter.toLowerCase();
  }, [address, imposter]);

  const handleSelectImposter = (address: Address) =>
    setSelectedImposter(address);
  const toggleMute = () => setIsMuted((muted) => !muted);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="p-2 rounded-xl w-[256px] h-[256px]">
        {isPhotosLoading ? (
          <svg
            className="animate-spin h-6 w-6 md:h-8 md:w-8 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <img
            src={isImposter ? photos[1]?.src?.medium : photos[0]?.src?.medium}
            alt="Game Image"
            className="w-full h-full object-contain rounded-md"
            width={256}
            height={256}
          />
        )}
      </div>
      <div className="flex flex-col w-full space-y-4">
        {playersData &&
          playersData.map((player, i) => (
            <div
              key={player.address}
              onClick={() => {
                if (hasAlreadyVoted) return;
                handleSelectImposter(player.address);
              }}
              className={`p-4 m-2 shadow-lg backdrop-blur-md flex items-center justify-between rounded-lg w-full cursor-pointer ${
                selectedImposter === player.address
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={player.avatar}
                  alt={`Profile of ${player.address}`}
                  className="w-16 h-16 mr-4 rounded-full shadow-md"
                />
                <div className="flex flex-col space-y-1">
                  <span className="text-xl font-semibold block">
                    {player.ensName
                      ? player.ensName
                      : formatAddress(player.address)}
                  </span>
                  <span className="text-sm text-gray-300">ID: {i}</span>
                </div>
              </div>
              {!hasAlreadyVoted && (
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="imposter"
                    value={player.address}
                    checked={selectedImposter === player.address}
                    onChange={() => handleSelectImposter(player.address)}
                    className="w-6 h-6 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                  />
                </div>
              )}
            </div>
          ))}
        <div className="bg-white p-2 rounded-full flex items-center space-x-2 w-full md:max-w-80 md:mx-auto">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors shadow-lg focus:outline-none`}
          >
            {isMuted ? <Mic /> : <MicOff />}
          </button>
          <button
            onClick={() => {
              handleVote();
            }}
            disabled={!selectedImposter || isVotePending || hasAlreadyVoted}
            className={`px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 ${
              selectedImposter
                ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                : "bg-green-400 cursor-not-allowed text-white"
            }`}
          >
            {isVotePending
              ? "Voting..."
              : hasAlreadyVoted
                ? "Voted!"
                : "Mark as Imposter"}
          </button>
        </div>
      </div>
    </div>
  );
}
