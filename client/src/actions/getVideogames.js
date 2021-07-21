const axios = require('axios')


export function getVideogames(game) {
  console.log(game)
  return function(dispatch){
    let url = `http://localhost:3001/videogames/`
    if(game){
      url = `http://localhost:3001/videogames/?name=${game}`
    }
    axios.get(url)
    .then(json => {
      dispatch({ type: "GET_VIDEOGAMES", payload: json })
    })  
  }
}