import Header from "@/components/Header";

interface Player {
  id: string;
  name: string;
  profilePicture: string;
  isImposter: boolean;
  isSpeaking: boolean;
}

interface WaitPageProps {
  isWaiting: boolean;
  onClose: () => void;
}

const WaitPage: React.FC<WaitPageProps> = ({ isWaiting, onClose }) => {
  if (!isWaiting) return null;

  return (
    <div className="min-h-screen text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white rounded-full p-2 transition-transform duration-500 hover:rotate-180"
          >
            X
          </button>
          <h1 className="text-3xl font-extrabold mb-4 text-center animate-bounce">
            Waiting for Players to Join
          </h1>
          <p className="text-center mb-6">
            Room ID: <span className="font-semibold">{"fsdf"}</span>
          </p>

          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-white mb-4"
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
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-lg">Loading players...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitPage;
