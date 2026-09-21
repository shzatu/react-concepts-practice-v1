import {
  useRef,
  useState,
} from "react";

function UseRefPage() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const renderCount =
    useRef<number>(0);

  const [name, setName] =
    useState<string>("");

  renderCount.current += 1;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setName("");

    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>React useRef Examples</h1>

      <hr />

      <section>
        <h2>
          1. Accessing an Input
        </h2>

        <input
          ref={inputRef}
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter your name"
        />

        <br />
        <br />

        <button onClick={focusInput}>
          Focus Input
        </button>

        <button onClick={clearInput}>
          Clear
        </button>

        <p>
          Value:{" "}
          <strong>{name}</strong>
        </p>
      </section>

      <hr />

      <section>
        <h2>
          2. Storing a Value with useRef
        </h2>

        <p>
          Render count:{" "}
          <strong>
            {renderCount.current}
          </strong>
        </p>

        <p>
          The ref value can change
          without directly causing
          a re-render.
        </p>
      </section>

      <hr />

      <section>
        <h2>
          3. useState vs useRef
        </h2>

        <p>
          The input value uses
          <strong> useState </strong>
          because it needs to update
          the UI.
        </p>

        <p>
          The input element reference
          uses
          <strong> useRef </strong>
          to access the DOM element.
        </p>
      </section>
    </div>
  );
}

export default UseRefPage;