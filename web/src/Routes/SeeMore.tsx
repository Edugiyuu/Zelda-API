import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SeeMore.css';
import ZeldaLogo from '../Imgs/Bg/ZeldaLogo.png'
import BossArt from '../Imgs/Bg/Boss.png'
import CharactersArt from '../Imgs/Bg/Characters.png'
import MonsterArt from '../Imgs/Bg/Monster.png'
import DungeonArt from '../Imgs/Bg/Link2.png'
import RacesArt from '../Imgs/Bg/Races.png'
import { ArrowIcon, DiamondIcon } from '../Components/Icons';
import { compendiumNo, getAllGames, getBosses, getCharacters, getRaces } from '../api';

const count = (promise: Promise<unknown[]>) => promise.then((list) => list.length).catch(() => null);

const SeeMore = () => {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    Promise.all([count(getAllGames()), count(getBosses()), count(getCharacters()), count(getRaces())])
      .then(([games, bosses, characters, races]) => setCounts({ games, bosses, characters, races }));
  }, []);

  const tiles = [
    { title: 'Games', img: ZeldaLogo, to: '/games', count: counts.games },
    { title: 'Bosses', img: BossArt, to: '/bosses', count: counts.bosses },
    { title: 'Characters', img: CharactersArt, to: '/characters', count: counts.characters },
    { title: 'Monsters', img: MonsterArt },
    { title: 'Dungeons', img: DungeonArt },
    { title: 'Races', img: RacesArt, to: '/races', count: counts.races },
  ];

  return (
    <main className="page container texture-waves">
      <header className="explore-head">
        <p className="eyebrow"><DiamondIcon />Explore<DiamondIcon /></p>
        <p className="explore-small">Know more about the</p>
        <h1 className="explore-big">Zelda Universe</h1>
        <p className="page-lead">Pick a chapter of the legend. Each collection is powered by the Hyrule Compendium API.</p>
        <div className="rule"><span /><DiamondIcon /><span /></div>
      </header>

      <div className="explore-body">
        <div className="slate-card explore-feature">
          <div className="frame" />
          <div className="explore-feature-copy">
            <p className="eyebrow"><DiamondIcon />Start here</p>
            <h3>Begin with the hero</h3>
            <p>Every legend starts with a boy in green. Meet Link and the companions who walk beside him.</p>
            <Link to="/characters/Link" className="btn btn-gold">Meet Link <ArrowIcon /></Link>
          </div>
        </div>

        <div className="explore-grid">
          {tiles.map((tile, i) => {
            const content = <>
              <div className="explore-tile-img">
                <img src={tile.img} alt="" />
                <span className={`pill ${tile.to ? '' : 'muted'}`}>{tile.to ? 'Available' : 'Coming soon'}</span>
              </div>
              <div className="explore-tile-label">
                <div>
                  <span className="no">{compendiumNo(i, 2)}</span>
                  <b>{tile.title}</b>
                  <span>{tile.to ? `${tile.count ?? '—'} entries` : 'Coming soon'}</span>
                </div>
                <span className="explore-tile-arrow"><ArrowIcon /></span>
              </div>
            </>;
            return tile.to
              ? <Link to={tile.to} className="explore-tile" key={tile.title}>{content}</Link>
              : <div className="explore-tile soon" key={tile.title}>{content}</div>;
          })}
        </div>
      </div>
    </main>
  );
};

export default SeeMore;
