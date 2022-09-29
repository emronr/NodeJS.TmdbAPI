const nodeSchedule = require('node-schedule');
const tmdbService = require('../services/tmdbService');

tmdbJob = {
    getMovies: async () => {
      nodeSchedule.scheduleJob('* * * * *', async () =>{
            // console.log('Job has been triggered at: ', new Date.toLocaleTimeString());
            console.log(await tmdbService.getMovie(436969));
        });
    },
    getPopulerMovies: async () => {
        nodeSchedule.scheduleJob('* * * * *', async () => {
            for(let i = 0; i< 10; i++){
                console.log(await tmdbService.getPopulerMovies(i));
            }
        });
    }
}


module.exports = tmdbJob;