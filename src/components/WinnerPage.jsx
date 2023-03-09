import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../sass/components/WinnerPage.scss";

function WinnerPage() {
  const balance = useSelector((state) => state.balance.currentBalance);

  return (
    <div className='winner-page'>
      <h2>Congratulations, you've doubled your balance!</h2>
      <p>Your new balance is {balance}.</p>
      <Link to="/home-page">Go to Home</Link>
    </div>
  );
}

export default WinnerPage;
