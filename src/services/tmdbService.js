const axios = require('axios');
const config = require('config');

const tmdbConfig = config.get('tmdbConfig');
const url = tmdbConfig.apiUrl ;
const apiKeyParam = tmdbConfig.apiKey_key + "=" + tmdbConfig.apiKey_value + "&";
const langParam = tmdbConfig.lang_key + "=" + tmdbConfig.lang_value + "&";

const basicMovieRepository = require('../repositories/basicMovieRepository.js');
const movieGenreRepository = require('../repositories/movieGenreRepository.js');
const BasicMovie = require('../models/BasicMovie.js');
const MovieGenre = require('../models/MovieGenre.js');

const tmdbService = {
    getMovie: async (id) => {
        let requestURL = url + id + "?" + apiKeyParam + langParam;
        let response = await axios.get(requestURL);
        return response.data;
    },
    getPopularMovies: async (page) => {
        let pageParam = `&page=${page}`;
        let requestURL = url + "popular" + apiKeyParam + langParam + pageParam;

        let response = await axios.get(requestURL)
        return response.data;
    },
    getRecommendationMovies: async (id) => {
        let requestURL = url + id + "/recommendations" + apiKeyParam + langParam;

        let response = await axios.get(requestURL);
        return response.data;
    },
    synchronizeMovie: async () => {
        for (let i = 1; i < 500; i++) {
            let response = await tmdbService.getPopularMovies(i);

            let movieList = response.results;
            for (let movie of movieList) {
                let movieDb = await basicMovieRepository.getById(movie.id)
                    .then(response => { return response.length > 0 ? response[0] : null; });
                let basicMovie = new BasicMovie(movie);
                if (movieDb == null) {
                    await basicMovieRepository.create(basicMovie);
                }
                else {
                    movieDb.Adult = basicMovie.Adult;
                    movieDb.Backdrop_path = basicMovie.Backdrop_path;
                    movieDb.Original_language = basicMovie.Original_language;
                    movieDb.Original_title = basicMovie.Original_title;
                    movieDb.Overview = basicMovie.Overview;
                    movieDb.Popularity = basicMovie.Popularity;
                    movieDb.Poster_path = basicMovie.Poster_path;
                    movieDb.Release_date = basicMovie.Release_date;
                    movieDb.Title = basicMovie.Title;
                    movieDb.Video = basicMovie.Video;
                    movieDb.Vote_average = basicMovie.Vote_average;
                    movieDb.Vote_count = basicMovie.Vote_count;

                    await basicMovieRepository.update(movieDb);
                    await movieGenreRepository.removeByMovieId(movieDb.TmdbId);
                }
                for (let genre of movie.genre_ids) {
                    const movieGenre = new MovieGenre(genre, basicMovie.TmdbId);
                    await movieGenreRepository.create(movieGenre);

                };
            }
        }
    }
}

// tmdbService.getMovie(436969);
// tmdbService.getPopularMovies(2);

module.exports = tmdbService;

