var baseRepository = require('./baseRepository');


var movieNoteRepository = {
    getAll : async () => {
        return await baseRepository.get('select * from MovieNotes');
    },
    getById : async (id) => {
        return await baseRepository.get('select * from MovieNotes where Id =' + id)
    },
    create: async (params) => {
        return await baseRepository.get(`INSERT INTO MovieNotes(MovieId, Vote, Note) VALUES(${params.movieId},${params.vote}, '${params.note}')`);
    },
    topRatedMovies: async () => {
        return await baseRepository.get(`select TOP 5 * from MovieNotes where Vote >= 5.0 order by Vote desc`);
    }
}

// movieNoteRepository.getById(1);

module.exports = movieNoteRepository;