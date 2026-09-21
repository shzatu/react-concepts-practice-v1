import {
  useEffect,
  useRef,
  useState,
} from "react";

function UseRefPage() {
  // 1. REMEMBER A VALUE
  const clickCountRef = useRef<number>(0);

  const handleRefClick = () => {
    clickCountRef.current += 1;

    console.log(
      "useRef value:",
      clickCountRef.current
    );
  };

  const resetRef = () => {
    clickCountRef.current = 0;

    console.log(
      "useRef reset:",
      clickCountRef.current
    );
  };

  // 2. ACCESS AN INPUT
  const inputRef =
    useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // 3. PREVIOUS VALUE
  const [currentName, setCurrentName] =
    useState<string>("Shenu");

  const previousNameRef =
    useRef<string>("");

  useEffect(() => {
    previousNameRef.current = currentName;
  }, [currentName]);

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
      <h1>useRef Examples</h1>

      {/* 1. REMEMBER A VALUE */}
      <section>
        <h2>1. useRef — Remember a Value</h2>

        <button onClick={handleRefClick}>
          Change Ref Value
        </button>

        <button onClick={resetRef}>
          Reset Ref
        </button>

        <p>
          Check the browser console to see the
          ref value.
        </p>
      </section>

      <hr />

      {/* 2. ACCESS AN INPUT */}
      <section>
        <h2>2. useRef — Access an Input</h2>

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

      {/* 3. PREVIOUS VALUE */}
      <section>
        <h2>3. useRef — Previous Value</h2>

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
          onClick={() => {
            setCurrentName("Shenu");
            previousNameRef.current = "";
          }}
        >
          Reset
        </button>
      </section>
    </div>
  );
}

export default UseRefPage;