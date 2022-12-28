const nodeSchedule = require('node-schedule');
const tmdbService = require('../services/tmdbService');

tmdbJob = {
    syncPopularMovie: async () => {
        nodeSchedule.scheduleJob('48 14 * * *', async () => {
            // console.log('SyncMovieJob has been triggered at: ', new Date.toLocaleTimeString());
            console.log("SyncMovieJob -> started")
            await tmdbService.synchronizeMovie()
                .then(response => console.log("SyncMovieJob -> finished"))
                .catch(error => console.log("SyncMovieJob -> error:", error));
        });
    }
}


module.exports = tmdbJob;