const { default: axios } = require('axios');
const basicMovieRepository = require('../repositories/basicMovieRepository.js');
const movieNoteRepository = require('../repositories/movieNoteRepository');
const emailService = require('./emailService');
const tmdbService = require('./tmdbService');

const movieService = {
    getAll: async () => {
        return await basicMovieRepository.getAll();
    },
    getById: async (id) => {
        return await basicMovieRepository.getById(id)
            .then(response => { return response.length > 0 ? response[0] : null; });
    },
    getAllPaging: async (size = 5, currentPage = 1) => {
        if (size <= 0) {
            size = 5;
        }
        if (currentPage <= 0) {
            currentPage = 1;
        }
        return await basicMovieRepository.getAllPaging(size, currentPage);
    },
    addMovieNote: async (movieId, vote, note) => {
        let params = {
            movieId: movieId,
            vote: vote,
            note: note
        };
        return await movieNoteRepository.create(params);
    },
    suggestMovie: async (email) => {
        const topRatedMovies = await movieNoteRepository.topRatedMovies();
        const suggestedMovies = [];

        await Promise.all(topRatedMovies.map(async (movie) => {
            const recommendationMovies = await tmdbService.getRecommendationMovies(topRatedMovies[0].MovieId)
            var data = recommendationMovies.results.sort((a, b) => {
                return (a.vote_average > b.vote_average) ? -1 : 1;
            }).slice(0, 6);

            await Promise.all(data.map(async (suggestedMovie) => {
                var count = 0;
                if (!suggestedMovies.some((movie) => {
                    return movie.MovieId === suggestedMovie.id;
                }) && count < 2) {
                    const movieModel = {
                        MovieId: suggestedMovie.id,
                        MovieName: suggestedMovie.title,
                        Overview: suggestedMovie.overview,
                        Vote: suggestedMovie.vote_average,
                        ReleaseDate: suggestedMovie.release_date,
                        BackdropPath: suggestedMovie.backdrop_path,
                    };
                    suggestedMovies.push(movieModel);
                    count++;
                }
                else if (count > 2)
                    return;
            }));
        }));
        let mailContent = "";
        suggestedMovies.forEach((movie) => {
            let movieContent = "<div>" + "\n" +
                // "<img src='https://image.tmdb.org/t/p/original" + movie.BackdropPath + "'></img>" +
                "<u>" +
                "<h2>" +
                "<a href='https://www.themoviedb.org/movie/" + movie.MovieId + "'>" + movie.MovieName + "</a>" +
                "</h2>" +
                "</u>" + "\n" +
                "<h4>" +
                "Puan : " + movie.Vote +
                "</h4>" + "\n" +
                "<p>" +
                "<strong>Genel Bakış : </strong>" + movie.Overview +
                "</p>" + "\n" +
                "<h5>" +
                "<strong>Tarih : </strong>" + movie.ReleaseDate +
                "</h5>" + "\n" +
                "</div>" + "\n";
            mailContent += movieContent;
        });
        let params = {
            email: email,
            subject: "Suggested Movies",
            content: mailContent
        };

        await emailService.sendEmail(params);
    }
}

module.exports = movieService;
