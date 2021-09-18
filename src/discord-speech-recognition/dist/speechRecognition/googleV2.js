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
exports.resolveSpeechWithGoogleSpeechV2 = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * If API key is not specified uses generic key that works out of the box.
 * If language is not specified uses ``"en-US"``
 * See [python speech recognition package](https://github.com/Uberi/speech_recognition/blob/c89856088ad81d81d38be314e3db50905481c5fe/speech_recognition/__init__.py#L850) for more details.
 * @param options
 * @returns Request config for {@link resolveSpeechWithGoogleSpeechV2}
 */
function getGoogleRequestOptions(options) {
    let key = "AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw";
    let lang = "pt-BR" || 'en-US';
    if (options) {
        if (options.key)
            key = options.key;
        if (options.lang)
            lang = options.lang;
    }
    const googleRequestOptions = {
        url: `https://www.google.com/speech-api/v2/recognize?output=json&lang=${lang}&key=${key}`,
        headers: {
            "Content-Type": "audio/l16; rate=48000;",
        },
        method: "POST",
        transformResponse: [
            (data) => {
                const fixedData = data.replace('{"result":[]}', "");
                try {
                    return JSON.parse(fixedData);
                }
                catch (e) {
                    return { error: e };
                }
            },
        ],
    };
    return googleRequestOptions;
}
/**
 * Performs speech recognition using the Google Speech Recognition API V2
 * @param audioBuffer PCM mono audio with 48kHz
 * @param options
 * @returns Recognized text from speech
 */
function resolveSpeechWithGoogleSpeechV2(audioBuffer, options = { lang: "pt-BR" || "en-US" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestOptions = getGoogleRequestOptions(options);
        requestOptions.data = audioBuffer;
        const response = yield axios_1.default(requestOptions);
        if (response.data.error)
            throw new Error(`Google speech api error: ${response.data}`);
        return response.data.result[0].alternative[0].transcript;
    });
}
exports.resolveSpeechWithGoogleSpeechV2 = resolveSpeechWithGoogleSpeechV2;
//# sourceMappingURL=googleV2.js.map