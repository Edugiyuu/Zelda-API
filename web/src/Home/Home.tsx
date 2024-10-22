import { useEffect, useState } from 'react';
import '../Styles/Home.css'
import Lottie from "lottie-react";
import TriForce from "../Imgs/Animations/Animation - 1729270108598.json";
import CustomLink from '../Components/CustomLink'
import BG1 from '../Imgs/Bg/ZeldaHome2.png'
import BG2 from '../Imgs/Bg/ZeldaHome5.jpg'
import BG3 from '../Imgs/Bg/ZeldaHome6.jpg'
import SimpleBox from '../Components/SimpleBox';
import pointer from '../Imgs/TitleStyle/pointer.png'
import pointer2 from '../Imgs/TitleStyle/pointer2.png'

const Home = () => {

    return (
        
            <div className='Home'>
                <div className='TitlesAndMore'>
                    <div className='Title'>
                        <img src={pointer} alt="" />
                        <h1>The Legend of Zelda API</h1>
                        <img src={pointer2} alt="" />
                    </div>
                    
                    <div className='SimpleBoxes'>
                        <SimpleBox className='SimpleBox' img={BG1} title='Explore the Games' subtitle='Discover detailed information on every Zelda game, from the original NES classic to the latest releases.'></SimpleBox>
                        <SimpleBox className='SimpleBox' img={BG2} title='Meet the Characters' subtitle='Learn more about iconic characters like Link, Princess Zelda, and Ganondorf, and their roles across the series'></SimpleBox>
                        <SimpleBox className='SimpleBox' img={BG3} title='Face the Enemies' subtitle='Dive into the vast array of enemies and bosses across the Zelda universe, with strategies to defeat them' ></SimpleBox>
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