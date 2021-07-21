const {API_KEY} = process.env;
const BASE_URL =  'https://api.rawg.io/api/';
const VIDEOGAME_URL = 'games?search=';

module.exports = {
  BASE_URL,
  VIDEOGAME_URL,
  API_KEY,
}