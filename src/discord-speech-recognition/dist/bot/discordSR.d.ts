/// <reference types="node" />
import { Client } from "discord.js";
/**
 * Speech recognition function, you can create your own and specify it in [[DiscordSROptions]], when creating [[DiscordSR]] object.
 *
 * All options that you pass to [[DiscordSR]] constructor, will be later passed to this function.
 */
export interface SpeechRecognition {
    (audioBuffer: Buffer, options?: {
        lang?: string;
        key?: string;
    }): Promise<string>;
}
/**
 * Options that will be passed to [[speechRecognition]] function
 */
export interface DiscordSROptions {
    lang?: string;
    speechRecognition?: SpeechRecognition;
}
/**
 * Main class, use this to add new events to present [discord.Client](https://discord.js.org/#/docs/main/stable/class/Client)
 *
 * **This class does not emit events, client that you passed does**
 *
 * Defaults uses `en-US` language and google speech v2 api with generic key, that should be used for personal or testing purposes only, as it may be revoked by Google at any time.\
 * You can obtain your own API key here <http://www.chromium.org/developers/how-tos/api-keys>.\
 * See [python speech recognition package](https://github.com/Uberi/speech_recognition/blob/c89856088ad81d81d38be314e3db50905481c5fe/speech_recognition/__init__.py#L850) for more details.
 */
export default class DiscordSR {
    client: Client;
    speechOptions: DiscordSROptions;
    constructor(client: Client, options?: DiscordSROptions);
    /**
     * Enables `voiceJoin` event on Client
     */
    private setupVoiceJoinEvent;
    /**
     * Enables `speech` event on Client, which is called whenever someone stops speaking
     */
    private setupSpeechEvent;
    /**
     * Starts listening on connection and emits `speech` event when someone stops speaking
     * @param connection Connection to listen
     */
    private handleSpeakingEvent;
    private createVoiceMessage;
}
