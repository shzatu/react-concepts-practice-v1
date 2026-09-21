import {
  useEffect,
  useState,
} from "react";

function UseEffectPage() {
  const [count, setCount] =
    useState<number>(0);

  const [name, setName] =
    useState<string>("Shenu");

  const [isVisible, setIsVisible] =
    useState<boolean>(true);

  useEffect(() => {
    console.log(
      "Effect ran because count changed:",
      count
    );
  }, [count]);

  useEffect(() => {
    console.log(
      "Effect ran because name changed:",
      name
    );
  }, [name]);

  useEffect(() => {
    console.log(
      "Effect with empty dependency array ran"
    );

    return () => {
      console.log(
        "Component cleanup"
      );
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>React useEffect Examples</h1>

      <hr />

      <section>
        <h2>
          1. Effect with Dependency
        </h2>

        <p>
          Count:{" "}
          <strong>{count}</strong>
        </p>

        <button
          onClick={() =>
            setCount(count + 1)
          }
        >
          Increase
        </button>

        <button
          onClick={() =>
            setCount(0)
          }
        >
          Reset
        </button>

        <p>
          Open the browser console and
          change the count.
        </p>
      </section>

      <hr />

      <section>
        <h2>
          2. Effect with String Dependency
        </h2>

        <p>
          Current name:{" "}
          <strong>{name}</strong>
        </p>

        <button
          onClick={() =>
            setName("Shenu")
          }
        >
          Shenu
        </button>

        <button
          onClick={() =>
            setName("John")
          }
        >
          John
        </button>

        <button
          onClick={() =>
            setName("Anna")
          }
        >
          Anna
        </button>

        <button
          onClick={() =>
            setName("")
          }
        >
          Clear
        </button>
      </section>

      <hr />

      <section>
        <h2>
          3. Effect with Boolean Dependency
        </h2>

        {isVisible && (
          <p>
            This content is visible.
          </p>
        )}

        <p>
          Status:{" "}
          <strong>
            {isVisible
              ? "Visible"
              : "Hidden"}
          </strong>
        </p>

        <button
          onClick={() =>
            setIsVisible(
              !isVisible
            )
          }
        >
          Toggle
        </button>

        <button
          onClick={() =>
            setIsVisible(true)
          }
        >
          Show
        </button>

        <button
          onClick={() =>
            setIsVisible(false)
          }
        >
          Hide
        </button>

        <button
          onClick={() =>
            setIsVisible(true)
          }
        >
          Reset
        </button>
      </section>

      <hr />

      <section>
        <h2>
          Dependency Testing
        </h2>

        <p>
          Change count or name and
          check the browser console.
        </p>

        <p>
          The corresponding effect
          runs when its dependency
          changes.
        </p>
      </section>
    </div>
  );
}

export default UseEffectPage;