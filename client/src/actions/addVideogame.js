import axios from "../../../api/node_modules/axios";


export function addGame(game) {
  return function(dispatch) {
    axios.get(`http://localhost:3001/videogame/${game}`)
    .then(videogame => {
       dispatch({ type: "ADD_VIDEOGAME", payload: videogame })
    })
  }
}
