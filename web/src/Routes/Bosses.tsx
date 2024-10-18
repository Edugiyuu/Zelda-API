import { useEffect, useState } from "react";
/* import '../Styles/Bosses.css' */
import { Link } from "react-router-dom";
import axios from "axios";

interface Bosses {
    id: string
    name: string
    released_date: string
    game_title_img?: string
}

const Bosses = () => {
    var [games, setGames] = useState<Bosses[]>([])
    var [newGames, setNewGames] = useState<Bosses[]>([])


    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/bosses?limit=100`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGames(parsedResponse.data)

            })
    }, []);

    return (
        <div >

            <h1 className="GameTitle">A Universe of Zelda Bosses</h1>

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

export default Bosses