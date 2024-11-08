import Home from "../src/Home/Home";
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from "./NavBar/NavBar";
import SeeMore from "./Routes/SeeMore";
import Games from "./Routes/Games";
import Characters from "./Routes/Characters";
import Character from "./Routes/Character";
import Game from "./Routes/Game";
import Bosses from "./Routes/Bosses";
import Races from "./Routes/Races";


function App() {


  return (
    <BrowserRouter>
      {/*  <BrowserRouter basename="/Pokemon_API_TypeScript"> */}
      
      <NavBar></NavBar>
     
      <Routes>
        {/* <Route path="/" element={<Navigate to="/pokemons" />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/more" element={<SeeMore />} />

        <Route path="/games" element={<Games />} />
        <Route path="/games/:game_id" element={<Game/>}/>

        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:character_name" element={<Character/>}/>

        <Route path="/bosses" element={<Bosses />} />
        {/* <Route path="/bosses/:bosse_id" element={<Character/>}/> */}

        <Route path="/races" element={<Races />} />
      
      </Routes>

    </BrowserRouter>
  )
}

export default App
