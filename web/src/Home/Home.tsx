import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'
import HeroLink from '../Imgs/Bg/Link.png'
import MasterSword from '../Imgs/Bg/MasterSword.png'
import GamesBg from '../Imgs/Bg/ZeldaHome2.jpg'
import CharactersBg from '../Imgs/Bg/ZeldaHome5.jpg'
import EnemiesBg from '../Imgs/Bg/ZeldaHome6.jpg'
import Ornaments from '../Components/Ornaments';
import { ArrowIcon, DiamondIcon } from '../Components/Icons';
import { Game, gameAsset, getAllGames, getBosses, getCharacters, getFanGames, getRaces, yearOf } from '../api';

const paths = [
    { img: GamesBg, tag: 'Games', title: 'Explore the Games', text: 'Discover every Zelda game, from the original NES classic to the latest releases.', go: 'Explore games', to: '/games' },
    { img: CharactersBg, tag: 'Characters', title: 'Meet the Characters', text: 'Link, Princess Zelda, Ganondorf and the many faces that shaped the legend.', go: 'Meet characters', to: '/characters' },
    { img: EnemiesBg, tag: 'Bestiary', title: 'Face the Enemies', text: 'Dive into the vast array of enemies and bosses, with strategies to defeat them.', go: 'Face enemies', to: '/bosses' },
];
const featured = ['Breath of the Wild', 'Tears of the Kingdom', 'Ocarina of Time', "Majora's Mask", 'The Wind Waker'];
const endpoints = ['/games', '/game/:id', '/characters', '/character/:name', '/races'];

const count = (promise: Promise<unknown[]>) => promise.then((list) => list.length).catch(() => null);

const Home = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [stats, setStats] = useState<(number | null)[]>([null, null, null, null]);

    useEffect(() => {
        getFanGames().then(setGames).catch(() => setGames([]));
        Promise.all([count(getAllGames()), count(getCharacters()), count(getBosses()), count(getRaces())]).then(setStats);
    }, []);

    const covers = featured.map((title) => ({ title, game: games.find((g) => g.name === `The Legend of Zelda: ${title}`) }));
    const statLabels = ['Games', 'Characters', 'Bosses', 'Races'];

    return (
        <main className="home">
            <section className="hero">
                <div className="container hero-inner">
                    <img className="hero-link" src={HeroLink} alt="" />
                    <div className="hero-copy">
                        <p className="eyebrow cyan"><DiamondIcon />The ultimate Hyrule encyclopedia</p>
                        <h1><span className="hero-pre">The Legend of</span><span className="gold-text">Zelda API</span></h1>
                        <p className="hero-lead">Every game, hero, race and fearsome boss of Hyrule, gathered in one place, from the original NES classic to Tears of the Kingdom.</p>
                        <div className="hero-actions">
                            <Link to="/more" className="btn btn-gold">Begin your journey <ArrowIcon /></Link>
                            <Link to="/games" className="btn btn-ghost">Browse games</Link>
                        </div>
                        <div className="stats">
                            {statLabels.map((label, i) => (
                                <div className="stat" key={label}><b>{stats[i] ?? '—'}</b><span>{label}</span></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <section className="section paths-section texture-waves">
                    <div className="section-head">
                        <div><p className="eyebrow cyan"><DiamondIcon />Choose your path</p><h2>Where will your adventure lead?</h2></div>
                        <div className="rule"><span /><DiamondIcon /><span /></div>
                    </div>
                    <div className="paths">
                        {paths.map((path) => (
                            <Link to={path.to} className="path" key={path.tag} style={{ backgroundImage: `url(${path.img})` }}>
                                <div className="path-shade" />
                                <Ornaments />
                                <div className="path-copy">
                                    <span className="pill dark">{path.tag.toUpperCase()}</span>
                                    <h3>{path.title}</h3>
                                    <p>{path.text}</p>
                                    <span className="path-go">{path.go} <ArrowIcon /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="section">
                    <div className="section-head">
                        <div><p className="eyebrow cyan"><DiamondIcon />Featured adventures</p><h2>Legends worth replaying</h2></div>
                        <Link to="/games" className="btn btn-dark">View all games <ArrowIcon /></Link>
                    </div>
                    <div className="covers">
                        {covers.map(({ title, game }) => (
                            <Link to={game ? `/games/${game.id}` : '/games'} className="cover" key={title}>
                                <img src={gameAsset('BoxArt', `The Legend of Zelda: ${title}`)} alt={title} />
                                <h4>{title}</h4>
                                <span>{game ? `${yearOf(game.released_date)} · ${game.publisher}` : 'Nintendo'}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="dev">
                    <img className="dev-sword" src={MasterSword} alt="" />
                    <p className="eyebrow cyan"><DiamondIcon />For developers</p>
                    <h2>A REST API forged for Hyrule</h2>
                    <p className="dev-text">Query games, characters and races from a Node + Express API backed by MongoDB. Simple JSON, no keys required.</p>
                    <div className="endpoints">
                        {endpoints.map((endpoint) => <code className="endpoint" key={endpoint}><b>GET</b>{endpoint}</code>)}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Home
