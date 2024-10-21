import { Link } from 'react-router-dom';
import '../Styles/SeeMore.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const SeeMore = () => {
  return (
    <div className='SeeMore'>
      <h1>Know more about the ZELDA universe</h1>

      <AliceCarousel
        
        autoPlay 
        autoPlayInterval={1200} 
        infinite 
        disableButtonsControls
        disableDotsControls
        paddingLeft={0}
        autoPlayStrategy='none'
        responsive={{
         
          700: { items: 2 }, 
          1024: { items: 3 },

        }}
        
      >
        <div className='SlideGames'>
          <Link to={'/games'}>Games <p>VEJA</p></Link>
          
        </div>
        <div className='SlideBosses'>
          <Link to={'/bosses'}>Bosses</Link>
        </div>
        <div className='SlideCharacters'>
          <Link to={'/characters'}>Characters</Link>
        </div>
        <div className='SlideMonsters'>
          <Link to={'/monsters'}>Monsters</Link>
        </div>
        <div className='SlideDungeons'>
          <Link to={'/dungeons'}>Dungeons</Link>
        </div>
        <div className='SlideRaces'>
          <Link to={'/races'}>Races</Link>
        </div>
      </AliceCarousel>

      <div className='Box'>
        <div className='SideBox'>
          <div className='SideBox2'>
            <h2>more bla bla bla bla</h2>
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
