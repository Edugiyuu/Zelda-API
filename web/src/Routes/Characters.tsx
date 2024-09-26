import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Characters.css"

interface CharactersNames {
    name: string
}

const Characters = () => {
    var [characters, setCharacters] = useState<CharactersNames[]>([])

    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/characters?limit=100`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                const characterNames = [];

                for (let i = 0; i < parsedResponse.data.length; i++) {
                    console.log(parsedResponse.data[i].name);
                    characterNames.push(parsedResponse.data[i]);
                }
                console.log(parsedResponse.data[0].name);
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
                    <div className="CharacterCard">
                        <h2>{character.name}</h2>

                        <Link className="CharacterLink" to={`/characters/${character.name}`}>See Character</Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters