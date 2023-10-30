
import axios from 'axios'

export default function App() {
  let myTeam = []
  let targetType = ''

 // Calls API
  const randomPokemon = async() => {
    // Selects random pokemon with id's between 1 and 151, bulbasaur thru mewtwo
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    let randomNumber = Math.floor(Math.random() * 150)+1
    let response = await axios.get(`${url}${randomNumber}`)
    // console.log(response.data.types[0].type)

    // Checks number of team members
    // if no team members set target type and add first team member
    if (myTeam.length <1) {
      targetType = response.data.types[0].type.name
      myTeam.push(response.data)

    // if team has 6 members alert can't add more members
    } else if (myTeam.length == 6) {
      console.log("you have a full team!")

    // add more team members as long as they are the same type otherwise try again
    } else {
      if (response.data.types[0].type.name == targetType) {
        myTeam.push(response.data)
      } else {
        randomPokemon()
      };
    };
    console.log(myTeam)
    
  }
  
  return (
    <>
      <h2>My Pokemon Team</h2>
      <h3>Target type: {targetType}</h3>
      <button onClick={randomPokemon}>Add pokemon</button>
      <ul>
      {
        myTeam.map((pokemon) => (
          <li>{pokemon.name}</li>
        ))
      }
      </ul>
    </>
  )
};

