const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { BASE_URL, API_KEY } = require('../../constants');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize') 

function apiDataFilter(apiResponse){
  if(!apiResponse.data.results){
    apiResponse = [apiResponse.data] 
  } else {
    apiResponse = apiResponse.data.results;
  }
  return apiResponse.map(game => {
    return {
      id: game.id,
      name: game.name,
      platforms: game.platforms && game.platforms.map(el => el.platform.name).join(', '),
      genres: game.genres && game.genres.map(genre => genre.name).join(', '),
      description: game.description,
      releaseDate: game.released,
      rating: game.rating,
      backgroundImage: game.background_image  
    }
  });
}

function idFilter(response){
  return response.map(game => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      releaseDate: game.releaseDate,
      rating: game.rating,
      genres: game.genres.map(genre => genre.name).join(', '),
      backgroundImage: game.backgroundImage
    }
  })
}


function getVideogames(req, res, next){
  const { name } = req.query;
  if(name) return getVideogamesByName(name, res, next)

  const req1 = axios.get(`${BASE_URL}games?key=${API_KEY}&page=1&page_size=40`);
  const req2 = axios.get(`${BASE_URL}games?key=${API_KEY}&page=2&page_size=40`);
  const req3 = axios.get(`${BASE_URL}games?key=${API_KEY}&page=3&page_size=40`);
  const req4 = axios.get(`${BASE_URL}games?key=${API_KEY}&page=4&page_size=40`);

  const dataBaseGames = Videogame.findAll({ include: Genre })
  Promise.all([ req1, req2, req3, req4, dataBaseGames ])
    .then((response) => {
      let [ res1, res2, res3, res4, dataBaseGamesRes ] = response;

      dataBaseGamesRes = idFilter(dataBaseGamesRes)
      res1 = apiDataFilter(res1);
      res2 = apiDataFilter(res2);
      res3 = apiDataFilter(res3);
      res4 = apiDataFilter(res4);
      return res.status(200).send([...dataBaseGamesRes, ...res1, ...res2, ...res3, ...res4])
    })
    .catch(err => next(err));
};
function getVideogamesByName(name, res, next){
  const gamesApi = axios.get(`${BASE_URL}games?search=${name}&key=${API_KEY}`)
  const dataBaseGames = Videogame.findAll({ 
    where: {
      name: {
        [Op.like]: '%' + name + '%'
      }
    }
  })
  Promise.all([ gamesApi, dataBaseGames ])
    .then(response => {
      let [ gamesApiRes, dataBaseGamesRes ] = response;
      gamesApiRes = apiDataFilter(gamesApiRes);
      return res.status(200).send([...dataBaseGamesRes, ...gamesApiRes])
    })
    .catch(err => next(err));
}

function getVideogameById(req, res, next){
  if(isNaN(req.params.id)) {
    Videogame.findOne({
      where: {
        id: req.params.id
      },
      include: Genre
    })
    .then(dataBaseGamesRes => {
      dataBaseGamesRes = idFilter([dataBaseGamesRes])
      return res.status(200).send(...dataBaseGamesRes);
    })
    .catch(err => next(err));
  } else {
    axios.get(`${BASE_URL}games/${req.params.id}?key=${API_KEY}`)
      .then(gamesApiRes => {
        gamesApiRes = apiDataFilter(gamesApiRes);
        return res.status(200).send(...gamesApiRes)
      })
      .catch(err => next(err));
  }
}

function addVideogame(req, res, next){
 const { name, description, releaseDate, rating,  platforms, genres, backgroundImage } = req.body;
  const id = uuidv4();
  const videogame = { 
    id,
    name,
    description,
    releaseDate,
    rating,
    platforms,
    backgroundImage
  }
  return Videogame.create(videogame)
    .then(newVideogame => {
      newVideogame.setGenres(genres)
      return res.status(200).send(newVideogame)
    })
    .catch(err => next(err));
};


module.exports = {
  getVideogames,
  addVideogame,
  getVideogameById
};

/* 
videogames
-Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter, 
(Si no existe, mostrar un mensaje adecuado)
-crear un videogame(body)
-traer un solo videogame(id)
*/