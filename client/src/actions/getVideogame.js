const axios = require('axios')

export function getVideogameById(id) {
  return function(dispatch){
    axios.get(`http://localhost:3001/videogame/${id}`)
    .then(game => {
      dispatch({type: "GET_VIDEOGAME_BY_ID", payload: game})
    })
  }
}