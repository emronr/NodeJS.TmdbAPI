var baseRepository = require('./baseRepository');


var movieGenreRepository = {
    getAll : function(){
        baseRepository.get('select * from MovieGenres');
    },
    getById : function(id){
        baseRepository.get('select * from MovieGenres where Id =' + id)
    },
    removeByMovieId : async (movieId) => {
        baseRepository.get('delete from MovieGenres where MovieTmdbId =' + movieId);
    },
    create : async (movieGenre) => {
        baseRepository.get('insert into MovieGenres (MovieTmdbId, TmdbId) values (' + movieGenre.MovieTmdbId + ', ' + movieGenre.TmdbId + ')');
    }

}

// movieGenreRepository.getById(32314);

module.exports = movieGenreRepository;