import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../Styles/Game.css'
import Ornaments from '../Components/Ornaments';
import { ArrowIcon, BackIcon, ChevronIcon, DiamondIcon } from '../Components/Icons';
import { Game as GameData, gameAsset, getGame, getGames, yearOf } from '../api';

const byDate = (a: GameData, b: GameData) => (Number(yearOf(a.released_date)) || 9999) - (Number(yearOf(b.released_date)) || 9999);

const Game = () => {
    const { game_id = '' } = useParams();
    const [display, setGame] = useState<GameData | null>();
    const [all, setAll] = useState<GameData[]>([]);
    const [noArt, setNoArt] = useState<number[]>([]);

    useEffect(() => {
        setGame(undefined);
        getGame(game_id).then(setGame).catch(() => setGame(null));
    }, [game_id]);
    useEffect(() => { getGames().then((list) => setAll(list.sort(byDate))).catch(() => setAll([])); }, []);

    if (!display) {
        return <main className="page container"><p className="loading">{display === undefined ? 'Consulting the Sheikah Slate…' : 'This legend could not be found.'}</p></main>;
    }

    const index = all.findIndex((g) => g.id === display.id);
    const next = index >= 0 ? all[index + 1] : undefined;
    const year = Number(yearOf(display.released_date));
    const related = all
        .filter((g) => g.id !== display.id && !noArt.includes(g.id))
        .sort((a, b) => Math.abs(Number(yearOf(a.released_date)) - year) - Math.abs(Number(yearOf(b.released_date)) - year))
        .slice(0, 5);
    const facts = [['Released', display.released_date], ['Developer', display.developer], ['Publisher', display.publisher]];

    return (
        <main className="texture-waves waves-tall">
            <section className="game-hero">
                <div className="container">
                    <nav className="crumbs"><Link to="/games">Games</Link><ChevronIcon /><b>{display.name.replace('The Legend of Zelda: ', '')}</b></nav>
                    <div className="game-detail">
                        <div className="game-boxart">
                            <img src={display.box_img || gameAsset('BoxArt', display.name)} alt={`${display.name} box art`} />
                            <Ornaments />
                        </div>
                        <div className="game-info">
                            <img className="game-title-logo" src={display.game_title_img || gameAsset('GameIcons', display.name)} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <h1>{display.name}</h1>
                            <div className="facts">
                                {facts.map(([label, value]) => <div className="fact" key={label}><span>{label}</span><b>{value || 'Unknown'}</b></div>)}
                            </div>
                            <div className="game-about">
                                <h4>About the game</h4>
                                <p>{display.description}</p>
                            </div>
                            <div className="game-actions">
                                <Link to="/games" className="btn btn-dark"><BackIcon /> Back to games</Link>
                                {next && <Link to={`/games/${next.id}`} className="btn btn-gold">Next: {next.name.replace('The Legend of Zelda: ', '')} <ArrowIcon /></Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="container related-games">
                    <div className="section-head"><div><p className="eyebrow cyan"><DiamondIcon />More from the series</p><h2>Continue the legend</h2></div></div>
                    <div className="covers">
                        {related.map((g) => (
                            <Link to={`/games/${g.id}`} className="cover" key={g.id}>
                                <img src={gameAsset('BoxArt', g.name)} alt={g.name} onError={() => setNoArt((ids) => [...ids, g.id])} loading="lazy" />
                                <h4>{g.name.replace('The Legend of Zelda: ', '')}</h4>
                                <span>{yearOf(g.released_date)} · {g.publisher}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}

export default Game
