import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import '../Styles/Games.css'
import PageHead from "../Components/PageHead";
import { ArrowIcon, SearchIcon } from "../Components/Icons";
import { compendiumNo, Game, gameAsset, getGames, yearOf } from "../api";

const PAGE_SIZE = 15;
const eras = [
    { label: 'All', test: () => true },
    { label: '1980s', test: (y: number) => y < 1990 },
    { label: '1990s', test: (y: number) => y >= 1990 && y < 2000 },
    { label: '2000s', test: (y: number) => y >= 2000 && y < 2010 },
    { label: '2010s+', test: (y: number) => y >= 2010 },
];

/** Falls back to the logo stored in our database, then hides the image. */
const logoFallback = (game: Game) => (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (game.game_title_img && img.src !== game.game_title_img) img.src = game.game_title_img;
    else img.style.visibility = 'hidden';
};

const Games = () => {
    const [params, setParams] = useSearchParams();
    const [games, setGames] = useState<Game[] | null>(null);
    const [query, setQuery] = useState(params.get('q') ?? '');
    const [era, setEra] = useState(0);
    const [sort, setSort] = useState('date');
    const [shown, setShown] = useState(PAGE_SIZE);

    useEffect(() => { setQuery(params.get('q') ?? ''); }, [params]);

    useEffect(() => {
        getGames().then(setGames).catch(() => setGames([]));
    }, []);

    const list = useMemo(() => {
        const term = query.trim().toLowerCase();
        return (games ?? [])
            .filter((g) => g.name.toLowerCase().includes(term))
            .filter((g) => eras[era].test(Number(yearOf(g.released_date)) || 0))
            .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : (Number(yearOf(a.released_date)) || 9999) - (Number(yearOf(b.released_date)) || 9999));
    }, [games, query, era, sort]);

    useEffect(() => { setShown(PAGE_SIZE); }, [query, era, sort]);

    return (
        <main className="page container texture-waves waves-short">
            <PageHead eyebrow="The chronicles" title="A Universe of Zelda Games" lead="Four decades of adventures across Hyrule and beyond. Browse every release, remake and spin-off." />

            <div className="toolbar">
                <form className="searchbox" onSubmit={(e) => { e.preventDefault(); setParams(query ? { q: query } : {}); }}>
                    <label><SearchIcon /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a game…" /></label>
                    <button type="submit">Search</button>
                </form>
                <div className="chips">
                    {eras.map((e, i) => <button key={e.label} className={`chip ${i === era ? 'on' : ''}`} onClick={() => setEra(i)}>{e.label}</button>)}
                </div>
                <label className="select">Sort by
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="date">Release date</option>
                        <option value="name">Name</option>
                    </select>
                </label>
            </div>

            {!games && <p className="loading">Consulting the Sheikah Slate…</p>}
            {games && list.length === 0 && <p className="empty">No game found for “{query}”.</p>}

            <div className="grid">
                {list.slice(0, shown).map((game, i) => (
                    <Link to={`/games/${game.id}`} className="game-card" key={game.id}>
                        <div className="game-logo">
                            <img src={gameAsset('GameIcons', game.name)} onError={logoFallback(game)} alt={game.name} loading="lazy" />
                        </div>
                        <span className="no">{compendiumNo(i)}</span>
                        <h3>{game.name.replace('The Legend of Zelda: ', '')}</h3>
                        <div className="game-meta"><span>{game.developer}</span><b>{yearOf(game.released_date)}</b></div>
                        <span className="game-cta">See Game <ArrowIcon /></span>
                    </Link>
                ))}
            </div>

            {list.length > 0 && (
                <div className="more-row">
                    <span>Showing {Math.min(shown, list.length)} of {list.length} games</span>
                    {shown < list.length && <button className="btn btn-dark" onClick={() => setShown(shown + PAGE_SIZE)}>Load more games</button>}
                </div>
            )}
        </main>
    )
}

export default Games
