import Header from "@/components/Header";
import React, { useEffect, useRef } from "react";
// import ReactCanvasConfetti from "react-canvas-confetti";

interface ResultPageProps {
  isWinner: boolean;
  onClose: () => void; // Add a prop for handling close action
}
const ResultPage: React.FC<ResultPageProps> = ({ isWinner, onClose }) => {
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (isWinner && confettiRef.current) {
      confettiRef.current({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isWinner]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center bg-gradient-to-r ">
      {/* <ReactCanvasConfetti
        ref={confettiRef}
        className="absolute inset-0 pointer-events-none"
      /> */}
      <div className="max-w-2xl mx-auto p-8 shadow-2xl bg-white backdrop-blur-sm rounded-lg text-center relative">
        {/* Close button at the top right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-700 rounded-full p-2 transition-transform duration-500 hover:rotate-180"
        >
          X
        </button>
        {isWinner ? (
          <div className="text-zinc-700">
            <h1 className="text-5xl font-extrabold text-green-600  mb-6 animate-bounce">
              Congratulations!
            </h1>

            <p className="text-2xl font-semibold mb-4">
              You successfully identified the imposter!
            </p>
            <p className="text-lg mb-4 text-zinc-500">
              Great job working together as a team to find the imposter. Keep up
              the good work!
            </p>

            <div className="flex flex-col items-center mt-4">
              <img
                src="https://noun.pics/123" // Replace with the actual imposter image URL
                alt="Imposter"
                className="w-[150px] rounded-lg shadow-md border-4 border-green-500"
              />
              <p className="text-lg text-zinc-500 mt-2">
                This was the imposted image
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-4 border border-blue-600 p-4 rounded-lg shadow-lg">
              <img
                src="https://noun.pics/123" // Replace with the actual imposter image URL
                alt="Imposter"
                className="w-16 h-16 rounded-full shadow-lg border-2 border-red-500"
              />
              <div className="text-left">
                <p className="text-xl font-semibold">Imposter: Player 1</p>{" "}
                {/* Replace with the actual imposter name */}
                <p className="text-lg text-zinc-500">Wallet: 0x123</p>{" "}
                {/* Replace with the actual imposter wallet address */}
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-green-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition-transform hover:scale-105 mt-[12px]"
            >
              Claim Rewards
            </button>
          </div>
        ) : (
          <div className="text-zinc-700 space-y-6">
            <h1 className="text-5xl font-extrabold text-red-500 mb-4 animate-pulse text-center">
              Oh no!
            </h1>
            <p className="text-2xl font-semibold text-center">
              The imposter got away this time.
            </p>
            <p className="text-lg text-zinc-500 text-center">
              Don't worry, you'll catch them next time. Keep trying and have
              fun!
            </p>

            <div className="flex flex-col items-center mt-4">
              <img
                src="https://noun.pics/123" // Replace with the actual imposter image URL
                alt="Imposter"
                className="w-[150px] rounded-lg shadow-md border-4 border-green-500"
              />
              <p className="text-lg text-zinc-500 mt-2">
                This was the imposted image
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-4 border border-blue-600 p-4 rounded-lg shadow-lg">
              <img
                src="https://noun.pics/123" // Replace with the actual imposter image URL
                alt="Imposter"
                className="w-16 h-16 rounded-full shadow-lg border-2 border-red-500"
              />
              <div className="text-left">
                <p className="text-xl font-semibold">Imposter: Player 1</p>{" "}
                {/* Replace with the actual imposter name */}
                <p className="text-lg text-zinc-500">Wallet: 0x123</p>{" "}
                {/* Replace with the actual imposter wallet address */}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-green-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition-transform hover:scale-105 mt-[12px]"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
