import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Characters.css"
import "../Styles/mobile/Characters.css"
import elf from "../Imgs/Races/elf3.png"

interface CharactersNames {
    name: string
    visuals: string
    id: string
    race:string
}

const Characters = () => {
    var [characters, setCharacters] = useState<CharactersNames[]>([])

    useEffect(() => {
        fetch(`http://localhost:3000/characters`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                const characterNames = [];

                for (let i = 0; i < parsedResponse.length; i++) {
                    /* console.log(parsedResponse[i]); */
                    characterNames.push(parsedResponse[i]);
                }

                setCharacters(characterNames)

            })
    }, []);
    return (
        <div>
        <h1 className='CharacterTitle'style={{textAlign:'center'}}>Characters</h1>
            <div className="Search">
                <input type="text" placeholder="Search for a character" />
                <button>Search</button>
            </div>

            <div className="SeeCharacters">
                {characters && characters.map((character) => (
                    <div key={character.name} className="CharacterCard">
                        <div>
                            <h2>{character.name}</h2>
                        {/* <img src={`/Characters/${character.name}.png` || character.visuals[0] } alt="" /> */}
                        <img
                            src={`/Characters/${character.name}.png`}
                            alt={character.name}
                            onError={(erro) => erro.currentTarget.src = character.visuals[0]}
                        />
                        </div>
                        
                        <Link className="CharactersRaces"to={`/characters/${character.id}`} >{character.race} <img src={elf} alt="" /></Link>
                        <Link className="CharacterLink" to={`/characters/${character.id}`}>See Character</Link>                      
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters