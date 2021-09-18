const { PlayService } = require('../services');

let dispatcher;
let videoData;

module.exports = {
    play: async function(toMsg, speech){
       if(dispatcher) dispatcher = null;
       console.log("FN> play");
       const songName = await PlayService.separateSpeechText(speech);
       videoData = await PlayService.getVideoDataByName(songName);
       console.log(`Playing : ${videoData.title}`)
       dispatcher = await PlayService.playSong(toMsg, videoData.url);
    },
    stop: async function(){
        if(!dispatcher) return console.log('dispatcher is null');
        dispatcher.pause();
    },
    resume: async function(){
        if(!dispatcher) return console.log('dispatcher is null');
        dispatcher.resume();
    },
}