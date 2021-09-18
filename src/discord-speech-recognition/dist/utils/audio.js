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
exports.getDurationFromMonoBuffer = exports.wavUrlToBuffer = exports.convertStereoToMono = void 0;
const axios_1 = __importDefault(require("axios"));
const stream_1 = require("stream");
const wav_1 = __importDefault(require("wav"));
/**
 * Convert stereo audio buffer to mono
 * @param input Buffer of stereo audio
 * @returns
 */
function convertStereoToMono(input) {
    const stereoData = new Int16Array(input);
    const monoData = new Int16Array(stereoData.length / 2);
    for (let i = 0, j = 0; i < stereoData.length; i += 4) {
        monoData[j] = stereoData[i];
        j += 1;
        monoData[j] = stereoData[i + 1];
        j += 1;
    }
    return Buffer.from(monoData);
}
exports.convertStereoToMono = convertStereoToMono;
function wavUrlToBuffer(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default({
            url,
            method: "GET",
            responseType: "stream",
        });
        const buffs = [];
        const pcmDataStream = new stream_1.Writable({
            write(chunk, _encoding, callback) {
                buffs.push(chunk);
                callback();
            },
            emitClose: true,
        });
        const reader = new wav_1.default.Reader();
        reader.on("format", () => {
            reader.pipe(pcmDataStream);
        });
        response.data.pipe(reader);
        return new Promise((resolve) => {
            pcmDataStream.on("finish", () => {
                const audioBuffer = Buffer.concat(buffs);
                resolve(audioBuffer);
            });
        });
    });
}
exports.wavUrlToBuffer = wavUrlToBuffer;
function getDurationFromMonoBuffer(buffer) {
    const duration = buffer.length / 48000 / 2;
    return duration;
}
exports.getDurationFromMonoBuffer = getDurationFromMonoBuffer;
//# sourceMappingURL=audio.js.map