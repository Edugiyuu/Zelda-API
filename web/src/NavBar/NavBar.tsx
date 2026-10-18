import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'
import MiniLink from '../Imgs/Characters/MiniLink.png'
import { SearchIcon } from '../Components/Icons';

const links = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/characters', label: 'Characters' },
  { to: '/bosses', label: 'Bosses' },
  { to: '/races', label: 'Races' },
  { to: '/more', label: 'Explore' },
];
const searchable = ['/games', '/characters', '/bosses'];

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [term, setTerm] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOnSlash = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
      if (event.key === '/' && !typing) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', focusOnSlash);
    return () => window.removeEventListener('keydown', focusOnSlash);
  }, []);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const section = searchable.find((path) => pathname.startsWith(path)) ?? '/games';
    navigate(`${section}?q=${encodeURIComponent(term.trim())}`);
    setTerm('');
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark"><img src={MiniLink} alt="" /></span>
          <span className="brand-text"><small>The Legend of Zelda</small><strong>Hyrule Compendium</strong></span>
        </Link>
        <nav className="nav-links">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
          ))}
        </nav>
        <form className="nav-search" onSubmit={search} role="search">
          <SearchIcon />
          <input ref={input} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search Hyrule…" aria-label="Search Hyrule" />
          <kbd>/</kbd>
        </form>
      </div>
    </header>
  );
}

export default NavBar;
