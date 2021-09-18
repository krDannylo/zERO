/// <reference types="node" />
/**
 * You can obtain API key here [http://www.chromium.org/developers/how-tos/api-keys](http://www.chromium.org/developers/how-tos/api-keys)
 */
export interface GoogleSpeechV2Options {
    key?: string;
    lang?: string;
}
/**
 * Performs speech recognition using the Google Speech Recognition API V2
 * @param audioBuffer PCM mono audio with 48kHz
 * @param options
 * @returns Recognized text from speech
 */
export declare function resolveSpeechWithGoogleSpeechV2(audioBuffer: Buffer, options?: GoogleSpeechV2Options): Promise<string>;
