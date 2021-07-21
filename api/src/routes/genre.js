const { Router } = require('express');
const { getAllGenres } = require('../Controllers/genre')
const router = Router();

router.get('/', getAllGenres);

module.exports = router;