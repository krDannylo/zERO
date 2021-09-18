/// <reference types="node" />
/**
 * Convert stereo audio buffer to mono
 * @param input Buffer of stereo audio
 * @returns
 */
export declare function convertStereoToMono(input: Buffer): Buffer;
export declare function wavUrlToBuffer(url: string): Promise<Buffer>;
export declare function getDurationFromMonoBuffer(buffer: Buffer): number;
