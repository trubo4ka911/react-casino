import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import "../sass/DoorGamePage.scss";

function DoorGamePage() {
  const balance = useSelector((state) => state.balance.currentBalance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState(null);
  const [winningDoor, setWinningDoor] = useState(null);
  const [updatedBalance, setUpdatedBalance] = useState(balance);  

  const doors = ['A', 'B', 'C'];

  const onDoorSelected = (door) => {
    setSelectedDoor(door);
  };

  const onPlay = () => {
    const winningDoor = doors[Math.floor(Math.random() * doors.length)];
    const remainingDoors = doors.filter((door) => door !== selectedDoor && door !== winningDoor);
    setWinningDoor(winningDoor);
    const betAmount = balance * 0.05;
    if (selectedDoor === winningDoor) {
      dispatch(updateBalance(balance + betAmount * 3));
      dispatch(addGameToHistory({ game: 'Door', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - betAmount));
      dispatch(addGameToHistory({ game: 'Door', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = selectedDoor === selectedDoor ? updatedBalance + betAmount * 2 : updatedBalance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance >= balance * 2) {
      navigate('/winner');
    }
    setUpdatedBalance(newBalance);
  };  

  const onTryAgain = () => {
    setSelectedDoor(null);
    setResult(null);
  };

  const onEndGame = () => {
    navigate('/', { updatedBalance: balance });
  };

  return (
    <div className='door-game-page'>
      <h2>Door Game</h2>
      <p className='balance'>Current balance: {updatedBalance.toFixed(2)}</p>
      {result === null ? (
        <div className='door-game-container'>
          <p>Select a door:</p>
          <div className='door-buttons'>
            {doors.map((door) => (
              <button 
                key={door} 
                className={`door ${selectedDoor === door ? 'selected' : ''}`}
                type="button" 
                onClick={() => onDoorSelected(door)} 
                disabled={selectedDoor}>
                {door}
              </button>
            ))}
          </div>
          <br />
          <button type="button" onClick={onPlay} disabled={!selectedDoor}>
            Play
          </button>
          <div className='link-buttons'>
            <Link className='btn-color' to='/add-funds'>Add Funds</Link>
            <Link className='btn-color' to='/'>Log Out</Link>
          </div>
        </div>)
      : (
        <div>
          <p>{`The winning door was ${winningDoor}. You ${result}!`}</p>
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
export default DoorGamePage;