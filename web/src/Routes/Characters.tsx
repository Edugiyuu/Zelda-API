import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Characters.css"

interface CharactersNames {
    name: string
    visuals:string
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
            <div className="">
                <h1>Characters</h1>
                <input type="text" />
                <button>Pesquisar</button>
            </div>

            <div className="SeeCharacters">
                {characters && characters.map((character) => (
                    <div key={character.name} className="CharacterCard">
                        <h2>{character.name}</h2>
                        <img src={character.visuals[0]} alt="" />
                        <Link className="CharacterLink" to={`/characters/${character.name}`}>See Character</Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters