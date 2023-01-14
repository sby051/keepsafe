import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { HttpStatusCode, type Encoding, type CryptoRequestBody, type Encodings } from "./types";
import pkg from "aes-js";

const { ModeOfOperation, padding, utils } = pkg;

export const POST = (async ({ request, getClientAddress }) => {
    console.log(`(POST)-[/api/v1/vault]-(${getClientAddress()}): Made request to vault`);

    let requestBody: CryptoRequestBody;

    try {
        requestBody = await request.json();
    } catch (e: any) {
        console.warn("[/api/v1/vault] Invalid request body", e);
        throw error(HttpStatusCode.BadRequest, "Please provide valid json");
    }

    const { text, operation } = requestBody;
    let authHeader = request.headers.get("authorization");

    if (!authHeader) {
        console.warn("[/api/v1/vault] 401: No authorization found");
        throw error(HttpStatusCode.Unauthorized, "Missing authorization header");
    }

    const [authScheme, password] = authHeader.split(" ");

    if (!operation) {
        console.warn("[/api/v1/vault] 400: No operation provided");
        throw error(HttpStatusCode.BadRequest, "Missing 'operation' property");
    }
    if (operation !== "encrypt" && operation !== "decrypt") {
        console.warn("[/api/v1/vault] 400: Invalid operation");
        throw error(HttpStatusCode.BadRequest, "Invalid 'operation' property");
    }
    if (!authScheme || !password) {
        console.warn("[/api/v1/vault] 401: No authorization found");
        throw error(HttpStatusCode.Unauthorized, "Missing authorization header");
    }
    if (authScheme !== "Basic") {
        console.warn("[/api/v1/vault] 401: Invalid authorizatyion scheme provided");
        throw error(HttpStatusCode.Unauthorized, "Invalid authorization scheme");
    }
    if (!text) {
        console.warn("[/api/v1/vault] 400: No text provided");
        throw error(HttpStatusCode.BadRequest, "Missing 'text' property");
    }

    console.log(`[/api/v1/vault] New valid ${operation}ion request`);

    const ENCODINGS = _get_encodings(operation);
    const KEY_BYTES = _to_bytes(password, "utf8", true);
    const TEXT_BYTES = _to_bytes(text, ENCODINGS.request);
    const RETURN_BYTES = new ModeOfOperation.ctr(KEY_BYTES)[operation](TEXT_BYTES);
    const RETURN_STR = _from_bytes(RETURN_BYTES, ENCODINGS.response);

    if (operation === "decrypt" && !_is_valid_vault_str(RETURN_STR)) {
        console.warn("[/api/v1/vault] 400: Incorrect key provided");
        throw error(HttpStatusCode.Unauthorized, "Incorrect key");
    }

    console.log(`[/api/v1/vault] ${operation[0].toUpperCase()}${operation.slice(1)} operation completed successfully`);

    return new Response(RETURN_STR);
}) satisfies RequestHandler;

const _is_valid_vault_str = (str: string): boolean => str.startsWith("[") && str.endsWith("]");

const _to_bytes = (str: string, encoding: Encoding, pad?: boolean): Uint8Array => {
    let bytes = utils[encoding].toBytes(str);
    if (pad) bytes = padding.pkcs7.pad(bytes);
    return bytes;
};

const _from_bytes = (bytes: Uint8Array, encoding: Encoding, padded?: boolean): string => {
    if (padded) bytes = padding.pkcs7.strip(bytes);
    return utils[encoding].fromBytes(bytes);
};

const _get_encodings = (operation: AESOperation): Encodings => {
    switch (operation) {
        case "encrypt":
            return {
                request: "utf8",
                response: "hex"
            };
        case "decrypt":
            return {
                request: "hex",
                response: "utf8"
            };
        default:
            throw new Error("Invalid operation");
    }
};
