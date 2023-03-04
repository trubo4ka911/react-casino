import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../sass/HomePage.scss";

function HomePage() {
  const balance = useSelector((state) => state.balance.balance);
  const gameHistory = useSelector((state) => state.gameHistory.history);

  return (
    <div className='home-page'>
      <div className='content-overlay'></div>
      <h2>Your balance: {balance}</h2>

      <h3>Game History:</h3>
      {gameHistory.length > 0 ? (
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              Game: {game.game}, Result: {game.result}
            </li>
          ))}
        </ul>
      ) : (
        <p>No games played yet.</p>
      )}
      <Link to="/coin-game">Coin Game</Link>
      <br />
      <Link to="/door-game">Door Game</Link>
      <br />
      <Link to="/number-game">Number Game</Link>
      <br />
      <Link to="/">Go back to Login Page</Link>
    </div>
  );
}

export default HomePage;
