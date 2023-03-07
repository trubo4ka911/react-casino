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
  const [isOffered, setIsOffered] = useState(false);
  const [offeredDoor, setOfferedDoor] = useState(null);
  const [winningDoor, setWinningDoor] = useState(null);
  const [updatedBalance, setUpdatedBalance] = useState(balance);  

  const doors = ['A', 'B', 'C'];

  const onDoorSelected = (door) => {
    setSelectedDoor(door);
  };

  const onPlay = () => {
    const winningDoor = doors[Math.floor(Math.random() * doors.length)];
    const remainingDoors = doors.filter((door) => door !== selectedDoor && door !== winningDoor);
    const offeredDoor = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
    setIsOffered(true);
    setOfferedDoor(offeredDoor);
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

  const onOfferAccepted = () => {
    if (offeredDoor === winningDoor) {
      dispatch(updateBalance(balance + 15));
      dispatch(addGameToHistory({ game: 'Door', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - 5));
      dispatch(addGameToHistory({ game: 'Door', result: 'lose' }));
      setResult('lose');
    }
  };

  const onOfferRejected = () => {
    setIsOffered(false);
  };

  const onTryAgain = () => {
    setSelectedDoor(null);
    setResult(null);
    setIsOffered(false);
  };

  const onEndGame = () => {
    navigate('/', { updatedBalance: balance });
  };

  return (
    <div className='door-game-container'>
      <h2>Door Game</h2>
      <p className='balance'>Current balance: {updatedBalance.toFixed(2)}</p>
      {result === null ? (
        <div>
          <p>Select a door:</p>
          {doors.map((door) => (
            <button key={door} type="button" onClick={() => onDoorSelected(door)} disabled={selectedDoor}>
              {door}
            </button>
          ))}
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