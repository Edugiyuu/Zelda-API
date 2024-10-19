import { useEffect, useState } from 'react';
import '../Styles/Home.css'
import Lottie from "lottie-react";
import TriForce from "../Imgs/Animations/Animation - 1729270108598.json";
import CustomLink from '../Components/CustomLink'

const Home = () => {

    return (
        
            <div className='Home'>
                <div className='TitlesAndMore'>
                    <h1>The Legend of Zelda API</h1>

                    <CustomLink to={'/more'} title={"Expore Now"}></CustomLink>

                    <Lottie className='TriForce' animationData={TriForce} />
                    <div className='homeButtons'>

                    {/* 
                    <CustomLink to={'/more'} title={"See more"}></CustomLink> */}
                    </div>

                </div>

            </div>

   

    )
}

export default Home