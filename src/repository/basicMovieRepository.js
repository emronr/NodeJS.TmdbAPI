var baseRepository = require('./baseRepository');


var basicMovieRepository = {
    getAll: function () {
        return baseRepository.get('select * from BasicMovies');
    },
    getById: async function (id) {
        return await baseRepository.get('select * from BasicMovies where Id =' + id);
    },
    getAllPaging: async function (size, currentPage) {
        var response = await baseRepository.get(`
        SELECT 
            bm.*,
			(select
				Id,
				MovieTmdbId,
				TmdbId
				FROM MovieGenres 
				WHERE MovieTmdbId = bm.TmdbId
				FOR JSON AUTO) as MovieGenres
        FROM BasicMovies as bm
        ORDER BY (bm.Id)
        OFFSET ${(currentPage - 1) * size} ROWS FETCH NEXT ${size} ROWS ONLY
        FOR JSON AUTO
        `)
        return response;
    }
}

//  basicMovieRepository.getById(1);
//basicMovieRepository.getAllPaging(20, 1);

module.exports = basicMovieRepository;