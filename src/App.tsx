import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import CheckoutPage from "./pages/CheckoutPage";
import UseStatePage from "./pages/UseStatePage";
import UseEffectPage from "./pages/UseEffectPage";
import UseRefPage from "./pages/UseRefPage";
import StopwatchPage from "./pages/StopwatchPage";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "15px 30px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/">
          Checkout
        </Link>

        <Link to="/usestate">
          useState
        </Link>

        <Link to="/useeffect">
          useEffect
        </Link>

        <Link to="/useref">
          useRef
        </Link>

        <Link to="/stopwatch">
          Stopwatch
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<CheckoutPage />}
        />

        <Route
          path="/usestate"
          element={<UseStatePage />}
        />

        <Route
          path="/useeffect"
          element={<UseEffectPage />}
        />

        <Route
          path="/useref"
          element={<UseRefPage />}
        />

        <Route
          path="/stopwatch"
          element={<StopwatchPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;