import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Styles/Character.css'
import ColorLink from '../Imgs/Characters/ColorLink.png'

interface Character {
    name: string,
    age: string,
    description: string,
    gender: string,
    id: string,
    race:string,
    visuals:[string]
}

const Character = () => {
    const params = useParams();
    var [character, setCharacter] = useState<Character>()

    useEffect(() => {
        fetch(`http://localhost:3000/character/${params.character_id}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                setCharacter(parsedResponse)

            })
    }, []);
    
    return (
        <div >
            {character &&
                <div key={character.id} className="GameInfo">
                     <div className='CharacterImgs'>
                     <img
                            src={`/Characters/${character.name}.png`}
                            alt={character.name}
                            onError={(erro) => {
                                if (character && character.visuals && character.visuals.length > 0) {
                                  erro.currentTarget.src = character.visuals[0];
                                } else {
                                  erro.currentTarget.src = '/Characters/camera.png';
                                }
                              }}
                              
                        />
                      
                    </div>

                    <div>
                        
                    </div>
                    <div className='About'>
                        <h1>{character.name}</h1>
                        <p>Age: {character.age}</p>
                        <p>Race: {character.race}</p>
                        <p>Gender: {character.gender}</p>
                        <p>{character.description}</p>
                    </div>
                </div>

            }

        </div>

    )
}

export default Character