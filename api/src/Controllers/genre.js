const { BASE_URL , API_KEY } = require('../../constants');
const { Genre } = require('../db');
const axios = require('axios');

function apiDataFilter(apiResponse){
return apiResponse.data.results.map(genre => {
    return {
      id: genre.id,
      name: genre.name,
    }
  });
}

function getAllGenres(req, res, next){
  axios.get(`${BASE_URL}genres?key=${API_KEY}`)
    .then(genres => {
      genres = apiDataFilter(genres);
        genres.forEach(genre => {
          Genre.findOrCreate({ 
            where: {
              name: genre.name
            },
            defaults: genre
          });
      })
    })
    .then(response => {
      Genre.findAll()
        .then(findgenres => {
          return res.status(200).send(findgenres)
        });
    })
    .catch(err => next(err))
}



module.exports = {
  getAllGenres,
}


// [] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí