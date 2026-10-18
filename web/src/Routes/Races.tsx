import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Races.css'
import PageHead from '../Components/PageHead';
import { ChevronIcon } from '../Components/Icons';
import { compendiumNo, getRaces, Race } from '../api';

function Races() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const documented = (races ?? []).filter((r) => r.description);
  const upcoming = (races ?? []).filter((r) => !r.description);

  useEffect(() => {
    getRaces().then((list) => { setRaces(list); setOpen(list.find((r) => r.description)?.id ?? null); }).catch(() => setRaces([]));
  }, []);

  return (
    <main className="page container texture-book compact">
      <PageHead eyebrow="Peoples of Hyrule" title="Races" lead="From the pointed-eared Hylians to the people beyond the kingdom, discover who inhabits the land of legend." />
      <div className="races">
        {!races && <p className="loading">Consulting the Sheikah Slate…</p>}

        {documented.map((race, i) => {
          const members = race.members;
          const isOpen = open === race.id;
          return (
            <article className={`race ${isOpen ? 'open' : ''}`} key={race.id}>
              <button className="race-head" onClick={() => setOpen(isOpen ? null : race.id)} aria-expanded={isOpen}>
                <span className="no">{compendiumNo(i, 2)}</span>
                <h2>{race.name}</h2>
                <span className="pill">{members.length} known member{members.length === 1 ? '' : 's'}</span>
                <span className="race-chevron"><ChevronIcon direction={isOpen ? 'up' : 'down'} /></span>
              </button>
              {isOpen && (
                <div className="race-body">
                  <div className="race-pic">{race.imgs[0] && <img src={race.imgs[0]} alt={race.name} />}</div>
                  <div className="race-text">
                    <p>{race.description}</p>
                    <div className="race-facts">
                      <div className="fact"><span>Habitat</span><b>{race.habitat}</b></div>
                      <div className="fact"><span>Characteristics</span><b className="fact-long">{race.characteristics}</b></div>
                    </div>
                    {members.length > 0 && (
                      <div className="race-members">
                        {members.map((c) => <Link to={`/characters/${c.id}`} className="pill dark" key={c.id}>{c.name}</Link>)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {upcoming.map((race, i) => {
          const count = race.members.length;
          return (
            <article className="race upcoming" key={race.id}>
              <div className="race-head">
                <span className="no">{compendiumNo(i + documented.length, 2)}</span>
                <h2>{race.name}</h2>
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
