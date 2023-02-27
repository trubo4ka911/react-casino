import { Link } from 'react-router-dom';

function TryAgainPage() {
  return (
    <div>
      <h2>Game Over</h2>
      <Link to="/login">Try Again</Link>
    </div>
  );
}

export default TryAgainPage;
