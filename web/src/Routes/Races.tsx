import { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';

import img from '../Imgs/Characters/MiniLink.png'
interface Races {
  name: string,

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
            
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
            
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            <img src={img} alt="" />
          </AccordionDetails>
        </Accordion><Accordion>
            <AccordionSummary
              
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Accordion 2
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion><Accordion defaultExpanded>
            <AccordionSummary
           
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Accordion Actions
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
            <AccordionActions>
              <Button>Cancel</Button>
              <Button>Agree</Button>
            </AccordionActions>
          </Accordion></>

      ))}
    </div>
  )
}

export default Races