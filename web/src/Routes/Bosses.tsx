import { useEffect, useState } from "react";
import '../Styles/Bosses.css'
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
                const NomesExcluidos = ["Agitha", "Glutko","Princess Zelda", "Mazura","Big Liar","Midna","Moldorm","Big Pengator"];
                const filteredBosses = parsedResponse.data.filter((boss: { name: string; }) => {
                   //mostra só os nomes e
                    return !NomesExcluidos.includes(boss.name);
                });
                console.log(filteredBosses);
                setGames(filteredBosses);
            });
    }, []);
    
    

    return (
        <div >

            <h1 className="BossTitle">Fearsome Bosses of Hyrule.</h1>

            <div className="AllBosses">
                {games && games.map((game) => (
                    <div key={game.id} className="BossCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <img
                            style={{ width: '150px' }}
                            src={`/Bosses/${game.name}.png`}

                        />
                        <Link className="BossCardLink" to={`/games/${game.id}`}>See Game</Link>

                    </div>
                ))}
                {newGames && newGames.map((game) => (
                    <div key={game.id} className="BossCard">
                        <h3>{game.name}</h3>
                        <p>{game.released_date}</p>
                        <img
                            src={game.game_title_img}

                        />
                        <Link className="BossCardLink" to={`/games/${game.id}`}>See Game</Link>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Bosses