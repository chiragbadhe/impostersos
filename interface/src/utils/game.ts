import { Address } from "viem";
import { getENSName } from "./ens";
import { generateRandomNumber } from "./random";

export function generateRandomPlayerIndex(players: number) {
  if (!players || players < 2 || players > 6) return 0;
  return Math.floor(Math.random() * players);
}

interface PlayerData {
  address: Address;
  ensName: string | null;
  avatar: string;
}

export async function playersWithMetadata({
  players,
}: {
  players: Address[];
}): Promise<PlayerData[]> {
  const results = await Promise.all(
    players.map(async (address) => {
      try {
        const ensName = await getENSName(address);
        const avatar = ensName
          ? `https://metadata.ens.domains/mainnet/avatar/${ensName}`
          : `https://noun.pics/${generateRandomNumber(1001)}`;

        return {
          address,
          ensName,
          avatar,
        };
      } catch (error) {
        console.error(`Error formatting player ${address}:`, error);
        return null;
      }
    })
  );

  return results.filter(Boolean) as PlayerData[];
}
