import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Styles/Game.css'

interface Game {
    name: string,
    developer: string,
    id: string,
    description: string,
    publisher: string,
    released_date: string
}

const Game = () => {
    const params = useParams();
    var [game, setGame] = useState<Game>()

    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games/${params.game_id}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGame(parsedResponse.data)

            })
    }, []);

    return (
        <div >
            {game &&
                <div key={game.id} className="GameInfo">
                     <div className='GameImgs'>
                        <img className='GameTitleLogo' src={`/GameIcons/${game.name.replace(/:/g, '')}.png`} />
                        <img className='BoxArt' src={`/BoxArt/${game.name.replace(/:/g, '')}.png`} />

                    </div>
                    <div className='About'>
                        <h2>{game.name}</h2>
                        <p>Released date: {game.released_date}</p>
                        <p>{game.description}</p>
                        <p>Developer: {game.developer}</p>
                        <p>Publisher: {game.publisher}</p>
                    </div>
                </div>

            }

        </div>

    )
}

export default Game