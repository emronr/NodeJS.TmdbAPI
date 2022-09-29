const axios = require('axios');
const url = "https://api.themoviedb.org/3/movie/";
const apiKeyParam = "?api_key=" + "ecbc2a7793eaedfd3c0693d04da45264";
const langParam = "&language=tr-tr";

let tmdbService ={
    getMovie: async (id) =>{
        let requestURL = url + id+ apiKeyParam + langParam;
       var response = await axios.get(requestURL);
       return response.data;
    },
    getPopularMovies : async (page) => {
        let pageParam = `&page=${page}`;
        let requestURL = url + "popular" + apiKeyParam + langParam  + pageParam;
        // console.log(requestURL);
       
        axios.get(requestURL).then(response => console.log(response))
        .catch(err => console.log(err));
        // var response = await axios.get(requestURL);
        // return response.data;
    }
}

// tmdbService.getMovie(436969);
//   tmdbService.getPopularMovies(2);

module.exports = tmdbService;