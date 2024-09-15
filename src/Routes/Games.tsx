import { useEffect, useState } from "react";
import '../Styles/Games.css'
import { Link } from "react-router-dom";

interface Games {
    id: 'string'
    name: 'string'
    released_date: 'string'
}

const Games = () => {
    var [games, setGames] = useState<Games[]>([])
    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGames(parsedResponse.data)
            })
    }, []);

    return (
        <div className="">

            <h1>Games about ZELDA</h1>

            <div className="AllGames">
                {games && games.map((game) => (
                    <div key={game.id} className="GameCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <Link to={""}>See Game</Link>
                        
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Games