import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../Styles/Character.css'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import elf from '../Imgs/Races/elf.png'

interface Character {
    name: string,
    age: string,
    description: string,
    gender: string,
    id: string,
    race: string,
    visuals: [string]
}

const Character = () => {
    const params = useParams();
    var [character, setCharacter] = useState<Character>()

    useEffect(() => {
        fetch(`http://localhost:3000/character/${params.character_name}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                setCharacter(parsedResponse)

            })
    }, []);
    return (
        <div >
            {character &&
                <div key={character.id} className="CharacterInfo">
                    <div className='CharacterImgs'>

                        <AliceCarousel infinite disableButtonsControls autoPlayStrategy='none' autoPlay autoPlayInterval={2500}>
                            {character.visuals.map((visual) => (
                                <img src={visual} className="sliderimg" />
                            ))}
                        </AliceCarousel>

                    </div>

                    <div>

                    </div>
                    <div className='AboutCharacter'>
                        <h1>{character.name}</h1>
                        <p>Age: {character.age}</p>
                        <p>Race: <Link className='CharacterRace' to="/races">{character.race} <img src={elf} alt="" /></Link></p>
                        <p>Gender: {character.gender}</p>
                        <p>{character.description}</p>
                    </div>
                </div>

            }

        </div>

    )
}

export default Character