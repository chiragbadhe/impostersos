/* eslint-disable @next/next/no-img-element */
import { formatAddress } from "@/utils/format";
import { playersWithMetadata } from "@/utils/game";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

interface WaitingLobbyProps {
  roomId: bigint;
  players: Address[];
}

export default function WaitingLobby({ players }: WaitingLobbyProps) {
  const { data: playersData } = useQuery({
    queryKey: ["players", players],
    queryFn: async () => {
      return await playersWithMetadata({ players });
    },
  });

  return (
    <>
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
                <div className="flex flex-col space-y-2 items-start text-gray-900">
                  <span className="text-xl font-semibold block">
                    {player.ensName
                      ? player.ensName
                      : formatAddress(player.address)}
                  </span>
                  <span className="text-sm text-gray-500">ID: {i}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
