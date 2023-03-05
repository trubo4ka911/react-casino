import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import '../sass/CoinGamePage.scss';

function CoinGamePage() {
  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };

  const onPlay = () => {
    const randomSide = Math.random() < 0.5 ? 'heads' : 'tails';
    setWinningSide(randomSide);
    if (selectedSide === randomSide) {
      dispatch(updateBalance(balance + 10));
      dispatch(addGameToHistory({ game: 'Coin', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - 5));
      dispatch(addGameToHistory({ game: 'Coin', result: 'lose' }));
      setResult('lose');
    }
  };

  const onTryAgain = () => {
    setSelectedSide('');
    setResult(null);
  };

  const onEndGame = () => {
    navigate('/');
  };

  return (
    <div className="coin-game-page">
      <h2>Coin Game</h2>
      {result === null ? (
        <div className="coin-game-container">
          <div className="coin-buttons">
            <button
              className="coin-button heads"
              type="button"
              onClick={() => onSideSelected('heads')}
            >            </button>
            <button
              className="coin-button tails"
              type="button"
              onClick={() => onSideSelected('tails')}
            >            </button>
          </div>
          <button
            className="play-button"
            type="button"
            onClick={onPlay}
            disabled={!selectedSide}
          >
            Play
          </button>
        </div>
      ) : (
        <div>
          <p className='text-result'>{`The coin landed on ${winningSide}. You ${result}!`}</p>
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
