const { 
    similarWordToPlay,
    similarWordToStop,
    similarWordToResume,
} = require('../utils/constants');

module.exports = {
    exec: function(targetSpeech, commandWord){
        let renamedSpeech;
        similarWordToPlay.map((sWord) => {
            if(!renamedSpeech && targetSpeech.includes(sWord))
                renamedSpeech = targetSpeech.replace(sWord, commandWord);
                return renamedSpeech;
        })
        similarWordToStop.map((sWord) => {
            if(!renamedSpeech && targetSpeech.includes(sWord))
                renamedSpeech = targetSpeech.replace(sWord, commandWord);
                return renamedSpeech;
        })
        similarWordToResume.map((sWord) => {
            if(!renamedSpeech && targetSpeech.includes(sWord))
                renamedSpeech = targetSpeech.replace(sWord, commandWord);
                return renamedSpeech;
        })
        return renamedSpeech;
    }
}