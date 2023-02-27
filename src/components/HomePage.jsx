import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HomePage() {
  const balance = useSelector((state) => state.balance);
  const gameHistory = useSelector((state) => state.gameHistory);
  return (
    <div>
      <h2>Welcome to the Game Platform, your balance is {balance}.</h2>
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
    </div>
  );
}

export default HomePage;
