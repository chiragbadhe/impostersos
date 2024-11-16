/* eslint-disable @next/next/no-img-element */
import { formatAddress } from "@/utils/format";
import { playersWithMetadata } from "@/utils/game";
import { useQuery } from "@tanstack/react-query";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { Address } from "viem";

interface WaitingLobbyProps {
  roomId: bigint;
  players: Address[];
}

export default function WaitingLobby({ roomId, players }: WaitingLobbyProps) {
  const { data: playersData } = useQuery({
    queryKey: ["players", players],
    queryFn: async () => {
      return await playersWithMetadata({ players });
    },
  });

  const [hasCopied, setHasCopied] = useState(false);
  const inviteLink = `${window.location.origin}?room=${roomId}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border flex flex-col text-gray-900">
        <div className="flex items-center justify-between w-full">
          <span className="truncate">{inviteLink}</span>
          <button onClick={handleCopyLink} className="ml-2">
            {hasCopied ? (
              <CopyCheck className="h-6 w-6 text-green-600" />
            ) : (
              <Copy className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 rounded-xl overflow-hidden">
        {playersData?.map((player, i) => {
          return (
            <div
              key={player.address}
              className={`flex items-center justify-between rounded-lg w-full`}
            >
              <div className="flex items-center">
                <img
                  src={player.avatar}
                  alt={`Profile of ${player.address}`}
                  className="w-16 h-16 mr-4 rounded-full"
                />
                <div className="flex flex-col space-y-1 items-start text-white">
                  <span className="text-xl font-semibold block">
                    {player.ensName
                      ? player.ensName
                      : formatAddress(player.address)}
                  </span>
                  <span className="text-sm text-gray-200">ID: {i}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
