import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import CoinGamePage from "./components/CoinGamePage";
import DoorGamePage from "./components/DoorGamePage";
import NumberGamePage from "./components/NumberGamePage";
import WinnerPage from "./components/WinnerPage";
import TryAgainPage from "./components/TryAgainPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="game-background">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/coin-game">Coin Game</Link>
          </li>
          <li>
            <Link to="/door-game">Door Game</Link>
          </li>
          <li>
            <Link to="/number-game">Number Game</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin-game" element={<CoinGamePage />} />
        <Route path="/door-game" element={<DoorGamePage />} />
        <Route path="/number-game" element={<NumberGamePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/winner" element={<WinnerPage />} />
        <Route path="/try-again" element={<TryAgainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
