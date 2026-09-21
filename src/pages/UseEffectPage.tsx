import { useEffect, useState } from "react";

function UseEffectPage() {
  // Used to demonstrate useEffect without dependencies
  const [renderCount, setRenderCount] =
    useState<number>(0);

  // Used for dependency examples
  const [count, setCount] =
    useState<number>(0);

  const names = ["Shenu", "John", "Anna", "David"];

  const [nameIndex, setNameIndex] =
    useState<number>(0);

  // 1. NO DEPENDENCY ARRAY
  useEffect(() => {
    console.log(
      "Effect without dependency array ran."
    );
  });

  // 2. EMPTY DEPENDENCY ARRAY
  useEffect(() => {
    console.log("Effect with [] ran.");
  }, []);

  // 3. ONE DEPENDENCY
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  // 4. MULTIPLE DEPENDENCIES
  useEffect(() => {
    console.log(
      "Count or name changed:",
      count,
      names[nameIndex]
    );
  }, [count, nameIndex]);

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
      <h1>useEffect Examples</h1>

      {/* 1. NO DEPENDENCY ARRAY */}
      <section>
        <h2>1. No Dependency Array</h2>

        <p>
          Render button clicked:{" "}
          <strong>{renderCount}</strong>
        </p>

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

        <p>Check the browser console.</p>
      </section>

      <hr />

      {/* 2. EMPTY DEPENDENCY ARRAY */}
      <section>
        <h2>2. Empty Dependency Array []</h2>

        <p>
          This effect runs when the component
          initially loads.
        </p>

        <p>Check the browser console.</p>
      </section>

      <hr />

      {/* 3. ONE DEPENDENCY */}
      <section>
        <h2>3. One Dependency [count]</h2>

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
          Increase Count
        </button>

        <button
          onClick={() => setCount(0)}
        >
          Reset Count
        </button>

        <p>Check the browser console.</p>
      </section>

      <hr />

      {/* 4. MULTIPLE DEPENDENCIES */}
      <section>
        <h2>4. Multiple Dependencies</h2>

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
                (previousIndex + 1) %
                names.length
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

        <p>Check the browser console.</p>
      </section>
    </div>
  );
}

export default UseEffectPage;