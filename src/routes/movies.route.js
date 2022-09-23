const express = require('express');
const router = express.Router({ mergeParams: true });

const moviesController = require('../controllers/movies.controller.js');

router.route('/')
    .get(moviesController.getMovies);

router.route('/:id')
    .get(moviesController.getById);

module.exports = router;