import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ResultPage from "@/components/ResultScreen";
import WaitPage from "@/components/WaitPlayers";
import { Mic, MicOff, AudioLines } from "lucide-react";

const RoomPage = () => {
  const router = useRouter();

  const { id: roomId } = router.query; // Define roomId from router

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

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [showResultPage, setShowResultPage] = useState(false); // Added state for showResultPage

  useEffect(() => {
    if (!roomId) return;

    // Initialize room connection here
    console.log(`Joined room: ${roomId}`);
    // Assuming there's a function to fetch players from the room
    // fetchPlayers(roomId).then(players => setPlayers(players));
  }, [roomId]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectImposter = (id: string) => {
    setSelectedImposterId(id);
  };

  const handleVote = () => {
    if (selectedImposterId) {
      // Implement the voting logic here
      console.log(`Voted for imposter: ${selectedImposterId}`);
      // Example: sendVote(roomId, selectedImposterId);

      // Close the modal after voting
      setSelectedImposterId(null);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const [isMuted, setIsMuted] = useState(false); // State to manage mute status

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    // Implement actual mute/unmute functionality here
    console.log(isMuted ? "Unmuted" : "Muted");
  };

  return (
    <div className="min-h-screen text-white">
      <Header />
      <div className="max-w-2xl mx-[12px] border border-white/25 sm:mx-auto p-8 shadow-2xl bg-black/20 backdrop-blur-sm my-[50px]">
        <div className="flex items-center justify-between space-x-8">
          <h1 className="text-4xl font-extrabold text-center ">
            Room: {roomId}
          </h1>
          <div className="text-center text-2xl font-bold">
            Time Left:{" "}
            <span className={timeLeft <= 30 ? "text-red-600" : "text-white"}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="mb-8 flex items-center justify-center ">
          <div className=" p-2  bg-white rounded-md">
            <img
              src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/10/Among-Us-Impostor-Screen.jpg"
              alt="Game Image"
              className="w-[250px] h-[250px]  shadow-xl rounded-md"
            />
          </div>
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
                <div className="flex items-center">
                  <div>
                    <span className="text-xl font-semibold block">
                      {player.name}
                    </span>
                    <span className="text-sm text-gray-300">
                      ID: {player.id}
                    </span>
                  </div>
                  <div className="ml-4 text-green-500">
                    {player.isSpeaking && <AudioLines />}
                  </div>
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

      <div className="fixed bottom-4 space-x-[12px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full flex items-center justify-center">
        <button
          onClick={toggleMute}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors shadow-lg focus:outline-none`}
        >
          {isMuted ? (
            // Muted Icon
            <Mic />
          ) : (
            <MicOff />
          )}
        </button>
        <button
          onClick={() => {
            handleVote();
            setShowResultPage(true);
          }}
          disabled={!selectedImposterId}
          className={`px-8 py-3 rounded-full transition-transform flex-grow disabled:cursor-not-allowed disabled:opacity-60 ${
            selectedImposterId
              ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
              : "bg-green-400 cursor-not-allowed text-white"
          }`}
        >
          Mark as Imposter
        </button>
      </div>

      {showResultPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <ResultPage
              isWinner={true}
              onClose={() => {
                setSelectedImposterId(null);
                setShowResultPage(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
