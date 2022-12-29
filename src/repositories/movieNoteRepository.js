const { poolPromise } = require('../database/dbContext');


const movieNoteRepository = {
    getAll: async () => {
        let query = 'select * from MovieNotes'
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    getById: async (id) => {
        let query = 'select * from MovieNotes where Id =' + id;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    create: async (params) => {
        let query = `INSERT INTO MovieNotes(MovieId, Vote, Note) VALUES(${params.movieId},${params.vote}, '${params.note}')`
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    topRatedMovies: async () => {
        let query = `select TOP 5 * from MovieNotes where Vote >= 5.0 order by Vote desc`;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    }
}

// movieNoteRepository.getById(1);

module.exports = movieNoteRepository;