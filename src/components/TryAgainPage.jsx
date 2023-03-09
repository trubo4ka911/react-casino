import { Link } from 'react-router-dom';
import "../sass/components/TryAgainPage.scss";

function TryAgainPage() {
  return (
    <div className='try-again-page'>
      <h2>Game Over</h2>
      <Link to="/">Try Again</Link>
    </div>
  );
}

export default TryAgainPage;
