'use strict';

const movieService = require('../services/movieService');
const tmdbService = require('../services/tmdbService');
var nodemailer = require('nodemailer');


var moviesController = {
    getMovies: async (req, res) => {
        res.json(await movieService.getAllPaging(req.query.size, req.query.currentPage));
    },
    getById: async (req, res) => {
        var movie = await movieService.getById(req.params.id);
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
        let a = await movieService.addMovieNote(req.body.movieId, req.body.vote, req.body.note);
        console.log(a);
        res.send("Note added.");
    },
    suggestMovie: async (req,res) => {
        const { email } = req.query;
       
        await movieService.suggestMovie(email);
        res.send("suggestMovie");
    }
}

module.exports = moviesController;