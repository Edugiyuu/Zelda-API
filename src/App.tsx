import Home from "../src/Home/Home";
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from "./NavBar/NavBar";
import SeeMore from "./Routes/SeeMore";

function App() {


  return (
    <BrowserRouter>
      {/*  <BrowserRouter basename="/Pokemon_API_TypeScript"> */}
      
      <NavBar></NavBar>
     
      <Routes>
        {/* <Route path="/" element={<Navigate to="/pokemons" />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/more" element={<SeeMore />} />
        {/* <Route path="pokemon/type/:type" element={<TypeInfo/>}/>
       <Route path="pokemon/favorites" element={<Favorites/>}/> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App
