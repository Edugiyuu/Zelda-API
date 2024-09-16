import { Link } from 'react-router-dom';
import '../Styles/SeeMore.css';

const SeeMore = () => {
  return (
    <div className='SeeMore'>
      <h1>Know more about the ZELDA universe</h1>
      <div className='Box'>
        <div className='SideBox'>
          <div className='SideBox2'>
           <h2>Dê uma olhada depois</h2>
           <p>BLA BLA BLA BLA</p>
          </div>
          
        </div>
        <div className='Links'>
          <Link className='Games' to={'/games'}>Games</Link>
          <Link className='Bosses' to={'/bosses'}>Bosses</Link>
          <Link className='Characters' to={'/characters'}>Characters</Link>
          <Link className='Monsters' to={'/monsters'}>Monsters</Link>
          <Link className='Monsters' to={'/monsters'}>Monsters</Link>
          <Link className='Monsters' to={'/monsters'}>Monsters</Link>
          
        </div>
      </div>

    </div>
  );
};

export default SeeMore;
