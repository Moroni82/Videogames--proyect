const { Router } = require('express');
const { getVideogames, addVideogame } = require('../Controllers/videogames')
const router = Router();

router.get('/', getVideogames);

module.exports = router;