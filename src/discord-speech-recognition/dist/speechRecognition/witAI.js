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
exports.resolveSpeechWithWITAI = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function extractSpeechIntent(key, audioBuffer, contenttype) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default("https://api.wit.ai/speech", {
            method: "post",
            body: audioBuffer,
            headers: {
                Authorization: `Bearer ${key}`,
                "Content-type": contenttype,
            },
        });
        if (response.status !== 200)
            throw new Error(`Api error, code: ${response.status}`);
        const data = response.json();
        return data;
    });
}
function resolveSpeechWithWITAI(audioBuffer, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { key } = options;
        if (!key)
            throw new Error("wit.ai API key wasn't specified.");
        const contenttype = "audio/raw;encoding=signed-integer;bits=16;rate=48k;endian=little";
        const output = yield extractSpeechIntent(key, audioBuffer, contenttype);
        if ("_text" in output)
            throw new Error("Wrong request data");
        if ("text" in output)
            return output.text;
        throw new Error("Something went very wrong");
    });
}
exports.resolveSpeechWithWITAI = resolveSpeechWithWITAI;
//# sourceMappingURL=witAI.js.map