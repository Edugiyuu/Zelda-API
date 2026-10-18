import { Link } from 'react-router-dom';
import { TriforceIcon } from './Icons';
import '../Styles/Footer.css'

const Footer = () => (
    <footer className="footer">
        <div className="container footer-inner">
            <TriforceIcon className="footer-triforce" />
            <div>
                <strong>Hyrule Compendium</strong>
                <span>Fan-made encyclopedia · React + Express + MongoDB</span>
            </div>
            <nav className="footer-links">
                <Link to="/games">Games</Link>
                <Link to="/characters">Characters</Link>
                <Link to="/bosses">Bosses</Link>
                <Link to="/races">Races</Link>
                <Link to="/more">Explore</Link>
            </nav>
        </div>
    </footer>
);

export default Footer;
