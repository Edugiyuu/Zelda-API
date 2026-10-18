import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Races.css'
import PageHead from '../Components/PageHead';
import { ChevronIcon } from '../Components/Icons';
import { Character, compendiumNo, getCharacters, getRaces, Race } from '../api';

/** Races are stored in plural ("Hylians") while characters use the singular ("Hylian"). */
const singular = (name: string) => name.replace(/s$/, '');

function Races() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    getRaces().then((list) => { setRaces(list); setOpen(list[0]?.name ?? null); }).catch(() => setRaces([]));
    getCharacters().then(setCharacters).catch(() => setCharacters([]));
  }, []);

  const membersOf = (race: Race) => characters.filter((c) => c.race === singular(race.name));
  const documented = new Set((races ?? []).map((r) => singular(r.name)));
  const upcoming = [...new Set(characters.map((c) => c.race))].filter((r) => !documented.has(r));

  return (
    <main className="page container texture-book compact">
      <PageHead eyebrow="Peoples of Hyrule" title="Races" lead="From the pointed-eared Hylians to the people beyond the kingdom, discover who inhabits the land of legend." />
      <div className="races">
        {!races && <p className="loading">Consulting the Sheikah Slate…</p>}

        {races?.map((race, i) => {
          const members = membersOf(race);
          const isOpen = open === race.name;
          return (
            <article className={`race ${isOpen ? 'open' : ''}`} key={race.id || race.name}>
              <button className="race-head" onClick={() => setOpen(isOpen ? null : race.name)} aria-expanded={isOpen}>
                <span className="no">{compendiumNo(i, 2)}</span>
                <h2>{race.name}</h2>
                <span className="pill">{members.length} known member{members.length === 1 ? '' : 's'}</span>
                <span className="race-chevron"><ChevronIcon direction={isOpen ? 'up' : 'down'} /></span>
              </button>
              {isOpen && (
                <div className="race-body">
                  <div className="race-pic">{race.imgs[0] && <img src={race.imgs[0]} alt={race.name} />}</div>
                  <div className="race-text">
                    <p>{race.description.trim()}</p>
                    <div className="race-facts">
                      <div className="fact"><span>Habitat</span><b>{race.habitat}</b></div>
                      <div className="fact"><span>Characteristics</span><b className="fact-long">{race.characteristics}</b></div>
                    </div>
                    {members.length > 0 && (
                      <div className="race-members">
                        {members.map((c) => <Link to={`/characters/${c.name}`} className="pill dark" key={c.name}>{c.name}</Link>)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {upcoming.map((name, i) => {
          const count = characters.filter((c) => c.race === name).length;
          return (
            <article className="race upcoming" key={name}>
              <div className="race-head">
                <span className="no">{compendiumNo(i + (races?.length ?? 0), 2)}</span>
                <h2>{name}</h2>
                <span className="pill muted">Coming soon</span>
                <span className="race-count">{count} character{count === 1 ? '' : 's'} waiting</span>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  )
}

export default Races
