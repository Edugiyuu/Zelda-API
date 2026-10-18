import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../Styles/Character.css'
import elf from '../Imgs/Races/elf3.png'
import { ChevronIcon, DiamondIcon } from '../Components/Icons';
import { Character as CharacterData, characterImage, getCharacter, getCharacters } from '../api';

const BIO_PREVIEW = 600;

const Character = () => {
    const { character_name = '' } = useParams();
    const [character, setCharacter] = useState<CharacterData | null>();
    const [others, setOthers] = useState<CharacterData[]>([]);
    const [selected, setSelected] = useState<string>();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setCharacter(undefined); setSelected(undefined); setExpanded(false);
        getCharacter(character_name).then(setCharacter).catch(() => setCharacter(null));
    }, [character_name]);
    useEffect(() => { getCharacters().then(setOthers).catch(() => setOthers([])); }, []);

    if (!character) {
        return <main className="page container"><p className="loading">{character === undefined ? 'Consulting the Sheikah Slate…' : 'This character could not be found.'}</p></main>;
    }

    const portrait = selected ?? characterImage(character);
    const related = [
        ...others.filter((c) => c.name !== character.name && c.race === character.race),
        ...others.filter((c) => c.name !== character.name && c.race !== character.race),
    ].slice(0, 5);
    const bio = expanded || character.description.length <= BIO_PREVIEW ? character.description : `${character.description.slice(0, BIO_PREVIEW)}…`;
    const facts = [['Race', character.race], ['Gender', character.gender], ['Age', character.age]];

    return (
        <main className="page container">
            <nav className="crumbs"><Link to="/characters">Characters</Link><ChevronIcon /><b>{character.name}</b></nav>
            <div className="profile">
                <div className="slate-card profile-slate">
                    <div className="frame" />
                    <img
                        className="profile-main"
                        src={portrait}
                        alt={character.name}
                        onError={(e) => { if (character.visuals[0] && e.currentTarget.src !== character.visuals[0]) e.currentTarget.src = character.visuals[0]; }}
                    />
                    {character.visuals.length > 0 && (
                        <div className="profile-thumbs">
                            {character.visuals.slice(0, 4).map((visual) => (
                                <button key={visual} className={`profile-thumb ${visual === selected ? 'on' : ''}`} onClick={() => setSelected(visual)} aria-label={`Show ${character.name} artwork`}>
                                    <img src={visual} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <section className="profile-sheet">
                    <p className="eyebrow"><DiamondIcon />Character profile</p>
                    <h1>{character.name}</h1>
                    <div className="facts">
                        {facts.map(([label, value]) => (
                            <div className="fact" key={label}><span>{label}</span>
                                <b>{label === 'Race' && <img src={elf} alt="" />}{label === 'Race' ? <Link to="/races">{value}</Link> : value || 'Unknown'}</b>
                            </div>
                        ))}
                    </div>
                    <h4><DiamondIcon />Biography</h4>
                    <p className="profile-bio">{bio}</p>
                    {character.description.length > BIO_PREVIEW && (
                        <button className="read-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Read more'}</button>
                    )}
                    {related.length > 0 && <>
                        <h4><DiamondIcon />Related characters</h4>
                        <div className="related-characters">
                            {related.map((c) => (
                                <Link to={`/characters/${c.name}`} className="related-character" key={c.name}>
                                    <img src={characterImage(c)} alt="" onError={(e) => { if (c.visuals[0] && e.currentTarget.src !== c.visuals[0]) e.currentTarget.src = c.visuals[0]; }} />
                                    <b>{c.name}</b>
                                </Link>
                            ))}
                        </div>
                    </>}
                </section>
            </div>
        </main>
    )
}

export default Character
