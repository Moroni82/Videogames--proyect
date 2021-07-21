const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoutes = require('./videogames');
const VideogameRoutes = require('./videogame');
const GenreRoutes = require('./genre');
const router = Router();

router.use('/videogames', VideogamesRoutes);
router.use('/videogame', VideogameRoutes);
router.use('/genre', GenreRoutes);

module.exports = router;
