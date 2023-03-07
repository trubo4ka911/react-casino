import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import '../sass/CoinGamePage.scss';
import '../sass/Modal.scss';
import Modal from './Modal';

function CoinGamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance.currentBalance);

  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  useEffect(() => {
    setUpdatedBalance(balance);
  }, [balance]);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };

  const onPlay = () => {
    const randomSide = Math.random() < 0.5 ? 'heads' : 'tails';
    setWinningSide(randomSide);
    const betAmount = balance * 0.05;
    if (selectedSide === randomSide) {
      dispatch(updateBalance(balance + betAmount));
      dispatch(addGameToHistory({ game: 'Coin', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - betAmount));
      dispatch(addGameToHistory({ game: 'Coin', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = balance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance === balance * 2) {
      navigate('/winner');
    }
  };
  

  const onTryAgain = () => {
    setSelectedSide('');
    setResult(null);
  };

  const onEndGame = () => {
    navigate('/');
  };

  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <div className="coin-game-page">
      <h2>Coin Game</h2>
      <p>Current balance: {updatedBalance}</p>
      <button onClick={handleShowDescription}>Show Game Description</button>
      <Modal isOpen={showDescription}>
<div className="game-description">
<p>
Each time you click heads or tails, 5% of your initial balance is
deducted from your balance. The program generates a random value,
if your choice matches the generated value, you double your bet,
otherwise you lose the deducted amount from your balance.
</p>
<button onClick={handleCloseDescription}>Close</button>
</div>
</Modal>
{result === null ? (
<div className="coin-game-container">
  <div className="coin-buttons">
    <button
      className="coin-button heads"
      type="button"
      onClick={() => onSideSelected('heads')}
    >
    </button>
    <button
      className="coin-button tails"
      type="button"
      onClick={() => onSideSelected('tails')}
    >
    </button>
  </div>
    <button
         className="play-button"
         type="button"
         onClick={onPlay}
         disabled={!selectedSide}
       >
      Play
    </button>
    <br />
      <Link className='btn-color' to='/add-funds'>Add Funds</Link>
      <br />
      <Link className='btn-color' to='/'>Log Out</Link>
  </div>
  ) : (
  <div>
  <p className="text-result">{`The coin landed on ${winningSide}. You ${result}!`}</p>
  <div className="game-result-buttons">
    <button
            className="action-button try-again-button"
            type="button"
            onClick={onTryAgain}
          >
        Try Again
    </button>
    <button
              className="action-button end-game-button"
              type="button"
              onClick={onEndGame}
            >
        End Game
    </button>
  </div>
</div>
)}
</div>
);
}

export default CoinGamePage;

