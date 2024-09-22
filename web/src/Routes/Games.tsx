import { useEffect, useState } from "react";
import '../Styles/Games.css'
import { Link } from "react-router-dom";
import axios from "axios";

interface Games {
    id: string
    name: string
    released_date: string
}

/* 
   1- https://zelda.fandom.com/api.php?action=query&titles=The%20Legend%20of%20Zelda&prop=images&format=json
   2- https://zelda.fandom.com/api.php?action=query&titles=File:LoZ%20International%20Logo.png&prop=imageinfo&iiprop=url&format=json
*/

const Games = () => {
    var [games, setGames] = useState<Games[]>([])
   
   
    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games?limit=100`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGames(parsedResponse.data)
                
            })
    }, []);

useEffect(() => {
    axios.get('zeldaFandom/api.php?action=query&titles=File:BotW_English_Logo.png&prop=imageinfo&iiprop=url&format=json')
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });
}, []);


    

    return (
        <div>

            <h1 className="GameTitle">Games about ZELDA</h1>

            <div className="AllGames">
                {games && games.map((game) => (
                    <div key={game.id} className="GameCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <img 
                        style={{width:'150px'}} 
                        src={`/GameIcons/${game.name.replace(/:/g, '')}.png`} 
                        
                    />
                        <Link className="GameCardLink" to={`/games/${game.id}`}>See Game</Link>
                        
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Games