import { useEffect, useState } from "react";

export default function Timer({
  minutes,
  startedAt,
  setIsExpired,
}: {
  minutes?: number;
  startedAt?: number;
  setIsExpired?: (v: boolean) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!startedAt) return (minutes ?? 1) * 60;
    const elapsedSeconds = Math.floor(Date.now() / 1000) - startedAt;
    const remainingSeconds = (minutes ?? 1) * 60 - elapsedSeconds;
    return Math.max(0, remainingSeconds);
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired?.(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [setIsExpired, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="text-center text-2xl font-bold">
      Time Left:{" "}
      <span className={timeLeft <= 30 ? "text-red-300" : "text-white"}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
