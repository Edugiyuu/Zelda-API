import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

interface Game{
    name: string,
    developer:string,
    id:string,
    publisher:string,
    released_date:string
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
    <div>
        <div className="GameInfo">
                {game && 
                    <div key={game.id} className="GameCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <img 
                        style={{width:'150px'}} 
                        src={`/GameIcons/${game.name.replace(/:/g, '')}.png`} 
                        
                    />
                      
                        
                    </div>
                }
            </div>
    </div>
  )
}

export default Game