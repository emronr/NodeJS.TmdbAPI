const basicMovieService = require('../services/basicMovieService');
const tmdbService = require('../services/tmdbService');
var moviesController = {
    getMovies: async (req, res) => {
        res.json(await basicMovieService.getAllPaging(req.query.size, req.query.currentPage));
    },
    getById: async (req, res) => {
        console.log("getById");
        var movie = await basicMovieService.getById(req.params.id);
        res.json(movie);
    },
    getFromTMDB: async (req, res) => {
        var movie = await tmdbService.getMovie(req.params.tmdbId);
        res.json(movie);
    },
    // getPopularMoviesFromTMBDB: async (req, res) => {
    //     var movies = await tmdbService.getPopularMovies(req.query.page);
    //     res.json(movies);
    // }
    addNote: async (req,res) => {
        console.log("addNote");
        res.send("addNote");
    },
    suggestMovie: async (req,res) => {
        console.log("suggestMovie");
        res.send("suggestMovie");
    }
}

module.exports = moviesController;