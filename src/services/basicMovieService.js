var basicMovieRepository = require('../repository/basicMovieRepository.js');

var basicMovieService = {
    getAll: async () => {
        return await basicMovieRepository.getAll();
    },
    getById: async (id) => {
        return await basicMovieRepository.getById(id);
    },
    getAllPaging: async (size, currentPage) => {
        if (size == undefined || size <= 0) {
            size = 5;
        }
        if (currentPage == undefined || currentPage <= 0) {
            currentPage = 1;
        }
        return await basicMovieRepository.getAllPaging(size, currentPage);
    }
}
// basicMovieService.getById(1);

module.exports = basicMovieService;