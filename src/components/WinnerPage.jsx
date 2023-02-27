import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function WinnerPage() {
  const balance = useSelector((state) => state.balance);

  return (
    <div>
      <h2>Congratulations, you've doubled your balance!</h2>
      <p>Your new balance is {balance}.</p>
      <Link to="/home">Go to Home</Link>
    </div>
  );
}

export default WinnerPage;
