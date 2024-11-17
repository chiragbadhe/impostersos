import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { useReadGameGetRoomPlayers, useReadGameRooms } from "@/generated";
import Timer from "@/components/Timer";
import WaitingLobby from "@/features/Game/WaitingLobby";
import { Playground } from "@/features/Game/Playgound";
import { Result } from "@/features/Game/Result";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const RoomPage = () => {
  const router = useRouter();

  const { id: roomId } = router.query;

  const [isTimerExpired, setIsTimeExpired] = useState(false);
  const [popConfetti, setPopConfetti] = useState(false);

  const { width, height } = useWindowSize();
  const { data: players } = useReadGameGetRoomPlayers({
    args: roomId ? [BigInt(roomId as string)] : undefined,
    query: {
      refetchInterval: 2000,
      staleTime: 0,
      placeholderData: (prev) => prev,
    },
  });
  const { data: room } = useReadGameRooms({
    args: roomId ? [BigInt(roomId as string)] : undefined,
    query: {
      refetchInterval: 2000,
    },
  });

  const isValidRoom = useMemo(() => room && room[0] > BigInt(0), [room]);
  const isGameEnded = useMemo(() => room && room[5], [room]);
  const ipfs = useMemo(() => (room ? room[9] : ""), [room]);
  const remainingPlayers = useMemo(() => {
    if (isValidRoom && players && room) {
      return Number(room[0] - BigInt(players.length));
    }
  }, [isValidRoom, players, room]);

  if (!isValidRoom) return null;

  return (
    <div className="min-h-screen text-white relative">
      <Header />
      <div className="max-w-2xl mx-[12px] border border-white/25 rounded-2xl sm:mx-auto p-8 shadow-2xl bg-black/20 backdrop-blur-sm my-[50px] flex flex-col space-y-6">
        <div className="flex items-center justify-between space-x-8">
          {!isGameEnded && (
            <h1 className="text-4xl font-extrabold text-center ">
              Room: {roomId}
            </h1>
          )}
          {room && room[4] && !room[5] && !isTimerExpired ? (
            <Timer
              minutes={10}
              startedAt={room && Number(room[1])}
              setIsExpired={setIsTimeExpired}
            />
          ) : room && !room[4] ? (
            <p className="text-right">
              Waiting for other {remainingPlayers} Players...
            </p>
          ) : null}
        </div>
        {room && !room[4] ? (
          <WaitingLobby
            roomId={BigInt(roomId as string)}
            players={players ? [...players] : []}
          />
        ) : (room && room[5]) || isTimerExpired ? (
          <Result
            roomId={BigInt(roomId as string)}
            setPopConfetti={setPopConfetti}
          />
        ) : (
          <Playground
            roomId={BigInt(roomId as string)}
            players={players ? [...players] : []}
            ipfs={ipfs}
          />
        )}
      </div>
      {popConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}
    </div>
  );
};

export default RoomPage;
