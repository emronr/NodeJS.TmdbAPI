'use strict';

const movieService = require('../services/movieService');
const tmdbService = require('../services/tmdbService');

var moviesController = {
    getMovies: async (req, res, next) => {
        await movieService.getAllPaging(req.query.size, req.query.currentPage)
            .then(response => res.status(201).send(response))
            .catch(error => next(error));
    },
    getById: async (req, res, next) => {
        await movieService.getById(req.params.id)
            .then(response => res.status(200).json(response))
            .catch(error => next(error));
    },
    getFromTMDB: async (req, res, next) => {
        await tmdbService.getMovie(req.params.tmdbId)
            .then(response => res.status(200).json(response))
            .catch(error => next(error));
    },
    addNote: async (req, res, next) => {
        await movieService.addMovieNote(req.body.movieId, req.body.vote, req.body.note)
            .then(res => res.status(201).send({ message: "Note added." }))
            .catch(error => next(error));
    },
    suggestMovie: async (req, res, next) => {
        const { email } = req.query;

        await movieService.suggestMovie(email)
            .then(response => res.status(200).send({ message: "Email is sent." }));
    }
}

module.exports = moviesController;