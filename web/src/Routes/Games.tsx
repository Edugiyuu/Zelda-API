import { useEffect, useState } from "react";
import '../Styles/Games.css'
import { Link } from "react-router-dom";
import axios from "axios";

interface Games {
    id: string
    name: string
    released_date: string
    game_title_img?: string
}
/* 
   1- https://zelda.fandom.com/api.php?action=query&titles=The%20Legend%20of%20Zelda&prop=images&format=json
   2- https://zelda.fandom.com/api.php?action=query&titles=File:LoZ%20International%20Logo.png&prop=imageinfo&iiprop=url&format=json
*/

const Games = () => {
    var [games, setGames] = useState<Games[]>([])
    var [newGames, setNewGames] = useState<Games[]>([])


    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games?limit=100`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGames(parsedResponse.data)

            })
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/games`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                setNewGames(parsedResponse)

            })
    }, []);
    /*     
    useEffect(()  => {
        axios.get('http://localhost:3000/games')
      .then(response => {
        console.log(response.data);
        setNewGames(response.data.data)
      }, error => {
        console.log(error);
      });
    }, []); */

    return (
        <div >

            <h1 className="GameTitle">A Universe of Zelda Games</h1>

            <div className="AllGames">
                {games && games.map((game) => (
                    <div key={game.id} className="GameCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <img
                            style={{ width: '150px' }}
                            src={`/GameIcons/${game.name.replace(/:/g, '')}.png`}

                        />
                        <Link className="GameCardLink" to={`/games/${game.id}`}>See Game</Link>

                    </div>
                ))}
                {newGames && newGames.map((game) => (
                    <div key={game.id} className="GameCard">
                        <h3>{game.name}</h3>
                        <p>{game.released_date}</p>
                        <img
                            src={game.game_title_img}

                        />
                        <Link className="GameCardLink" to={`/games/${game.id}`}>See Game</Link>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Games