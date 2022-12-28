const express = require('express');
const authRoute = require('./auth.route');
const moviesRoute = require('./movies.route');
const swaggerUi = require('swagger-ui-express');
const authorize = require('../middlewares/authorize');
const router = express.Router({ mergeParams: true });

// base path
router.get('/', (req, res) => res.send('TMDB API Version1'));

// controllers path
router.use('/auth', authRoute);
// router.use('/api/v1/movies', authorize,  moviesRoute);
router.use("/api/v1/movies", moviesRoute);

// health check
router.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
  };
  res.send(JSON.stringify(healthcheck));
});

// swagger
swaggerDocument = require('../swagger.json')
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;