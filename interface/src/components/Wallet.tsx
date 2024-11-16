"use client";

import { formatAddress } from "@/utils/format";
import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

const Wallet = () => {
  // Privy hooks
  const { ready, user, authenticated, isModalOpen } = usePrivy();
  const { login } = useLogin();
  const { wallets, ready: walletsReady } = useWallets();

  // WAGMI hooks
  const { isConnecting } = useAccount();
  const { setActiveWallet } = useSetActiveWallet();

  // privy connected wallet
  const privyAddress = useMemo(
    () => (ready && user ? (user.email?.address as Address) : undefined),
    [ready, user]
  );

  useEffect(() => {
    if (walletsReady) {
      const wallet = wallets.find((wallet) => wallet.address === privyAddress);
      if (wallet) setActiveWallet(wallet);
    }
  }, [privyAddress, setActiveWallet, wallets, walletsReady]);

  return (
    <>
      {ready && authenticated ? (
        <button className="bg-white text-zinc-800 text-lg rounded-xl px-4 py-2">
          <div className="flex items-center space-x-2">
            <Image
              src={`https://noun.pics/0`}
              alt="avatar"
              className="rounded-full w-6 h-6"
              width={24}
              height={24}
            />
            <p className="">
              {formatAddress(user?.wallet?.address as Address)}
            </p>
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
