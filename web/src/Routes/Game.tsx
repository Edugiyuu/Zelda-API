import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Styles/Game.css'
import ColorLink from '../Imgs/Characters/ColorLink.png'

interface Game {
    name: string,
    developer: string,
    id: string,
    description: string,
    publisher: string,
    released_date: string
    game_title_img?: string
    box_img?: string
}

const Game = () => {
    const params = useParams();
    var [game, setGame] = useState<Game>()
    var [newGame, setNewGame] = useState<Game>()

    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games/${params.game_id}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGame(parsedResponse.data)

            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:3000/games/${params.game_id}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                setNewGame(parsedResponse)

            })
    }, []);
    const displayGame = game || newGame;
    return (
        <div >
            {displayGame &&
                <div key={displayGame.id} className="GameInfo">
                     <div className='GameImgs'>
                        <img className='GameTitleLogo' src={newGame?.game_title_img ||`/GameIcons/${game?.name.replace(/:/g, '')}.png`} />
                        <img className='BoxArt' src={ newGame?.box_img || `/BoxArt/${game?.name.replace(/:/g, '')}.png`} />
                        {/* <img style={{width:'100px'}} src={ColorLink} alt="" /> */}
                    </div>
                    {<div className='CoolBar'>

                    </div>}
                    <div>
                        
                    </div>
                    <div className='About'>
                        <h1>{displayGame.name}</h1>
                        <p>Released date: {displayGame.released_date}</p>
                        <p>{displayGame.description}</p>
                        <p>Developer: {displayGame.developer}</p>
                        <p>Publisher: {displayGame.publisher}</p>
                    </div>
                </div>

            }

        </div>

    )
}

export default Game