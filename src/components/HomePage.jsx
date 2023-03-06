import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearHistory } from '../redux/gameHistorySlice';
import Modal from './Modal';
import '../sass/HomePage.scss';

function HomePage() {
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.currentBalance);
  const gameHistory = useSelector((state) => state.gameHistory.history);
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  useEffect(() => {
    setUpdatedBalance(balance);
  }, [balance]);

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    setShowHistory(false);
  };

  return (
    <div className='home-page'>
      <div className='content-overlay'></div>
      <h2>Your balance: {updatedBalance}</h2>
      <button className='btn-color btn-history' onClick={handleShowHistory}>View History</button>
      <Link to="/coin-game">Coin Game</Link>
      <br />
      <Link to="/door-game">Door Game</Link>
      <br />
      <Link to="/number-game">Number Game</Link>
      <br />
      <Link className='btn-color' to='/add-funds'>Add Funds</Link>
      <br />
      <Link className='btn-color' to='/'>Log Out</Link>

      <Modal isOpen={showHistory} handleClose={handleCloseHistory}>
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
        <button onClick={handleClearHistory}>Clear History</button>
      </Modal>
    </div>
  );
}

export default HomePage;
