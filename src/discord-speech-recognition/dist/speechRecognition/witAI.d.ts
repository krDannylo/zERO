/// <reference types="node" />
export interface WitaiOptions {
    key?: string;
}
export declare function resolveSpeechWithWITAI(audioBuffer: Buffer, options: WitaiOptions): Promise<string>;
