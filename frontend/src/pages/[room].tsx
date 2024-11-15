import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

const RoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  // Helper function to generate a random integer between 0 and 1000
  const generateRandomNumber = () => Math.floor(Math.random() * 1001);

  const [players, setPlayers] = useState([
    {
      id: "0x123",
      name: "Player 1",
      profilePicture: `https://noun.pics/${generateRandomNumber()}`,
      isImposter: false,
      isSpeaking: true,
    },
    {
      id: "0x456",
      name: "Player 2",
      profilePicture: `https://noun.pics/${generateRandomNumber()}`,
      isImposter: false,
      isSpeaking: false,
    },
    {
      id: "0x789",
      name: "Player 3",
      profilePicture: `https://noun.pics/${generateRandomNumber()}`,
      isImposter: false,
      isSpeaking: true,
    },
  ]);

  const [selectedImposterId, setSelectedImposterId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!roomId) return;

    // Initialize room connection here
    console.log(`Joined room: ${roomId}`);
    // Assuming there's a function to fetch players from the room
    // fetchPlayers(roomId).then(players => setPlayers(players));
  }, [roomId]);

  const handleSelectImposter = (id: string) => {
    setSelectedImposterId(id);
  };

  const handleVote = () => {
    if (selectedImposterId) {
      // Implement the voting logic here
      console.log(`Voted for imposter: ${selectedImposterId}`);
      // Example: sendVote(roomId, selectedImposterId);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />
      <div className="max-w-2xl mx-[12px] border border-white/25 sm:mx-auto p-8 shadow-2xl bg-black/20 backdrop-blur-sm my-[50px]">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
          Room: {roomId}
        </h1>
        <div className="mb-8">
          <img
            src="https://example.com/game-image.png"
            alt="Game Image"
            className="w-full mb-6 shadow-xl"
          />
          <p className="text-2xl font-semibold text-center mb-4">
            Hints to play:
          </p>
          <ul className="list-disc pl-10 text-lg space-y-2">
            <li>
              Communicate with your team to figure out who the imposter is.
            </li>
            <li>Be careful not to accuse the wrong person.</li>
            <li>Work together to complete tasks and eliminate the imposter.</li>
          </ul>
        </div>
        <div className="flex flex-col w-full space-y-4">
          {players.map((player) => (
            <div
              key={player.id}
              onClick={() => handleSelectImposter(player.id)}
              className={`p-4 m-2 shadow-lg backdrop-blur-md flex items-center justify-between rounded-lg w-full cursor-pointer ${
                selectedImposterId === player.id ? "ring-2 ring-green-500" : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={player.profilePicture}
                  alt={`Profile of ${player.name}`}
                  className="w-16 h-16 mr-4 rounded-full shadow-md"
                />
                <div>
                  <span className="text-xl font-semibold block">
                    {player.name}
                  </span>
                  <span className="text-sm text-gray-300">ID: {player.id}</span>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="imposter"
                  value={player.id}
                  checked={selectedImposterId === player.id}
                  onChange={() => handleSelectImposter(player.id)}
                  className="w-6 h-6 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImposterId && (
        <button
          onClick={handleVote}
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:w-64 transform sm:-translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
        >
          Mark as Imposter
        </button>
      )}
    </div>
  );
};

export default RoomPage;
