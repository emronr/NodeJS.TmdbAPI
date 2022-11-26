const express = require('express');
const router = express.Router({ mergeParams: true });
const moviesController = require('../controllers/moviesController.js');

//Veri tabanına sorgu atar
router.route('/')
    .get(moviesController.getMovies);


//Beğenilen filmlere göre girilen eposta adresine film önerileri gönderir.
router.route("/suggest/")
    .get(moviesController.suggestMovie);

//Filmlere note ve oy ekler
router.route("/note/")
    .post(moviesController.addNote);

//TMDB API'ya sorgu atar
router.route("/tmdb/:tmdbId")
    .get(moviesController.getFromTMDB);

//Veri tabanındaki id değerini getirir
router.route('/:id')
    .get(moviesController.getById);

// router.route("/tmdb/populars/")
//     .get(moviesController.getPopularMoviesFromTMBDB);


module.exports = router;