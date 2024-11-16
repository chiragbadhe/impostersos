/* eslint-disable @next/next/no-img-element */
import { useReadGameHasPlayerVoted, useWriteGameVote } from "@/generated";
import { formatAddress } from "@/utils/format";
import { playersWithMetadata } from "@/utils/game";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";

interface PlaygroundProps {
  players: Address[];
  roomId: bigint;
}

export function Playground({ players, roomId }: PlaygroundProps) {
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

  const handleSelectImposter = (address: Address) =>
    setSelectedImposter(address);
  const toggleMute = () => setIsMuted((muted) => !muted);

  return (
    <div className="flex flex-col space-y-6 relative">
      <div className="p-2 rounded-xl bg-white">
        <img
          src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/10/Among-Us-Impostor-Screen.jpg"
          alt="Game Image"
          className="w-full h-full object-cover shadow-xl rounded-md"
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col w-full space-y-4">
        {playersData &&
          playersData.map((player, i) => (
            <div
              key={player.address}
              onClick={() => handleSelectImposter(player.address)}
              className={`p-4 m-2 shadow-lg backdrop-blur-md flex items-center justify-between rounded-lg w-full cursor-pointer ${
                selectedImposter === player.address
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-4">
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
            </div>
          ))}
      </div>
      <div className="absolute bottom-4 inset-x-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full flex items-center space-x-2">
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
          disabled={!selectedImposter || isVotePending}
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
  );
}