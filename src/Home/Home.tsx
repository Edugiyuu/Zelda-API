
import { useEffect, useState } from 'react';
import '../Styles/Home.css'
const Home = () => {
var [verdade, setVerdade] = useState(true)

    function handleButtonClick() {
        console.log(verdade); 
    }
    useEffect(() => {
        fetch(`https://zelda.fanapis.com/api/games`)
            .then((response) => response.json())
            .then((parsedResponse) => {

                console.log(parsedResponse);
                
            })
    }, []);
    return (
        
        <div className='Home'>
            <div className='TitlesAndMore'>
                <h1>The Legend of Zelda</h1>
                <p>bla bla bla bla bla bla bla bla bla</p>
                <button onClick={handleButtonClick}>Ver Mais</button>
            </div>
            
        </div>


    )
}

export default Home