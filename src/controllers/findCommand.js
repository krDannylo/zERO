const { 
    similarWordToPlay,
    similarWordToStop,
    similarWordToResume,
} = require('../utils/constants');

module.exports = {
    exec: function(targetSpeech){
        let command = null;
        similarWordToPlay.map((sWord) => {
            if(!command && targetSpeech.includes(sWord))
                command = 'play';
        })
        similarWordToStop.map((sWord) => {
            if(!command && targetSpeech.includes(sWord))
                command = 'stop';
        })
        similarWordToResume.map((sWord) => {
            if(!command && targetSpeech.includes(sWord))
                command = 'resume';
        })
        return command;
    }
}