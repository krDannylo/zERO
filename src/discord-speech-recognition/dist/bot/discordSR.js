"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleV2_1 = require("../speechRecognition/googleV2");
const audio_1 = require("../utils/audio");
const voiceMessage_1 = __importDefault(require("./voiceMessage"));
/**
 * Main class, use this to add new events to present [discord.Client](https://discord.js.org/#/docs/main/stable/class/Client)
 *
 * **This class does not emit events, client that you passed does**
 *
 * Defaults uses `en-US` language and google speech v2 api with generic key, that should be used for personal or testing purposes only, as it may be revoked by Google at any time.\
 * You can obtain your own API key here <http://www.chromium.org/developers/how-tos/api-keys>.\
 * See [python speech recognition package](https://github.com/Uberi/speech_recognition/blob/c89856088ad81d81d38be314e3db50905481c5fe/speech_recognition/__init__.py#L850) for more details.
 */
class DiscordSR {
    constructor(client, options = {
        lang: "pt-BR" || "en-US",
        speechRecognition: googleV2_1.resolveSpeechWithGoogleSpeechV2,
    }) {
        this.client = client;
        this.speechOptions = options;
        this.setupVoiceJoinEvent();
        this.setupSpeechEvent();
    }
    /**
     * Enables `voiceJoin` event on Client
     */
    setupVoiceJoinEvent() {
        this.client.on("voiceStateUpdate", (_old, newVoiceState) => {
            if (newVoiceState.connection)
                this.client.emit("voiceJoin", newVoiceState.connection);
        });
    }
    /**
     * Enables `speech` event on Client, which is called whenever someone stops speaking
     */
    setupSpeechEvent() {
        this.client.on("voiceJoin", (connection) => {
            connection.once("ready", () => {
                this.handleSpeakingEvent(connection);
            });
        });
    }
    /**
     * Starts listening on connection and emits `speech` event when someone stops speaking
     * @param connection Connection to listen
     */
    handleSpeakingEvent(connection) {
        connection.on("speaking", (user) => {
            const audioStream = connection.receiver.createStream(user, {
                mode: "pcm",
            });
            const bufferData = [];
            audioStream.on("data", (data) => {
                bufferData.push(data);
            });
            audioStream.on("end", () => __awaiter(this, void 0, void 0, function* () {
                const voiceMessage = yield this.createVoiceMessage(bufferData, user, connection);
                if (voiceMessage)
                    this.client.emit("speech", voiceMessage);
            }));
        });
    }
    createVoiceMessage(bufferData, user, connection) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const stereoBuffer = Buffer.concat(bufferData);
            const monoBuffer = audio_1.convertStereoToMono(stereoBuffer);
            const duration = audio_1.getDurationFromMonoBuffer(stereoBuffer);
            if (duration < 1 || duration > 19)
                return undefined;
            let content;
            let error;
            try {
                content = yield ((_b = (_a = this.speechOptions).speechRecognition) === null || _b === void 0 ? void 0 : _b.call(_a, monoBuffer, this.speechOptions));
            }
            catch (e) {
                error = e;
            }
            const voiceMessage = new voiceMessage_1.default(this.client, {
                author: user,
                duration,
                audioBuffer: stereoBuffer,
                content,
                error,
            }, connection.channel);
            return voiceMessage;
        });
    }
}
exports.default = DiscordSR;
//# sourceMappingURL=discordSR.js.map