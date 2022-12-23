export declare class InvalidPropertyError extends Error {
    constructor(message?: string);
}
export declare class LivestreamAlreadyRunningError extends Error {
    constructor(message?: string);
}
export declare class LivestreamNotRunningError extends Error {
    constructor(message?: string);
}
export declare class PropertyNotSupportedError extends Error {
    constructor(message?: string);
}
export declare class ApiResponseCodeError extends Error {
    constructor(message?: string);
}
export declare class ApiInvalidResponseError extends Error {
    constructor(message?: string);
}
export declare class ApiHTTPResponseCodeError extends Error {
    constructor(message?: string);
}
export declare class ApiGenericError extends Error {
    constructor(message?: string);
}
export declare class ApiBaseLoadError extends Error {
    code: number;
    constructor(code: number, message?: string);
}
