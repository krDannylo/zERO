const { StopService } = require('../services');

module.exports = {
    stop: async function(toMsg, speech){
        StopService.stopSong(toMsg);
    }
}