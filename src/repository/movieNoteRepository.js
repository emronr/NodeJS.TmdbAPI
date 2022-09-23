var baseRepository = require('./baseRepository');


var movieNoteRepository = {
    getAll : function(){
        baseRepository.get('select * from MovieNotes');
    },
    getById : function(id){
        baseRepository.get('select * from MovieNotes where Id =' + id)
    }
}

// movieNoteRepository.getById(1);

module.exports = movieNoteRepository;