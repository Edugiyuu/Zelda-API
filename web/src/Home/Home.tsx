
import { useEffect, useState } from 'react';
import '../Styles/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
       
        <div className='Home'>
            <div className='TitlesAndMore'>
                <h1>The Legend of Zelda API</h1>
                <p>bla bla bla bla bla bla bla bla bla</p>
                <Link to={'/more'}>See more</Link>
            </div>
        
        </div>

        </div>

    )
}

export default Home