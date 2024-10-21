import { useEffect, useState } from 'react'

interface Races{
    name:string,
    
}

function Races() {
    var [races, setRaces] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/races`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                setRaces(parsedResponse)
            })
    }, []);

  return (
    <div>Races</div>
  )
}

export default Races