"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wav_1 = __importDefault(require("wav"));
class VoiceMessage {
    /**
     * Voice message, it is emited `speech` event
     * @param client
     * @param data
     * @param channel
     * @private
     */
    constructor(client, data, channel) {
        this.client = client;
        this.channel = channel;
        this.author = data.author;
        this.audioBuffer = data.audioBuffer;
        this.duration = data.duration;
        this.content = data === null || data === void 0 ? void 0 : data.content;
        this.error = data === null || data === void 0 ? void 0 : data.error;
    }
    /**
     * Saves audio to .wav file
     * @param filename File directory, for example: `./test.wav`
     */
    saveToFile(filename) {
        const outputFile = new wav_1.default.FileWriter(filename, {
            sampleRate: 48000,
            channels: 1,
        });
        outputFile.write(this.audioBuffer);
        outputFile.end();
    }
    get member() {
        return this.guild.member(this.author);
    }
    get guild() {
        return this.channel.guild;
    }
}
exports.default = VoiceMessage;
//# sourceMappingURL=voiceMessage.js.map