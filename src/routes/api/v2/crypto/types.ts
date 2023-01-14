export const enum HttpStatusCode {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    Redirect = 300,
    PermanentRedirect = 301,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}
export type UTF8String = string;
export type HexByteString = string;
export type CryptoOperation = "encrypt" | "decrypt";
export type Encoding = "utf8" | "hex";

export interface CryptoRequestBody {
    text: UTF8String | HexByteString;
    operation: CryptoOperation;
}

export interface Encodings {
    request: Encoding;
    response: Encoding;
}
