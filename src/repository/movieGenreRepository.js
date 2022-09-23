var baseRepository = require('./baseRepository');


var movieGenreRepository = {
    getAll : function(){
        baseRepository.get('select * from MovieGenres');
    },
    getById : function(id){
        baseRepository.get('select * from MovieGenres where Id =' + id)
    }
}

// movieGenreRepository.getById(32314);

module.exports = movieGenreRepository;