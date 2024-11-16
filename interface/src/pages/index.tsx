import Header from "@/components/Header";
import { useWriteGameCreateRoom, useWriteGameJoinRoom } from "@/generated";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { baseSepolia } from "viem/chains";
import { usePublicClient } from "wagmi";
import { decodeEventLog, parseEther } from "viem";
import gameAbi from "@/abis/Game";
import { useMutation } from "@tanstack/react-query";
import { generateImages } from "@/utils/image";
import { pinata } from "@/utils/ipfs";

export default function Home() {
  const router = useRouter();
  const { room } = router.query;
  const [roomId, setRoomId] = useState("");
  const [numPlayers, setNumPlayers] = useState<number>(3);

  useEffect(() => {
    if (room && typeof room === "string") setRoomId(room);
  }, [room]);

  const client = usePublicClient({ chainId: baseSepolia.id }); // TODO: support more chains
  const { writeContractAsync: createRoom } = useWriteGameCreateRoom();
  const { writeContractAsync: joinRoom } = useWriteGameJoinRoom();

  const { mutateAsync: handleCreateRoom, isPending: isRoomCreationPending } =
    useMutation({
      mutationKey: ["createRoom", createRoom, client, numPlayers, router],
      mutationFn: async () => {
        try {
          const photos = await generateImages();

          if ("photos" in photos) {
            const { IpfsHash } = await pinata.upload.json(photos.photos, {
              groupId: "230b2a95-9360-4560-a6b7-37fc57346f91",
            });

            const hash = await createRoom({
              args: [BigInt(numPlayers), IpfsHash],
              value: parseEther("0.0001"),
            });

            const receipt = await client?.waitForTransactionReceipt({ hash });
            if (!receipt) throw new Error("Failed to get transaction receipt");
            if (!receipt.logs?.[0]) throw new Error("No event logs found");

            const { args } = decodeEventLog({
              abi: gameAbi,
              data: receipt.logs[1].data,
              topics: receipt.logs[1].topics,
            });

            const newRoomId = args.roomId;
            console.log("Room created with ID:", newRoomId);
            router.push(`/room/${newRoomId}`);
          } else {
            throw new Error("Failed to generate images");
          }
        } catch (error) {
          console.error("Failed to create room:", error);
        }
      },
    });

  const { mutateAsync: handleJoinRoom, isPending: isRoomJoinPending } =
    useMutation({
      mutationKey: ["joinRoom", router],
      mutationFn: async () => {
        try {
          const hash = await joinRoom({
            args: [BigInt(roomId as string)],
            value: parseEther("0.0001"),
          });

          const receipt = await client?.waitForTransactionReceipt({ hash });
          if (!receipt) throw new Error("Failed to get transaction receipt");

          router.push(`/room/${roomId}`);
        } catch (error) {
          console.error("Failed to create room:", error);
        }
      },
    });

  return (
    <div className={`min-h-screen w-full overflow-hidden relative`}>
      <Header />
      <div className="container mx-auto px-4 flex items-center justify-center flex-col my-[40px] md:my-[70px] relative">
        {/* Floating animated shapes in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-float-slow absolute top-20 left-10 w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
          <div className="animate-float-medium absolute bottom-40 right-20 w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
          <div className="animate-float-fast absolute top-1/2 left-1/3 w-20 md:w-24 h-20 md:h-24 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-xl" />
        </div>

        <div className="text-center mb-10 md:mb-16 relative">
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-3 md:mb-4 animate-pulse-slow">
            Imposter Quest
          </h1>
          <p className="text-purple-200 text-lg md:text-2xl font-semibold tracking-wide px-4">
            Find the imposter. Win the prize. Become a legend.
          </p>
          <div className="absolute -top-8 -right-6 md:-top-10 md:-right-10 animate-bounce-slow">
            <span className="text-4xl md:text-6xl">🎮</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl relative px-4">
          {/* Create Room Card */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-2 border-[#ff2e63]/30 hover:border-[#ff2e63]/50 transition-all duration-300">
            <h3 className="text-xl md:text-2xl text-white mb-4 md:mb-6 text-center font-bold">
              Create New Room
            </h3>
            <p className="text-gray-300 text-center text-sm md:text-base mb-6">
              Create your own game room and invite friends to join. Set custom
              rules and start playing!
            </p>

            <div
              className="w-full bg-white/10 text-white text-lg md:text-xl py-3 md:py-4 px-4 md:px-6 rounded-xl
                         placeholder-white/50 outline-none border-2 border-[#ff2e63]/30 mb-[16px]
                         focus:border-[#ff2e63] transition-all duration-300"
            >
              <div className="relative">
                <select
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(Number(e.target.value))}
                  className="w-full h-full appearance-none outline-none bg-transparent border-none text-white text-lg md:text-xl rounded-xl flex items-center justif"
                >
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                  <option value={5}>5 Players</option>
                  <option value={6}>6 Players</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCreateRoom()}
              disabled={isRoomCreationPending}
              className="w-full bg-gradient-to-r from-[#ff2e63] to-[#ff447c]
                       text-white text-xl md:text-2xl font-bold py-4 md:py-6 px-6 md:px-8 rounded-2xl
                       transform transition-all duration-300
                       hover:scale-105 hover:shadow-[0_0_50px_rgba(255,46,99,0.4)]
                       active:scale-95 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              <span className="flex items-center justify-center gap-3">
                {isRoomCreationPending ? (
                  <svg
                    className="animate-spin h-6 w-6 md:h-8 md:w-8 text-white"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 group-hover:rotate-180 transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                Create Room
              </span>
            </button>
          </div>

          {/* Join Room Card */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-2 border-[#4d79ff]/30 hover:border-[#4d79ff]/50 transition-all duration-300">
            <h3 className="text-xl md:text-2xl text-white mb-4 md:mb-6 text-center font-bold">
              Join Existing Room
            </h3>
            <p className="text-gray-300 text-center text-sm md:text-base mb-6">
              Enter a room ID to join an existing game. Connect with other
              players and compete together! A deposit of 5 USDC is required to
              join the room.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-white/10 text-white text-lg md:text-xl py-3 md:py-4 px-4 md:px-6 rounded-xl
                         placeholder-white/50 outline-none border-2 border-[#4d79ff]/30
                         focus:border-[#4d79ff] transition-all duration-300"
              />
              <button
                onClick={() => handleJoinRoom()}
                className="w-full bg-gradient-to-r from-[#4d79ff] to-[#668aff]
                         text-white text-xl md:text-2xl font-bold py-4 md:py-6 px-6 md:px-8 rounded-2xl
                         transform transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_50px_rgba(77,121,255,0.4)]
                         active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="flex items-center justify-center gap-3">
                  {isRoomJoinPending ? (
                    <svg
                      className="animate-spin h-6 w-6 md:h-8 md:w-8 text-white"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14"
                      />
                    </svg>
                  )}
                  Join Room
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-12 px-4 w-full max-w-4xl">
          {[
            {
              label: "Players Online",
              value: "1,248",
              icon: "👥",
              color: "from-pink-500 to-purple-500",
            },
            {
              label: "Active Games",
              value: "42",
              icon: "🎮",
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Prize Pool",
              value: "5.5 ETH",
              icon: "💎",
              color: "from-purple-500 to-indigo-500",
            },
            {
              label: "Games Played",
              value: "12,456",
              icon: "🏆",
              color: "from-orange-500 to-yellow-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-all duration-300 hover:-rotate-3 cursor-pointer"
            >
              <div
                className={`p-4 md:p-6 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 backdrop-blur-sm border border-white/10`}
              >
                <div className="text-3xl md:text-5xl mb-2 md:mb-3 animate-bounce-slow">
                  {stat.icon}
                </div>
                <p className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 text-shadow-glow">
                  {stat.value}
                </p>
                <p className="text-[#8f8fa3] text-sm md:text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
