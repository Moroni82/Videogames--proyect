const axios = require('axios');

export function getGenres() {
  return function(dispatch){
    axios.get('http://localhost:3001/genre/')
      .then(genres => {
        dispatch ({ type:"GET_GENRES", payload: genres })
      })
  }
}

