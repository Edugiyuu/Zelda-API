import { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import '../Styles/Races.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import img from '../Imgs/Characters/MiniLink.png'
interface Races {
  name: string,
  description:string,
  habitat:string,
  imgs:[string],
  characteristics:string
}

function Races() {
  var [races, setRaces] = useState<Races[]>([])
  useEffect(() => {
    fetch(`http://localhost:3000/races`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setRaces(parsedResponse)
      })
  }, []);

  return (
    <div>
      {races && races.map((race) => (
        <><Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {race.name}
            
          </AccordionSummary>
          <AccordionDetails className='RacesBox'>
            <p>{race.description}</p>
            <p>Habitat:{race.habitat}</p>
            <p>Characteristics: {race.characteristics}</p>
           
            {race.imgs.map((imagem) => (
              <img src={imagem} alt="" />
            ))}
          </AccordionDetails>
          </Accordion></>

      ))}
    </div>
  )
}

export default Races