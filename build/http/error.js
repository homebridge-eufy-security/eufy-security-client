"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBaseLoadError = exports.ApiGenericError = exports.ApiHTTPResponseCodeError = exports.ApiInvalidResponseError = exports.ApiResponseCodeError = exports.PropertyNotSupportedError = exports.LivestreamNotRunningError = exports.LivestreamAlreadyRunningError = exports.InvalidPropertyError = void 0;
class InvalidPropertyError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidPropertyError.name;
    }
}
exports.InvalidPropertyError = InvalidPropertyError;
class LivestreamAlreadyRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = LivestreamAlreadyRunningError.name;
    }
}
exports.LivestreamAlreadyRunningError = LivestreamAlreadyRunningError;
class LivestreamNotRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = LivestreamNotRunningError.name;
    }
}
exports.LivestreamNotRunningError = LivestreamNotRunningError;
class PropertyNotSupportedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = PropertyNotSupportedError.name;
    }
}
exports.PropertyNotSupportedError = PropertyNotSupportedError;
class ApiResponseCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiResponseCodeError.name;
    }
}
exports.ApiResponseCodeError = ApiResponseCodeError;
class ApiInvalidResponseError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiInvalidResponseError.name;
    }
}
exports.ApiInvalidResponseError = ApiInvalidResponseError;
class ApiHTTPResponseCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiHTTPResponseCodeError.name;
    }
}
exports.ApiHTTPResponseCodeError = ApiHTTPResponseCodeError;
class ApiGenericError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiGenericError.name;
    }
}
exports.ApiGenericError = ApiGenericError;
class ApiBaseLoadError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ApiBaseLoadError.name;
    }
}
exports.ApiBaseLoadError = ApiBaseLoadError;
//# sourceMappingURL=error.js.map