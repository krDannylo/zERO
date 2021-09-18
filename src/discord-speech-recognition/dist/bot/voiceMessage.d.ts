/// <reference types="node" />
import { Client, Guild, GuildMember, User, VoiceChannel } from "discord.js";
export interface VoiceMessageData {
    duration: number;
    audioBuffer: Buffer;
    content?: string;
    error?: string;
    author: User;
}
export default class VoiceMessage {
    channel: VoiceChannel;
    /**
     * Speech to text translation
     */
    content?: string;
    author: User;
    /**
     * Duration in seconds
     */
    duration: number;
    /**
     * PCM mono 48k audio data
     */
    audioBuffer: Buffer;
    client: Client;
    /**
     * If there was any error during handling speech event, this will be set
     */
    error?: string;
    /**
     * Voice message, it is emited `speech` event
     * @param client
     * @param data
     * @param channel
     * @private
     */
    constructor(client: Client, data: VoiceMessageData, channel: VoiceChannel);
    /**
     * Saves audio to .wav file
     * @param filename File directory, for example: `./test.wav`
     */
    saveToFile(filename: string): void;
    get member(): GuildMember | null;
    get guild(): Guild;
}
