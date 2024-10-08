import { Link } from 'react-router-dom';
import '../Styles/SeeMore.css';

const SeeMore = () => {
  return (
    <div className='SeeMore'>
      <h1>Know more about the ZELDA universe</h1>
      <div className='Box'>
        <div className='SideBox'>
          <div className='SideBox2'>
            <h2>Mais bla bla bla bla</h2>
            <p>BLA BLA BLA BLA BLA</p>
          </div>

        </div>
        <div className='Links'>
          <div className='BoxGames'>
            <Link className='Games' to={'/games'}>Games</Link>
          </div>
          <div className='BoxBosses'>
            <Link className='Bosses' to={'/bosses'}>Bosses</Link>
          </div>
          <div className='BoxCharacters'>
            <Link className='Characters' to={'/characters'}>Characters</Link>
          </div>
          <div className='BoxMonsters'>
            <Link className='Monsters' to={'/monsters'}>Monsters</Link>
          </div>
          <div className='BoxDungeons'>
            <Link className='Dungeons' to={'/dungeons'}>Dungeons</Link>
          </div>
          <div className='BoxRaces'>
            <Link className='Races' to={'/races'}>Races</Link>
          </div>



        </div>
      </div>

    </div>
  );
};

export default SeeMore;
