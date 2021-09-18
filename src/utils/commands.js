const { PlayController, StopController } = require('../controllers');

module.exports = {
    /** Play function implementation */
    'play': (toMsg, speech) => PlayController.play(toMsg, speech),
    /** Stop function implementation */
    'stop': (toMsg, speech) => PlayController.stop(toMsg, speech),
    /** Resume function implementation */
    'resume': (toMsg)        => PlayController.resume(toMsg),
}