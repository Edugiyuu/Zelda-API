import { useEffect, useState } from 'react';
import '../Styles/Home.css'
import Lottie from "lottie-react";
import TriForce from "../Imgs/Animations/Animation - 1729270108598.json";
import CustomLink from '../Components/CustomLink'
import BG1 from '../Imgs/Bg/ZeldaHome2.png'
import SimpleBox from '../Components/SimpleBox';

const Home = () => {

    return (
        
            <div className='Home'>
                <div className='TitlesAndMore'>
                    <h1>The Legend of Zelda API</h1>
                    <div className='SimpleBoxes'>
                        <SimpleBox img={BG1} title='Discover more' subtitle='more more mroe vlalala'></SimpleBox>
                        <SimpleBox img={BG1} title='Discover more' subtitle='more more mroe vlalala'></SimpleBox>
                        <SimpleBox img={BG1} title='Discover more' subtitle='more more mroe vlalala'></SimpleBox>
                    </div>
                    <CustomLink className='moreLink' to={'/more'} title={"Expore Now"}></CustomLink>

                    <Lottie className='TriForce' animationData={TriForce} />
                    <div className='homeButtons'>
                    
                    </div>

                </div>

            </div>

   

    )
}

export default Home