const { poolPromise } = require('../database/dbContext');

var movieGenreRepository = {
    getAll: async () => {
        let query = 'select * from MovieGenres'
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    getById: async (id) => {
        let query = 'select * from MovieGenres where Id =' + id;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    removeByMovieId: async (movieId) => {
        let query = 'delete from MovieGenres where MovieTmdbId =' + movieId;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    create: async (movieGenre) => {
        let query = 'insert into MovieGenres (MovieTmdbId, TmdbId) values (' + movieGenre.MovieTmdbId + ', ' + movieGenre.TmdbId + ')'
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    }
}

// movieGenreRepository.getById(32314);

module.exports = movieGenreRepository;