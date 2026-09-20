import { useEffect, useRef, useState } from "react";

function App() {
  // =====================================================
  // 1. STOPWATCH
  // =====================================================

  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((previousLaps) => [...previousLaps, seconds]);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // =====================================================
  // 2. useState - NUMBER
  // =====================================================

  const [count, setCount] = useState<number>(0);

  // =====================================================
  // 3. useState - STRING
  // =====================================================

  const names = ["Shenu", "John", "Anna", "David"];

  const [nameIndex, setNameIndex] = useState<number>(0);

  // =====================================================
  // 4. useState - BOOLEAN
  // =====================================================

  const [isVisible, setIsVisible] = useState<boolean>(true);

  // =====================================================
  // 5. useState - MULTIPLE STATE VARIABLES
  // =====================================================

  const [personName, setPersonName] =
    useState<string>("Shenu");

  const [personAge, setPersonAge] =
    useState<number>(20);

  const [isStudent, setIsStudent] =
    useState<boolean>(true);

  // =====================================================
  // 6. useState - OBJECT
  // =====================================================

  const [person, setPerson] = useState({
    name: "Shenu",
    age: 20,
    country: "Sri Lanka",
  });

  // =====================================================
  // 7. useState - ARRAY
  // =====================================================

  const [items, setItems] = useState<string[]>([
    "React",
    "TypeScript",
    "Vite",
  ]);

  // =====================================================
  // 8. useEffect - NO DEPENDENCY ARRAY
  // =====================================================

  const [renderCount, setRenderCount] =
    useState<number>(0);

  useEffect(() => {
    console.log("Effect without dependency array ran.");
  });

  // =====================================================
  // 9. useEffect - EMPTY DEPENDENCY ARRAY
  // =====================================================

  useEffect(() => {
    console.log("Effect with [] ran.");
  }, []);

  // =====================================================
  // 10. useEffect - ONE DEPENDENCY
  // =====================================================

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  // =====================================================
  // 11. useEffect - MULTIPLE DEPENDENCIES
  // =====================================================

  useEffect(() => {
    console.log(
      "Count or name changed:",
      count,
      names[nameIndex]
    );
  }, [count, nameIndex]);

  // =====================================================
  // 12. useRef - REMEMBER A VALUE
  // =====================================================

  const clickCountRef = useRef<number>(0);

  const handleRefClick = () => {
    clickCountRef.current += 1;

    console.log("useRef value:", clickCountRef.current);
  };

  const resetRef = () => {
    clickCountRef.current = 0;

    console.log("useRef reset:", clickCountRef.current);
  };

  // =====================================================
  // 13. useRef - ACCESS INPUT
  // =====================================================

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // =====================================================
  // 14. useRef - PREVIOUS VALUE
  // =====================================================

  const [currentName, setCurrentName] =
    useState<string>("Shenu");

  const previousNameRef = useRef<string>("");

  useEffect(() => {
    previousNameRef.current = currentName;
  }, [currentName]);

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.5",
      }}
    >
      <h1>React Concepts Practice</h1>

      {/* =================================================
          STOPWATCH
      ================================================= */}

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "30px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2>Simple Stopwatch</h2>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            margin: "20px 0",
            letterSpacing: "3px",
          }}
        >
          {formatTime(seconds)}
        </div>

        <p>
          Status:{" "}
          <strong>
            {isRunning ? "Running" : "Stopped"}
          </strong>
        </p>

        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          Stop
        </button>

        <button
          onClick={handleLap}
          disabled={seconds === 0}
        >
          Lap
        </button>

        <button onClick={handleReset}>Reset</button>

        {laps.length > 0 && (
          <div style={{ marginTop: "25px" }}>
            <h3>Lap History</h3>

            {laps.map((lapTime, index) => (
              <p key={index}>
                Lap {index + 1}:{" "}
                <strong>{formatTime(lapTime)}</strong>
              </p>
            ))}
          </div>
        )}
      </section>

      <hr />

      {/* =================================================
          useState
      ================================================= */}

      <h1>useState Examples</h1>

      {/* NUMBER */}

      <section>
        <h2>2. Number State</h2>

        <h3>Count: {count}</h3>

        <button
          onClick={() =>
            setCount(
              (previousCount) => previousCount + 1
            )
          }
        >
          +1
        </button>

        <button
          onClick={() =>
            setCount(
              (previousCount) => previousCount - 1
            )
          }
        >
          -1
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </section>

      <hr />

      {/* STRING */}

      <section>
        <h2>3. String State</h2>

        <h3>Hello, {names[nameIndex]}!</h3>

        <button
          onClick={() =>
            setNameIndex(
              (previousIndex) =>
                (previousIndex + 1) % names.length
            )
          }
        >
          Next Name
        </button>

        <button
          onClick={() =>
            setNameIndex(
              (previousIndex) =>
                (previousIndex -
                  1 +
                  names.length) %
                names.length
            )
          }
        >
          Previous Name
        </button>

        <button onClick={() => setNameIndex(0)}>
          Reset
        </button>
      </section>

      <hr />

      {/* BOOLEAN */}

      <section>
        <h2>4. Boolean State</h2>

        {isVisible && (
          <p>This content is currently visible.</p>
        )}

        <p>
          Status:{" "}
          <strong>
            {isVisible ? "Visible" : "Hidden"}
          </strong>
        </p>

        <button
          onClick={() =>
            setIsVisible(
              (previousValue) => !previousValue
            )
          }
        >
          Toggle
        </button>

        <button
          onClick={() => setIsVisible(true)}
        >
          Show
        </button>

        <button
          onClick={() => setIsVisible(false)}
        >
          Hide
        </button>

        <button
          onClick={() => setIsVisible(true)}
        >
          Reset
        </button>
      </section>

      <hr />

      {/* MULTIPLE STATE */}

      <section>
        <h2>5. Multiple State Variables</h2>

        <p>
          Name: <strong>{personName}</strong>
        </p>

        <p>
          Age: <strong>{personAge}</strong>
        </p>

        <p>
          Student:{" "}
          <strong>
            {isStudent ? "Yes" : "No"}
          </strong>
        </p>

        <button
          onClick={() => setPersonName("John")}
        >
          Name → John
        </button>

        <button
          onClick={() => setPersonName("Anna")}
        >
          Name → Anna
        </button>

        <button
          onClick={() =>
            setPersonAge(
              (previousAge) => previousAge + 1
            )
          }
        >
          Age +1
        </button>

        <button
          onClick={() =>
            setIsStudent(
              (previousValue) => !previousValue
            )
          }
        >
          Toggle Student
        </button>

        <button
          onClick={() => {
            setPersonName("Shenu");
            setPersonAge(20);
            setIsStudent(true);
          }}
        >
          Reset
        </button>
      </section>

      <hr />

      {/* OBJECT */}

      <section>
        <h2>6. Object State</h2>

        <p>
          Name: <strong>{person.name}</strong>
        </p>

        <p>
          Age: <strong>{person.age}</strong>
        </p>

        <p>
          Country:{" "}
          <strong>{person.country}</strong>
        </p>

        <button
          onClick={() =>
            setPerson({
              ...person,
              name: "Anna",
            })
          }
        >
          Change Name
        </button>

        <button
          onClick={() =>
            setPerson({
              ...person,
              age: person.age + 1,
            })
          }
        >
          Age +1
        </button>

        <button
          onClick={() =>
            setPerson({
              ...person,
              country: "South Korea",
            })
          }
        >
          Change Country
        </button>

        <button
          onClick={() =>
            setPerson({
              name: "Shenu",
              age: 20,
              country: "Sri Lanka",
            })
          }
        >
          Reset
        </button>
      </section>

      <hr />

      {/* ARRAY */}

      <section>
        <h2>7. Array State</h2>

        <p>
          Total items:{" "}
          <strong>{items.length}</strong>
        </p>

        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          onClick={() =>
            setItems([
              ...items,
              `Item ${items.length + 1}`,
            ])
          }
        >
          Add Item
        </button>

        <button
          onClick={() =>
            setItems(items.slice(0, -1))
          }
          disabled={items.length === 0}
        >
          Remove Last
        </button>

        <button
          onClick={() =>
            setItems([
              "React",
              "TypeScript",
              "Vite",
            ])
          }
        >
          Reset
        </button>
      </section>

      <hr />

      {/* =================================================
          useEffect
      ================================================= */}

      <h1>useEffect Examples</h1>

      {/* NO DEPENDENCY */}

      <section>
        <h2>8. No Dependency Array</h2>

        <button
          onClick={() =>
            setRenderCount(
              (previousCount) =>
                previousCount + 1
            )
          }
        >
          Cause Render
        </button>

        <button
          onClick={() => setRenderCount(0)}
        >
          Reset
        </button>

        <p>
          Render button clicked:{" "}
          <strong>{renderCount}</strong>
        </p>
      </section>

      <hr />

      {/* EMPTY DEPENDENCY */}

      <section>
        <h2>9. Empty Dependency Array []</h2>

        <p>Check the browser console.</p>
      </section>

      <hr />

      {/* ONE DEPENDENCY */}

      <section>
        <h2>10. Dependency [count]</h2>

        <p>
          Current count:{" "}
          <strong>{count}</strong>
        </p>

        <button
          onClick={() =>
            setCount(
              (previousCount) =>
                previousCount + 1
            )
          }
        >
          Change Count
        </button>

        <button onClick={() => setCount(0)}>
          Reset Count
        </button>
      </section>

      <hr />

      {/* MULTIPLE DEPENDENCIES */}

      <section>
        <h2>11. Multiple Dependencies</h2>

        <p>
          Count: <strong>{count}</strong>
        </p>

        <p>
          Name:{" "}
          <strong>{names[nameIndex]}</strong>
        </p>

        <button
          onClick={() =>
            setCount(
              (previousCount) =>
                previousCount + 1
            )
          }
        >
          Change Count
        </button>

        <button
          onClick={() =>
            setNameIndex(
              (previousIndex) =>
                (previousIndex + 1) % names.length
            )
          }
        >
          Change Name
        </button>

        <button
          onClick={() => {
            setCount(0);
            setNameIndex(0);
          }}
        >
          Reset Both
        </button>
      </section>

      <hr />

      {/* =================================================
          useRef
      ================================================= */}

      <h1>useRef Examples</h1>

      {/* REMEMBER VALUE */}

      <section>
        <h2>12. useRef — Remember a Value</h2>

        <button onClick={handleRefClick}>
          Change Ref Value
        </button>

        <button onClick={resetRef}>
          Reset Ref
        </button>

        <p>Check the browser console.</p>
      </section>

      <hr />

      {/* INPUT REF */}

      <section>
        <h2>13. useRef — Access an Input</h2>

        <input
          ref={inputRef}
          placeholder="Type something..."
        />

        <button onClick={focusInput}>
          Focus Input
        </button>

        <button onClick={clearInput}>
          Clear Input
        </button>
      </section>

      <hr />

      {/* PREVIOUS VALUE */}

      <section>
        <h2>14. useRef — Previous Value</h2>

        <p>
          Current name:{" "}
          <strong>{currentName}</strong>
        </p>

        <p>
          Previous name:{" "}
          <strong>
            {previousNameRef.current ||
              "None yet"}
          </strong>
        </p>

        <button
          onClick={() => setCurrentName("Shenu")}
        >
          Shenu
        </button>

        <button
          onClick={() => setCurrentName("Anna")}
        >
          Anna
        </button>

        <button
          onClick={() => setCurrentName("John")}
        >
          John
        </button>

        <button
          onClick={() => setCurrentName("David")}
        >
          David
        </button>

        <button
          onClick={() => setCurrentName("Shenu")}
        >
          Reset
        </button>
      </section>

      <hr />

      <h2>React Concepts Practice Complete</h2>
    </div>
  );
}

export default App;