import { Link } from 'react-router-dom';
import '../Styles/SeeMore.css';

const SeeMore = () => {
  return (
    <div className='SeeMore'>
      <h1>Know more about the ZELDA universe</h1>
      <div className='Links'>
        <Link className='Games' to={'/games'}>Games</Link>
        <Link className='Bosses' to={'/bosses'}>Bosses</Link>
      </div>
    </div>
  );
};

export default SeeMore;
