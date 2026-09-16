import { useState, type FormEvent } from "react";

type User = {
  name: string;
  age: number;
  country: string;
  city: string;
};

type FormData = {
  name: string;
  email: string;
  age: number;
  country: string;
  isStudent: boolean;
};

const names = ["Shenu", "John", "Anna", "David", "Sophie"];

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
    city: "Colombo",
  },
  {
    name: "John",
    age: 25,
    country: "USA",
    city: "New York",
  },
  {
    name: "Anna",
    age: 22,
    country: "South Korea",
    city: "Seoul",
  },
];

function App() {
  // ==================================================
  // 1. NUMBER STATE
  // ==================================================

  const [count, setCount] = useState<number>(0);

  // ==================================================
  // 2. STRING STATE
  // ==================================================

  const [nameIndex, setNameIndex] = useState<number>(0);

  // ==================================================
  // 3. BOOLEAN STATE
  // ==================================================

  const [isVisible, setIsVisible] = useState<boolean>(true);

  // ==================================================
  // 4. MULTIPLE STATE VARIABLES
  // ==================================================

  const [personName, setPersonName] = useState<string>("Shenu");
  const [personAge, setPersonAge] = useState<number>(20);
  const [isStudent, setIsStudent] = useState<boolean>(true);

  // ==================================================
  // 5. OBJECT STATE
  // ==================================================

  const [user, setUser] = useState<User>({
    name: "Shenu",
    age: 20,
    country: "Sri Lanka",
    city: "Colombo",
  });

  const [userNameIndex, setUserNameIndex] = useState<number>(0);
  const [countryIndex, setCountryIndex] = useState<number>(0);

  // ==================================================
  // 6. ARRAY STATE
  // ==================================================

  const [users, setUsers] = useState<User[]>(initialUsers);

  // ==================================================
  // 7. FORM STATE
  // ==================================================

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
    country: "Sri Lanka",
    isStudent: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  // ==================================================
  // HELPER FUNCTIONS
  // ==================================================

  // Reset multiple state variables
  const resetMultipleState = () => {
    setPersonName("Shenu");
    setPersonAge(20);
    setIsStudent(true);
  };

  // Change object name
  const changeObjectName = (direction: number) => {
    const newIndex =
      (userNameIndex + direction + names.length) % names.length;

    setUserNameIndex(newIndex);

    setUser({
      ...user,
      name: names[newIndex],
    });
  };

  // Change object country and city
  const changeCountry = (direction: number) => {
    const newIndex =
      (countryIndex + direction + countries.length) %
      countries.length;

    setCountryIndex(newIndex);

    setUser({
      ...user,
      country: countries[newIndex],
      city: cities[newIndex],
    });
  };

  // Increase object age
  const increaseObjectAge = () => {
    setUser({
      ...user,
      age: user.age + 1,
    });
  };

  // Decrease object age
  const decreaseObjectAge = () => {
    if (user.age > 0) {
      setUser({
        ...user,
        age: user.age - 1,
      });
    }
  };

  // Reset object
  const resetObject = () => {
    setUser({
      name: "Shenu",
      age: 20,
      country: "Sri Lanka",
      city: "Colombo",
    });

    setUserNameIndex(0);
    setCountryIndex(0);
  };

  // Add a new user to the array
  const addUser = () => {
    const newUser: User = {
      name: `User ${users.length + 1}`,
      age: 18 + users.length,
      country: countries[users.length % countries.length],
      city: cities[users.length % cities.length],
    };

    setUsers([...users, newUser]);
  };

  // Remove the last user
  const removeLastUser = () => {
    if (users.length > 0) {
      setUsers(users.slice(0, -1));
    }
  };

  // Reset users
  const resetUsers = () => {
    setUsers(initialUsers);
  };

  // ==================================================
  // FORM FUNCTIONS
  // ==================================================

  // Update form fields
  const handleInputChange = (
    field: keyof FormData,
    value: string | number | boolean
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setSubmitted(false);
  };

  // Submit form
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      age: 0,
      country: "Sri Lanka",
      isStudent: false,
    });

    setSubmitted(false);
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

      {/* ==================================================
          1. NUMBER STATE
      ================================================== */}

      <section>
        <h2>1. Number State</h2>

        <h3>Current Count: {count}</h3>

        <button onClick={() => setCount((prev) => prev + 1)}>
          +1
        </button>

        <button onClick={() => setCount((prev) => prev + 5)}>
          +5
        </button>

        <button onClick={() => setCount((prev) => prev - 1)}>
          -1
        </button>

        <button onClick={() => setCount((prev) => prev - 5)}>
          -5
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </section>

      <hr />

      {/* ==================================================
          2. STRING STATE
      ================================================== */}

      <section>
        <h2>2. String State</h2>

        <h3>Hello, {names[nameIndex]}!</h3>

        <p>
          Current name: <strong>{names[nameIndex]}</strong>
        </p>

        <button
          onClick={() =>
            setNameIndex(
              (nameIndex + 1) % names.length
            )
          }
        >
          Next Name
        </button>

        <button
          onClick={() =>
            setNameIndex(
              (nameIndex - 1 + names.length) %
                names.length
            )
          }
        >
          Previous Name
        </button>

        <button onClick={() => setNameIndex(0)}>
          Reset Name
        </button>
      </section>

      <hr />

      {/* ==================================================
          3. BOOLEAN STATE
      ================================================== */}

      <section>
        <h2>3. Boolean State</h2>

        {isVisible && (
          <h3>
            Hello! This content is currently visible.
          </h3>
        )}

        <p>
          Status:{" "}
          <strong>
            {isVisible ? "Visible" : "Hidden"}
          </strong>
        </p>

        <button
          onClick={() => setIsVisible(!isVisible)}
        >
          Toggle
        </button>

        <button onClick={() => setIsVisible(true)}>
          Show
        </button>

        <button onClick={() => setIsVisible(false)}>
          Hide
        </button>

        <button onClick={() => setIsVisible(true)}>
          Reset
        </button>
      </section>

      <hr />

      {/* ==================================================
          4. MULTIPLE STATE VARIABLES
      ================================================== */}

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
          onClick={() => setPersonName("Shenu")}
        >
          Name → Shenu
        </button>

        <button
          onClick={() =>
            setPersonAge((prev) => prev + 1)
          }
        >
          Age +1
        </button>

        <button
          onClick={() =>
            setPersonAge((prev) => prev - 1)
          }
        >
          Age -1
        </button>

        <button
          onClick={() => setIsStudent(!isStudent)}
        >
          Toggle Student Status
        </button>

        <button onClick={resetMultipleState}>
          Reset All
        </button>
      </section>

      <hr />

      {/* ==================================================
          5. OBJECT STATE
      ================================================== */}

      <section>
        <h2>5. Object with Multiple Data</h2>

        <p>
          Name: <strong>{user.name}</strong>
        </p>

        <p>
          Age: <strong>{user.age}</strong>
        </p>

        <p>
          Country: <strong>{user.country}</strong>
        </p>

        <p>
          City: <strong>{user.city}</strong>
        </p>

        <h3>Change Name</h3>

        <button onClick={() => changeObjectName(1)}>
          Next Name
        </button>

        <button onClick={() => changeObjectName(-1)}>
          Previous Name
        </button>

        <h3>Change Country</h3>

        <button onClick={() => changeCountry(1)}>
          Next Country
        </button>

        <button onClick={() => changeCountry(-1)}>
          Previous Country
        </button>

        <h3>Modify Age</h3>

        <button onClick={increaseObjectAge}>
          Age +1
        </button>

        <button onClick={decreaseObjectAge}>
          Age -1
        </button>

        <button onClick={resetObject}>
          Reset Object
        </button>
      </section>

      <hr />

      {/* ==================================================
          6. ARRAY STATE
      ================================================== */}

      <section>
        <h2>6. Array of Multiple Users</h2>

        <p>
          Total users: <strong>{users.length}</strong>
        </p>

        {users.map((user) => (
          <div key={user.name}>
            <p>
              <strong>{user.name}</strong>
              {" — "}
              Age: {user.age}
              {" — "}
              Country: {user.country}
              {" — "}
              City: {user.city}
            </p>
          </div>
        ))}

        <button onClick={addUser}>
          Add User
        </button>

        <button onClick={removeLastUser}>
          Remove Last User
        </button>

        <button onClick={resetUsers}>
          Reset Users
        </button>
      </section>

      <hr />

      {/* ==================================================
          7. SMALL FORM
      ================================================== */}

      <section>
        <h2>7. Small User Form</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>

            <input
              type="text"
              value={formData.name}
              onChange={(event) =>
                handleInputChange(
                  "name",
                  event.target.value
                )
              }
              placeholder="Enter your name"
            />
          </div>

          <br />

          <div>
            <label>Email: </label>

            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                handleInputChange(
                  "email",
                  event.target.value
                )
              }
              placeholder="Enter your email"
            />
          </div>

          <br />

          <div>
            <label>Age: </label>

            <input
              type="number"
              value={formData.age}
              onChange={(event) =>
                handleInputChange(
                  "age",
                  Number(event.target.value)
                )
              }
            />
          </div>

          <br />

          <div>
            <label>Country: </label>

            <select
              value={formData.country}
              onChange={(event) =>
                handleInputChange(
                  "country",
                  event.target.value
                )
              }
            >
              <option value="Sri Lanka">
                Sri Lanka
              </option>

              <option value="South Korea">
                South Korea
              </option>

              <option value="China">
                China
              </option>

              <option value="Japan">
                Japan
              </option>

              <option value="USA">
                USA
              </option>
            </select>
          </div>

          <br />

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.isStudent}
                onChange={(event) =>
                  handleInputChange(
                    "isStudent",
                    event.target.checked
                  )
                }
              />

              {" "}Student
            </label>
          </div>

          <br />

          <button type="submit">
            Submit
          </button>

          <button
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>
        </form>

        {/* Submitted data */}
        {submitted && (
          <div>
            <h3>Submitted Information</h3>

            <p>
              Name: {formData.name}
            </p>

            <p>
              Email: {formData.email}
            </p>

            <p>
              Age: {formData.age}
            </p>

            <p>
              Country: {formData.country}
            </p>

            <p>
              Student:{" "}
              {formData.isStudent ? "Yes" : "No"}
            </p>
          </div>
        )}
      </section>

      <hr />
    </div>
  );
}

export default App;