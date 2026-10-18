import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Styles/Characters.css"
import elf from "../Imgs/Races/elf3.png"
import PageHead from "../Components/PageHead";
import { ArrowIcon, SearchIcon } from "../Components/Icons";
import { Character, characterImage, compendiumNo, getCharacters } from "../api";

const Characters = () => {
    const [params, setParams] = useSearchParams();
    const [characters, setCharacters] = useState<Character[] | null>(null);
    const [query, setQuery] = useState(params.get('q') ?? '');
    const [race, setRace] = useState('All');

    useEffect(() => { setQuery(params.get('q') ?? ''); }, [params]);
    useEffect(() => { getCharacters().then(setCharacters).catch(() => setCharacters([])); }, []);

    const races = useMemo(() => ['All', ...new Set((characters ?? []).map((c) => c.race))], [characters]);
    const list = (characters ?? []).filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase()) && (race === 'All' || c.race === race));

    return (
        <main className="page container texture-book">
            <PageHead eyebrow="Heroes & legends" title="Characters" lead="The heroes, sages, fairies and villains whose fates are bound to the Triforce." />

            <div className="toolbar">
                <form className="searchbox" onSubmit={(e) => { e.preventDefault(); setParams(query ? { q: query } : {}); }}>
                    <label><SearchIcon /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a character…" /></label>
                    <button type="submit">Search</button>
                </form>
                <div className="chips">
                    {races.map((r) => <button key={r} className={`chip ${r === race ? 'on' : ''}`} onClick={() => setRace(r)}>{r}</button>)}
                </div>
            </div>

            {!characters && <p className="loading">Consulting the Sheikah Slate…</p>}
            {characters && list.length === 0 && <p className="empty">No character found.</p>}

            <div className="grid">
                {list.map((character, i) => (
                    <Link to={`/characters/${character.name}`} className="slate-card character-card" key={character.id || character.name}>
                        <div className="frame" />
                        <span className="no">{compendiumNo(i)}</span>
                        <div className="character-pic">
                            <img
                                src={characterImage(character)}
                                alt={character.name}
                                onError={(e) => { if (character.visuals[0] && e.currentTarget.src !== character.visuals[0]) e.currentTarget.src = character.visuals[0]; }}
                            />
                        </div>
                        <div className="character-plate">
                            <h3>{character.name}</h3>
                            <div className="character-row">
                                <span className="pill"><img src={elf} alt="" />{character.race}</span>
                                <span className="character-go"><ArrowIcon /></span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default Characters
