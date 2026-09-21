import {
  useEffect,
  useRef,
  useState,
} from "react";

function Stopwatch() {
  const [seconds, setSeconds] =
    useState<number>(0);

  const [isRunning, setIsRunning] =
    useState<boolean>(false);

  const [laps, setLaps] =
    useState<number[]>([]);

  const intervalRef =
    useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current =
        window.setInterval(() => {
          setSeconds(
            (previousSeconds) =>
              previousSeconds + 1
          );
        }, 1000);
    }

    return () => {
      if (
        intervalRef.current !==
        null
      ) {
        window.clearInterval(
          intervalRef.current
        );

        intervalRef.current =
          null;
      }
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps(
      (previousLaps) => [
        ...previousLaps,
        seconds,
      ]
    );
  };

  const formatTime = (
    totalSeconds: number
  ) => {
    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const remainingSeconds =
      totalSeconds % 60;

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Stopwatch</h1>

      <h2
        style={{
          fontSize: "48px",
          margin: "30px 0",
        }}
      >
        {formatTime(seconds)}
      </h2>

      <p>
        Status:{" "}
        <strong>
          {isRunning
            ? "Running"
            : "Stopped"}
        </strong>
      </p>

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "10px",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        <button
          onClick={() =>
            setIsRunning(true)
          }
          disabled={isRunning}
        >
          Start
        </button>

        <button
          onClick={() =>
            setIsRunning(false)
          }
          disabled={!isRunning}
        >
          Stop
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
        >
          Lap
        </button>

        <button
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div>
          <h3>Lap History</h3>

          {laps.map(
            (lap, index) => (
              <p key={index}>
                Lap {index + 1}:{" "}
                {formatTime(lap)}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Stopwatch;