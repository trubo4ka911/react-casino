import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux';

function CoinGamePage() {
  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const balance = useSelector((state) => state.balance);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };

  const onPlay = () => {
    const winningSide = Math.random() < 0.5 ? 'heads' : 'tails';
    if (selectedSide === winningSide) {
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
    history.push('/home');
  };

  return (
    <div>
      <h2>Coin Game</h2>
      {result === null ? (
        <div>
          <button type="button" onClick={() => onSideSelected('heads')}>
            Heads
          </button>
          <button type="button" onClick={() => onSideSelected('tails')}>
            Tails
          </button>
          <br />
          <button type="button" onClick={onPlay} disabled={!selectedSide}>
            Play
          </button>
        </div>
      ) : (
        <div>
          <p>{`The coin landed on ${winningSide}. You ${result}!`}</p>
          <button type="button" onClick={onTryAgain}>
            Try Again
          </button>
          <button type="button" onClick={onEndGame}>
            End Game
          </button>
        </div>
      )}
    </div>
  );
}

export default CoinGamePage;

