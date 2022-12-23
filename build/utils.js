"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = exports.validValue = exports.parseValue = exports.isEmpty = exports.handleUpdate = exports.md5 = exports.generateSerialnumber = exports.generateUDID = exports.removeLastChar = void 0;
const crypto = __importStar(require("crypto"));
const error_1 = require("./error");
const removeLastChar = function (text, char) {
    const strArr = [...text];
    strArr.splice(text.lastIndexOf(char), 1);
    return strArr.join("");
};
exports.removeLastChar = removeLastChar;
const generateUDID = function () {
    return crypto.randomBytes(8).readBigUInt64BE().toString(16);
};
exports.generateUDID = generateUDID;
const generateSerialnumber = function (length) {
    return crypto.randomBytes(length / 2).toString("hex");
};
exports.generateSerialnumber = generateSerialnumber;
const md5 = (contents) => crypto.createHash("md5").update(contents).digest("hex");
exports.md5 = md5;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleUpdate = function (config, log, oldVersion) {
    if (oldVersion <= 1.24) {
        config.cloud_token = "";
        config.cloud_token_expiration = 0;
    }
    return config;
};
exports.handleUpdate = handleUpdate;
const isEmpty = function (str) {
    if (str) {
        if (str.length > 0)
            return false;
        return true;
    }
    return true;
};
exports.isEmpty = isEmpty;
const parseValue = function (metadata, value) {
    if (metadata.type === "boolean") {
        if (value !== undefined) {
            switch (typeof value) {
                case "boolean":
                    break;
                case "number":
                    if (value === 0 || value === 1) {
                        value = value === 1 ? true : false;
                    }
                    else {
                        throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a boolean value`);
                    }
                    break;
                case "string":
                    if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
                        value = value.toLowerCase() === "true" ? true : false;
                    }
                    else {
                        throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a boolean value`);
                    }
                    break;
                default:
                    throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a boolean value`);
            }
        }
        else {
            throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a boolean value`);
        }
    }
    else if (metadata.type === "number") {
        if (value !== undefined) {
            switch (typeof value) {
                case "number":
                    break;
                case "string":
                    try {
                        value = Number.parseInt(value);
                    }
                    catch (error) {
                        throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a number value`);
                    }
                    break;
                default:
                    throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a number value`);
            }
        }
        else {
            throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a number value`);
        }
    }
    else if (metadata.type === "string") {
        if (value !== undefined) {
            switch (typeof value) {
                case "number":
                    value = value.toString();
                    break;
                case "string":
                    break;
                case "boolean":
                    value = value === true ? "true" : "false";
                    break;
                default:
                    throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a number value`);
            }
        }
        else {
            throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a number value`);
        }
    }
    else {
        throw new error_1.InvalidPropertyValueError(`Property ${metadata.name} expects a ${metadata.type} value`);
    }
    return value;
};
exports.parseValue = parseValue;
const validValue = function (metadata, value) {
    if (metadata.type === "number") {
        const numberMetadata = metadata;
        const numericValue = Number(value);
        if ((numberMetadata.min !== undefined && numberMetadata.min > numericValue) || (numberMetadata.max !== undefined && numberMetadata.max < numericValue) || (numberMetadata.states !== undefined && numberMetadata.states[numericValue] === undefined) || Number.isNaN(numericValue)) {
            throw new error_1.InvalidPropertyValueError(`Value "${numericValue}" isn't a valid value for property "${numberMetadata.name}"`);
        }
    }
    else if (metadata.type === "string") {
        const stringMetadata = metadata;
        const stringValue = String(value);
        if ((stringMetadata.format !== undefined && stringValue.match(stringMetadata.format) === null) || (stringMetadata.minLength !== undefined && stringMetadata.minLength > stringValue.length) || (stringMetadata.maxLength !== undefined && stringMetadata.maxLength < stringValue.length)) {
            throw new error_1.InvalidPropertyValueError(`Value "${stringValue}" isn't a valid value for property "${stringMetadata.name}"`);
        }
    }
    else if (metadata.type === "boolean") {
        const str = String(value).toLowerCase().trim();
        if (str !== "true" && str !== "false") {
            throw new error_1.InvalidPropertyValueError(`Value "${value}" isn't a valid value for property "${metadata.name}"`);
        }
    }
};
exports.validValue = validValue;
const mergeDeep = function (target, source) {
    target = target || {};
    for (const [key, value] of Object.entries(source)) {
        if (!(key in target)) {
            target[key] = value;
        }
        else {
            if (typeof value === "object") {
                // merge objects
                target[key] = (0, exports.mergeDeep)(target[key], value);
            }
            else if (typeof target[key] === "undefined") {
                // don't override single keys
                target[key] = value;
            }
        }
    }
    return target;
};
exports.mergeDeep = mergeDeep;
//# sourceMappingURL=utils.js.map