"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleInvalidChecksumError = exports.BleInvalidDataHeaderError = exports.BleAdditionalDataSeparatorError = exports.BleAdditionalDataError = exports.BleDataError = exports.BleDataTypeError = exports.BleCommandCodeError = exports.BleVersionCodeError = void 0;
class BleVersionCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleVersionCodeError.name;
    }
}
exports.BleVersionCodeError = BleVersionCodeError;
class BleCommandCodeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleCommandCodeError.name;
    }
}
exports.BleCommandCodeError = BleCommandCodeError;
class BleDataTypeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleDataTypeError.name;
    }
}
exports.BleDataTypeError = BleDataTypeError;
class BleDataError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleDataError.name;
    }
}
exports.BleDataError = BleDataError;
class BleAdditionalDataError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleAdditionalDataError.name;
    }
}
exports.BleAdditionalDataError = BleAdditionalDataError;
class BleAdditionalDataSeparatorError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleAdditionalDataSeparatorError.name;
    }
}
exports.BleAdditionalDataSeparatorError = BleAdditionalDataSeparatorError;
class BleInvalidDataHeaderError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleInvalidDataHeaderError.name;
    }
}
exports.BleInvalidDataHeaderError = BleInvalidDataHeaderError;
class BleInvalidChecksumError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BleInvalidChecksumError.name;
    }
}
exports.BleInvalidChecksumError = BleInvalidChecksumError;
//# sourceMappingURL=error.js.map