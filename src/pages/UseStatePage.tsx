import { useState } from "react";

type User = {
  name: string;
  age: number;
  country: string;
};

const names = [
  "Shenu",
  "John",
  "Anna",
  "David",
  "Sophie",
];

const countries = [
  "Sri Lanka",
  "South Korea",
  "China",
  "Japan",
  "USA",
];

const cities = [
  "Colombo",
  "Seoul",
  "Shanghai",
  "Tokyo",
  "New York",
];

const initialUsers: User[] = [
  {
    name: "Shenu",
    age: 20,
    country: "Sri Lanka",
  },
  {
    name: "John",
    age: 25,
    country: "USA",
  },
  {
    name: "Anna",
    age: 22,
    country: "South Korea",
  },
];

function UseStatePage() {
  const [count, setCount] =
    useState<number>(0);

  const [nameIndex, setNameIndex] =
    useState<number>(0);

  const [isVisible, setIsVisible] =
    useState<boolean>(true);

  const [personName, setPersonName] =
    useState<string>("Shenu");

  const [personAge, setPersonAge] =
    useState<number>(20);

  const [isStudent, setIsStudent] =
    useState<boolean>(true);

  const [user, setUser] =
    useState<User>({
      name: "Shenu",
      age: 20,
      country: "Sri Lanka",
    });

  const [userNameIndex, setUserNameIndex] =
    useState<number>(0);

  const [countryIndex, setCountryIndex] =
    useState<number>(0);

  const [users, setUsers] =
    useState<User[]>(initialUsers);

  const resetMultipleState = () => {
    setPersonName("Shenu");
    setPersonAge(20);
    setIsStudent(true);
  };

  const changeObjectName = (
    direction: number
  ) => {
    const newIndex =
      (userNameIndex +
        direction +
        names.length) %
      names.length;

    setUserNameIndex(newIndex);

    setUser({
      ...user,
      name: names[newIndex],
    });
  };

  const changeCountry = (
    direction: number
  ) => {
    const newIndex =
      (countryIndex +
        direction +
        countries.length) %
      countries.length;

    setCountryIndex(newIndex);

    setUser({
      ...user,
      country: countries[newIndex],
    });
  };

  const increaseObjectAge = () => {
    setUser({
      ...user,
      age: user.age + 1,
    });
  };

  const decreaseObjectAge = () => {
    if (user.age > 0) {
      setUser({
        ...user,
        age: user.age - 1,
      });
    }
  };

  const resetObject = () => {
    setUser({
      name: "Shenu",
      age: 20,
      country: "Sri Lanka",
    });

    setUserNameIndex(0);
    setCountryIndex(0);
  };

  const addUser = () => {
    const newUser: User = {
      name: `User ${users.length + 1}`,
      age: 18 + users.length,
      country:
        countries[
          users.length % countries.length
        ],
    };

    setUsers([...users, newUser]);
  };

  const removeLastUser = () => {
    if (users.length > 0) {
      setUsers(users.slice(0, -1));
    }
  };

  const resetUsers = () => {
    setUsers(initialUsers);
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
      <h1>React useState Examples</h1>

      <hr />

      <section>
        <h2>1. Number State</h2>

        <h3>Current Count: {count}</h3>

        <button
          onClick={() =>
            setCount(count + 1)
          }
        >
          +1
        </button>

        <button
          onClick={() =>
            setCount(count + 5)
          }
        >
          +5
        </button>

        <button
          onClick={() =>
            setCount(count - 1)
          }
        >
          -1
        </button>

        <button
          onClick={() =>
            setCount(count - 5)
          }
        >
          -5
        </button>

        <button
          onClick={() =>
            setCount(0)
          }
        >
          Reset
        </button>
      </section>

      <hr />

      <section>
        <h2>2. String State</h2>

        <h3>
          Hello, {names[nameIndex]}!
        </h3>

        <p>
          Current name:{" "}
          <strong>
            {names[nameIndex]}
          </strong>
        </p>

        <button
          onClick={() =>
            setNameIndex(
              (nameIndex + 1) %
                names.length
            )
          }
        >
          Next Name
        </button>

        <button
          onClick={() =>
            setNameIndex(
              (nameIndex -
                1 +
                names.length) %
                names.length
            )
          }
        >
          Previous Name
        </button>

        <button
          onClick={() =>
            setNameIndex(0)
          }
        >
          Reset Name
        </button>
      </section>

      <hr />

      <section>
        <h2>3. Boolean State</h2>

        {isVisible && (
          <h3>
            Hello! This content is currently
            visible.
          </h3>
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
            setIsVisible(!isVisible)
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
          4. Multiple State Variables
        </h2>

        <p>
          Name:{" "}
          <strong>{personName}</strong>
        </p>

        <p>
          Age:{" "}
          <strong>{personAge}</strong>
        </p>

        <p>
          Student:{" "}
          <strong>
            {isStudent ? "Yes" : "No"}
          </strong>
        </p>

        <button
          onClick={() =>
            setPersonName("John")
          }
        >
          Name → John
        </button>

        <button
          onClick={() =>
            setPersonName("Anna")
          }
        >
          Name → Anna
        </button>

        <button
          onClick={() =>
            setPersonName("Shenu")
          }
        >
          Name → Shenu
        </button>

        <button
          onClick={() =>
            setPersonAge(
              personAge + 1
            )
          }
        >
          Age +1
        </button>

        <button
          onClick={() =>
            setPersonAge(
              personAge - 1
            )
          }
        >
          Age -1
        </button>

        <button
          onClick={() =>
            setIsStudent(!isStudent)
          }
        >
          Toggle Student Status
        </button>

        <button
          onClick={resetMultipleState}
        >
          Reset All
        </button>
      </section>

      <hr />

      <section>
        <h2>
          5. Object with Multiple Data
        </h2>

        <p>
          Name:{" "}
          <strong>{user.name}</strong>
        </p>

        <p>
          Age:{" "}
          <strong>{user.age}</strong>
        </p>

        <p>
          Country:{" "}
          <strong>{user.country}</strong>
        </p>

        <p>
          City:{" "}
          <strong>
            {cities[countryIndex]}
          </strong>
        </p>

        <h3>Change Name</h3>

        <button
          onClick={() =>
            changeObjectName(1)
          }
        >
          Next Name
        </button>

        <button
          onClick={() =>
            changeObjectName(-1)
          }
        >
          Previous Name
        </button>

        <h3>Change Country</h3>

        <button
          onClick={() =>
            changeCountry(1)
          }
        >
          Next Country
        </button>

        <button
          onClick={() =>
            changeCountry(-1)
          }
        >
          Previous Country
        </button>

        <h3>Modify Age</h3>

        <button
          onClick={increaseObjectAge}
        >
          Age +1
        </button>

        <button
          onClick={decreaseObjectAge}
        >
          Age -1
        </button>

        <button
          onClick={resetObject}
        >
          Reset Object
        </button>
      </section>

      <hr />

      <section>
        <h2>
          6. Array of Multiple Users
        </h2>

        <p>
          Total users:{" "}
          <strong>{users.length}</strong>
        </p>

        {users.map(
          (user, index) => (
            <div key={index}>
              <p>
                <strong>
                  {index + 1}.{" "}
                  {user.name}
                </strong>
                {" — "}
                Age: {user.age}
                {" — "}
                Country:{" "}
                {user.country}
              </p>
            </div>
          )
        )}

        <button onClick={addUser}>
          Add User
        </button>

        <button
          onClick={removeLastUser}
        >
          Remove Last User
        </button>

        <button onClick={resetUsers}>
          Reset Users
        </button>
      </section>
    </div>
  );
}

export default UseStatePage;