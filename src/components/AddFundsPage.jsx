import { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { setDeposit  } from '../redux/balanceSlice';
import { useNavigate } from 'react-router-dom';
import '../sass/components/AddFundsPage.scss';

function AddFundsPage() {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deposit = useSelector((state) => state.balance.deposit);

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if amount is valid
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    // Update balance and navigate back to home page
    dispatch(setDeposit({ deposit: deposit + Number(amount) }));
    navigate('/home-page');
  };

  return (
    <div className="add-funds-page">
      <h2>Add Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleInputChange}
          />
          <span className="error-message">{errorMessage}</span>
        </div>
        <button type="submit">Add Funds</button>
      </form>
    </div>
  );
}

export default AddFundsPage;
