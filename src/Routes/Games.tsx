import { useEffect, useState } from "react";
import '../Styles/Games.css'
import { Link } from "react-router-dom";

interface Games {
    id: 'string'
    name: 'string'
    released_date: 'string'
}
interface Image {
    ns: number;
    title: string;
}
interface WikiPage {
    pageid: number;
    title: string;
    images: Image[];
}

/* interface WikiResponse {
    numerosaqui?: WikiPage; 
} */

/* 
   1- https://zelda.fandom.com/api.php?action=query&titles=The%20Legend%20of%20Zelda&prop=images&format=json
   2- https://zelda.fandom.com/api.php?action=query&titles=File:LoZ%20International%20Logo.png&prop=imageinfo&iiprop=url&format=json
*/

const Games = () => {
    var [games, setGames] = useState<Games[]>([])
    var [wikiImgs, setWikiImgs] = useState<WikiPage[]>([])
   
    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.data);
                setGames(parsedResponse.data)
                
            })
    }, []);

    useEffect(() => {       
        for (let i = 0; i < games.length; i++) {
            console.log(games[i].name);
            fetch(`/zeldaFandom/api.php?action=query&titles=${games[i].name}&prop=images&format=json`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse.query.pages);

            })
            .catch((error) => console.error(error));
        }  
    }, []);
    

    return (
        <div>

            <h1 className="GameTitle">Games about ZELDA</h1>

            <div className="AllGames">
                {games && games.map((game) => (
                    <div key={game.id} className="GameCard">
                        <h2>{game.name}</h2>
                        <p>{game.released_date}</p>
                        <img style={{width:'150px'}} src="https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4c/TotK_English_Logo.png" alt="" />
                        <Link className="GameCardLink" to={""}>See Game</Link>
                        
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Games