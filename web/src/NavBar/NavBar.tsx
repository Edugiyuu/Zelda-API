
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css'
import MiniLink from '../Imgs/Characters/MiniLink.png'
const NavBar = () => {
  return (
    <nav className='NavBar'>
      <img src={MiniLink} width={"30px"} alt="" />
      <Link to={`/`}>Home</Link>
    </nav>
  );
}

export default NavBar;