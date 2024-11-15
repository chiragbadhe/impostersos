import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [players, setPlayers] = useState([
    { id: "0x123", name: "Player 1", profilePicture: "https://example.com/player1.png" },
    { id: "0x456", name: "Player 2", profilePicture: "https://example.com/player2.png" },
    { id: "0x789", name: "Player 3", profilePicture: "https://example.com/player3.png" },
  ]);

  useEffect(() => {
    if (!roomId) return;
    
    // Initialize room connection here
    console.log(`Joined room: ${roomId}`);
    // Assuming there's a function to fetch players from the room
    // fetchPlayers(roomId).then(players => setPlayers(players));
  }, [roomId]);

  return (
    <div className="min-h-screen bg-purple-400 p-4">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-purple-600">Room: {roomId}</h1>
        <div className="flex flex-wrap justify-center">
          {players.map((player) => (
            <div key={player.id} className="m-2 p-4 border border-purple-300 rounded-lg shadow-md bg-purple-100">
              <img src={player.profilePicture} alt={`Profile of ${player.name}`} className="w-12 h-12 rounded-full mr-2" />
              <span className="text-lg font-semibold">{player.name} ({player.id})</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Start Game</button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;