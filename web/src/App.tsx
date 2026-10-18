import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Footer from "./Components/Footer";
import SeeMore from "./Routes/SeeMore";
import Games from "./Routes/Games";
import Game from "./Routes/Game";
import Characters from "./Routes/Characters";
import Character from "./Routes/Character";
import Bosses from "./Routes/Bosses";
import Races from "./Routes/Races";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<SeeMore />} />

        <Route path="/games" element={<Games />} />
        <Route path="/games/:game_id" element={<Game />} />

        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:character_id" element={<Character />} />

        <Route path="/bosses" element={<Bosses />} />
        <Route path="/races" element={<Races />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
