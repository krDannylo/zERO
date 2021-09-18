"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDurationFromMonoBuffer = exports.wavUrlToBuffer = exports.resolveSpeechWithWITAI = exports.resolveSpeechWithGoogleSpeechV2 = exports.VoiceMessage = exports.voiceJoin = exports.speech = exports.DiscordSR = void 0;
var discordSR_1 = require("./bot/discordSR");
Object.defineProperty(exports, "DiscordSR", { enumerable: true, get: function () { return __importDefault(discordSR_1).default; } });
var events_1 = require("./events");
Object.defineProperty(exports, "speech", { enumerable: true, get: function () { return events_1.speech; } });
Object.defineProperty(exports, "voiceJoin", { enumerable: true, get: function () { return events_1.voiceJoin; } });
var voiceMessage_1 = require("./bot/voiceMessage");
Object.defineProperty(exports, "VoiceMessage", { enumerable: true, get: function () { return __importDefault(voiceMessage_1).default; } });
var googleV2_1 = require("./speechRecognition/googleV2");
Object.defineProperty(exports, "resolveSpeechWithGoogleSpeechV2", { enumerable: true, get: function () { return googleV2_1.resolveSpeechWithGoogleSpeechV2; } });
var witAI_1 = require("./speechRecognition/witAI");
Object.defineProperty(exports, "resolveSpeechWithWITAI", { enumerable: true, get: function () { return witAI_1.resolveSpeechWithWITAI; } });
var audio_1 = require("./utils/audio");
Object.defineProperty(exports, "wavUrlToBuffer", { enumerable: true, get: function () { return audio_1.wavUrlToBuffer; } });
Object.defineProperty(exports, "getDurationFromMonoBuffer", { enumerable: true, get: function () { return audio_1.getDurationFromMonoBuffer; } });
//# sourceMappingURL=index.js.map