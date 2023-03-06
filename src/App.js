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
import AddFundsPage from "./components/AddFundsPage";

function App() {
  return (
    <div className="game-background">
      <Routes>
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/coin-game" element={<CoinGamePage />} />
        <Route path="/door-game" element={<DoorGamePage />} />
        <Route path="/number-game" element={<NumberGamePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/winner" element={<WinnerPage />} />
        <Route path="/try-again" element={<TryAgainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/add-funds" element={<AddFundsPage />} />
      </Routes>
    </div>
  );
}

export default App;
