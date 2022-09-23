const basicMovieService = require('../services/basicMovieService');

var moviesController = {
    getMovies: async (req, res) => {
        res.json(await basicMovieService.getAllPaging(req.query.size, req.query.currentPage));
    },
    getById: async (req, res) => {
        // res.json([{
        //     number: 15,
        //     name: 'John',
        //     gender: 'male'
        //   }]);
        //   console.log(typeof(JSON.stringify(basicMovieService.getById(req.params.id))));
        var movie = await basicMovieService.getById(req.params.id);
        console.log("controller:",movie);
        res.json(movie);
        // res.send("Hello World!");
    }
}

module.exports = moviesController;