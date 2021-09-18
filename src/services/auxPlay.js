const ytdl = require('ytdl-core-discord');
const yt = require('yt-search');

module.exports = {
    separateSpeechText: async function(speech){
        console.log("FN> separateSpeechText");
        speech = speech.replace('teste play ', '').split('play');
        return speech.toString();
    },
    getVideoDataByName: async function(nameSong){
        console.log("FN> getUrlByName");
        const dataSearch = await yt(nameSong);
        return dataSearch.videos[0];
    },
    playSong: async function(connection, url){
        return connection.play(await ytdl(url), { type: 'opus' });
    }
}