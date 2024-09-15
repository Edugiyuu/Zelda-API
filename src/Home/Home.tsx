
import { useEffect, useState } from 'react';
import '../Styles/Home.css'
import { Link } from 'react-router-dom';
const Home = () => {
var [verdade, setVerdade] = useState(true)

    function handleButtonClick() {
        console.log(verdade); 
    }
    
    return (
        
        <div className='Home'>
            <div className='TitlesAndMore'>
                <h1>The Legend of Zelda API</h1>
                <p>bla bla bla bla bla bla bla bla bla</p>
                <Link to={'/more'} onClick={handleButtonClick}>Ver Mais</Link>
            </div>
            
        </div>


    )
}

export default Home