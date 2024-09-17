import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface CharactersNames{
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
        <h1>Characters</h1>
        <input type="text" />
        <div>
        {characters && characters.map((character) => (
                    <div className="Characters">
                        <h2>{character.name}</h2>
                        <img style={{width:'150px'}} src="https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4c/TotK_English_Logo.png" alt="" />
                        <Link className="CharacterLink" to={`/characters/${character.name}`}>See Game</Link>
                        
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Characters