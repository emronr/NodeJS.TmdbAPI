var baseRepository = require('./baseRepository');


var basicMovieRepository = {
    getAll: function () {
        return baseRepository.get('select * from BasicMovies');
    },
    getById: async function (id) {
        return await baseRepository.get('select * from BasicMovies where Id =' + id);
        //console.log("movieRepo:" +a);
        // return a;
    },
    getAllPaging: async function (size, currentPage) {
        return await baseRepository.get(`select 
            bm.Id as 'Id',
            bm.TmdbId as 'tmdbId',
            Adult,
            Backdrop_path,
            Original_language,
            Original_title,
            Overview,
            Popularity,
            Poster_path,
            Release_date,
            Title,
            Video,
            Vote_average,
            Vote_count,
            mg.Id as 'mgId',
            mg.TmdbId as 'mgTmdbId',
            mg.MovieTmdbId
            
         from BasicMovies as bm
         left join MovieGenres as mg on bm.TmdbId = mg.MovieTmdbId
         ORDER BY (bm.Id)
         OFFSET ${(currentPage - 1) * size} ROWS FETCH NEXT ${size} ROWS ONLY`)
    }
}

//  basicMovieRepository.getById(1);
//basicMovieRepository.getAllPaging(20, 1);

module.exports = basicMovieRepository;