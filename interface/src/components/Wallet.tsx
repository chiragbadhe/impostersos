/* eslint-disable @next/next/no-img-element */
"use client";

import { getENSName } from "@/utils/ens";
import { formatAddress } from "@/utils/format";
import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const Wallet = () => {
  // Privy hooks
  const { ready, authenticated, isModalOpen } = usePrivy();
  const { login } = useLogin();
  const { wallets, ready: walletsReady } = useWallets();
  // WAGMI hooks
  const { address, isConnecting } = useAccount();
  const { setActiveWallet } = useSetActiveWallet();

  const { data: ensName } = useQuery({
    queryKey: ["ens", address],
    queryFn: () => (address ? getENSName(address) : null),
    enabled: !!address,
  });

  // Update active wallet when MetaMask account changes
  useEffect(() => {
    if (walletsReady && address) {
      const wallet = wallets.find(
        (w) => w.address?.toLowerCase() === address?.toLowerCase()
      );
      if (wallet) setActiveWallet(wallet);
    }
  }, [wallets, walletsReady, setActiveWallet, address]);

  return (
    <>
      {ready && authenticated ? (
        <button className="bg-white text-zinc-800 text-lg rounded-xl px-4 py-2">
          <div className="flex items-center space-x-2">
            <img
              src={
                ensName
                  ? `https://metadata.ens.domains/mainnet/avatar/${ensName}`
                  : `https://noun.pics/0`
              }
              alt="avatar"
              className="rounded-full w-6 h-6"
              width={24}
              height={24}
            />
            <p className="">{ensName || formatAddress(address)}</p>
          </div>
        </button>
      ) : (
        <button
          disabled={isModalOpen || isConnecting}
          onClick={login}
          className="bg-white text-zinc-800 text-lg rounded-xl px-4 py-2"
        >
          {isModalOpen || (isConnecting && <LoaderCircle />)}
          <p>Connect</p>
        </button>
      )}
    </>
  );
};

export default Wallet;
