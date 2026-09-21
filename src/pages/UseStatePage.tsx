import { useState } from "react";

function UseStatePage() {
  // 1. NUMBER STATE
  const [count, setCount] = useState<number>(0);

  // 2. STRING STATE
  const names = ["Shenu", "John", "Anna", "David"];

  const [nameIndex, setNameIndex] = useState<number>(0);

  // 3. BOOLEAN STATE
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // 4. MULTIPLE STATE VARIABLES
  const [personName, setPersonName] =
    useState<string>("Shenu");

  const [personAge, setPersonAge] =
    useState<number>(20);

  const [isStudent, setIsStudent] =
    useState<boolean>(true);

  // 5. OBJECT STATE
  const [person, setPerson] = useState({
    name: "Shenu",
    age: 20,
    country: "Sri Lanka",
  });

  // 6. ARRAY STATE
  const [items, setItems] = useState<string[]>([
    "React",
    "TypeScript",
    "Vite",
  ]);

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
      <h1>useState Examples</h1>

      {/* 1. NUMBER STATE */}
      <section>
        <h2>1. Number State</h2>

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

      {/* 2. STRING STATE */}
      <section>
        <h2>2. String State</h2>

        <h3>Hello, {names[nameIndex]}!</h3>

        <p>
          Current name:{" "}
          <strong>{names[nameIndex]}</strong>
        </p>

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

      {/* 3. BOOLEAN STATE */}
      <section>
        <h2>3. Boolean State</h2>

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

      {/* 4. MULTIPLE STATE VARIABLES */}
      <section>
        <h2>4. Multiple State Variables</h2>

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
            setPersonAge(
              (previousAge) => previousAge - 1
            )
          }
        >
          Age -1
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

      {/* 5. OBJECT STATE */}
      <section>
        <h2>5. Object State</h2>

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

      {/* 6. ARRAY STATE */}
      <section>
        <h2>6. Array State</h2>

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
    </div>
  );
}

export default UseStatePage;