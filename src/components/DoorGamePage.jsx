import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import "../sass/DoorGamePage.scss";

function DoorGamePage() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState(null);
  const [isOffered, setIsOffered] = useState(false);
  const [offeredDoor, setOfferedDoor] = useState(null);
  const [winningDoor, setWinningDoor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance);

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
  };
  

  const onOfferAccepted = () => {
    const winningDoor = doors[Math.floor(Math.random() * doors.length)];
    if (selectedDoor === winningDoor) {
      dispatch(updateBalance(balance + 10));
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
    navigate('/home');
  };

  return (
    <div className='door-game-container'>
      <h2>Door Game</h2>
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
        </div>
      ) : isOffered ? (
        <div>
          <p>{`I can offer you door ${offeredDoor}. Would you like to switch to it?`}</p>
          <button type="button" onClick={onOfferAccepted}>
            Yes
          </button>
          <button type="button" onClick={onOfferRejected}>
            No
          </button>
        </div>
      ) : (
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
