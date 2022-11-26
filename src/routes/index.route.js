/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const express = require('express');
const authRoute = require('./auth.route');
const moviesRoute = require('./movies.route');
const swaggerUi = require('swagger-ui-express');
const authorize = require('../middleware/authorize/authorize');
const router = express.Router({ mergeParams: true });


// base path
router.get('/', (req, res) => res.send('TMDB API Version1'));

router.use('/auth', authRoute);

router.use('/api/v1/movies', authorize,  moviesRoute);

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