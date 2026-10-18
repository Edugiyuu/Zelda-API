import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../Styles/Bosses.css'
import Guardian from '../Imgs/Bg/Boss.png'
import { DiamondIcon, SearchIcon } from "../Components/Icons";
import { Boss, compendiumNo, getBosses } from "../api";

const PAGE_SIZE = 15;

const Bosses = () => {
    const [params, setParams] = useSearchParams();
    const [bosses, setBosses] = useState<Boss[] | null>(null);
    const [noArt, setNoArt] = useState<string[]>([]);
    const [query, setQuery] = useState(params.get('q') ?? '');
    const [sort, setSort] = useState('az');
    const [shown, setShown] = useState(PAGE_SIZE);

    useEffect(() => { setQuery(params.get('q') ?? ''); }, [params]);
    useEffect(() => {
        getBosses().then(setBosses).catch(() => setBosses([]));
    }, []);

    const list = useMemo(() => (bosses ?? [])
        .filter((b) => !noArt.includes(b.id) && b.name.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : sort === 'za' ? b.name.localeCompare(a.name) : b.appearances.length - a.appearances.length),
        [bosses, noArt, query, sort]);

    useEffect(() => { setShown(PAGE_SIZE); }, [query, sort]);

    return (
        <main className="page">
            <section className="boss-hero">
                <div className="container boss-hero-inner">
                    <img className="boss-guardian" src={Guardian} alt="" />
                    <div className="boss-copy">
                        <p className="eyebrow red"><DiamondIcon />Bestiary</p>
                        <h1><span className="red-text">Fearsome Bosses of Hyrule</span></h1>
                        <p className="page-lead">Guardians, phantoms and blights. Study every foe that ever stood between the hero and the Triforce.</p>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="toolbar">
                    <form className="searchbox" onSubmit={(e) => { e.preventDefault(); setParams(query ? { q: query } : {}); }}>
                        <label><SearchIcon /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a boss…" /></label>
                        <button type="submit">Search</button>
                    </form>
                    <label className="select">Sort by
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="az">Name (A–Z)</option>
                            <option value="za">Name (Z–A)</option>
                            <option value="appearances">Most appearances</option>
                        </select>
                    </label>
                </div>

                {!bosses && <p className="loading">Sensing malice…</p>}
                {bosses && list.length === 0 && <p className="empty">No boss found.</p>}

                <div className="grid">
                    {list.slice(0, shown).map((boss, i) => (
                        <article className="boss-card" key={boss.id}>
                            <div className="boss-art">
                                <img src={`/Bosses/${boss.name}.png`} alt={boss.name} loading="lazy" onError={() => setNoArt((ids) => [...ids, boss.id])} />
                            </div>
                            <div className="boss-body">
                                <span className="no">{compendiumNo(i)}</span>
                                <h3>{boss.name}</h3>
                                <span className="pill red">{Math.max(1, boss.appearances.length)} game{boss.appearances.length > 1 ? 's' : ''}</span>
                            </div>
                        </article>
                    ))}
                </div>

                {list.length > 0 && (
                    <div className="more-row">
                        <span>Showing {Math.min(shown, list.length)} of {list.length} bosses</span>
                        {shown < list.length && <button className="btn btn-dark" onClick={() => setShown(shown + PAGE_SIZE)}>Load more bosses</button>}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Bosses
