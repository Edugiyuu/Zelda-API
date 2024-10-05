import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Characters.css"

interface CharactersNames {
    name: string
    visuals: string
    id: string
}

const Characters = () => {
    var [characters, setCharacters] = useState<CharactersNames[]>([])

    useEffect(() => {
        fetch(`http://localhost:3000/characters`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                const characterNames = [];

                for (let i = 0; i < parsedResponse.length; i++) {
                    console.log(parsedResponse[i].name);
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
                        <h2>{character.name}</h2>
                        {/* <img src={`/Characters/${character.name}.png` || character.visuals[0] } alt="" /> */}
                        <img
                            src={`/Characters/${character.name}.png`}
                            alt={character.name}
                            onError={(erro) => erro.currentTarget.src = character.visuals[0]}
                        />
                        <Link className="CharacterLink" to={`/characters/${character.id}`}>See Character</Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters