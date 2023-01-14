/** Generates a random integer given a min and max value. */
export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Returns a random array of bytes, given a length */
export const getRandomBytes = (length: number): Uint8Array => {
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = getRandomInt(0, 255);
    }
    return bytes;
};

/** Sleeps for a given number of milliseconds. */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Generates a random hexadecimal uuid */
export const getRandomUUID = (): string => {
    const bytes = getRandomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return bytesToHex(bytes);
};

/** Converts given byte array to a hexadecimal string representation */
export const bytesToHex = (bytes: Uint8Array): string => {
    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

/** Converts seconds to milliseconds */
export const s2Milli = (seconds: number): number => seconds * 1000;

export const authedFetchPost = async (url: string, authorization: string, body: Record<any, any>): Promise<Response> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authorization}`
        },
        body: JSON.stringify(body)
    });
};
