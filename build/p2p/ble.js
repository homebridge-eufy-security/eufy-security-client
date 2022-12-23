"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleCommandFactory = exports.BleCommandFactorySeparator = void 0;
const error_1 = require("./error");
var BleCommandFactorySeparator;
(function (BleCommandFactorySeparator) {
    BleCommandFactorySeparator[BleCommandFactorySeparator["a"] = -96] = "a";
    BleCommandFactorySeparator[BleCommandFactorySeparator["b"] = -95] = "b";
    BleCommandFactorySeparator[BleCommandFactorySeparator["c"] = -94] = "c";
    BleCommandFactorySeparator[BleCommandFactorySeparator["d"] = -93] = "d";
    BleCommandFactorySeparator[BleCommandFactorySeparator["e"] = -92] = "e";
    BleCommandFactorySeparator[BleCommandFactorySeparator["f"] = -91] = "f";
    BleCommandFactorySeparator[BleCommandFactorySeparator["g"] = -90] = "g";
    BleCommandFactorySeparator[BleCommandFactorySeparator["h"] = -89] = "h";
    BleCommandFactorySeparator[BleCommandFactorySeparator["i"] = -88] = "i";
    BleCommandFactorySeparator[BleCommandFactorySeparator["j"] = -87] = "j";
    BleCommandFactorySeparator[BleCommandFactorySeparator["k"] = -86] = "k";
})(BleCommandFactorySeparator = exports.BleCommandFactorySeparator || (exports.BleCommandFactorySeparator = {}));
class BleCommandFactory {
    constructor(data) {
        this.toString = () => {
            var _a;
            return `BleCommandFactory (versionCode: ${this.versionCode} commandCode: ${this.commandCode} dataType: ${this.dataType} packageFlag: ${this.packageFlag} responseCode: ${this.responseCode} data: ${(_a = this.data) === null || _a === void 0 ? void 0 : _a.toString("hex")})`;
        };
        if (data !== undefined) {
            if (typeof data === "string") {
                data = Buffer.from(data, "hex");
            }
            if (data.readInt8(0) !== BleCommandFactory.HEADER[0] && data.readInt8(1) !== BleCommandFactory.HEADER[1]) {
                throw new error_1.BleInvalidDataHeaderError("Invalid BLE data header");
            }
            this.versionCode = data.readUint8(4);
            this.commandCode = data.readUint8(6);
            this.dataType = data.readUint8();
            this.packageFlag = data.readInt8(7);
            this.responseCode = this.packageFlag === -64 ? data.readUint8(8) : data.readUint8(12);
            this.data = data.slice(this.packageFlag === -64 ? 8 : 12, data.length - 1);
            if (BleCommandFactory.generateHash(data.slice(0, data.length - 1)) !== data.readUint8(data.length - 1)) {
                throw new error_1.BleInvalidChecksumError("Invalid BLE data, checksum mismatch");
            }
        }
    }
    getResponseCode() {
        return this.responseCode;
    }
    setVersionCode(version) {
        this.versionCode = version;
        return this;
    }
    getVersionCode() {
        return this.versionCode;
    }
    setCommandCode(command) {
        this.commandCode = command;
        return this;
    }
    getCommandCode() {
        return this.commandCode;
    }
    setDataType(type) {
        this.dataType = type;
        return this;
    }
    getDataType() {
        return this.dataType;
    }
    setPackageFlag(flag) {
        this.packageFlag = flag;
        return this;
    }
    getPackageFlag() {
        return this.packageFlag;
    }
    setAdditionalDataSeparator(separator) {
        this.additionalDataSeparatorByte = Buffer.from([separator]);
        return this;
    }
    getAdditionalDataSeparator() {
        return this.additionalDataSeparatorByte;
    }
    setAdditionalData(data) {
        this.additionalData = data;
        return this;
    }
    getAdditionalData() {
        return this.additionalData;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    getData() {
        return this.data;
    }
    setUnknown(data) {
        this.unknown = data;
        return this;
    }
    static generateHash(data) {
        let result = 0;
        for (const value of data) {
            result = result ^ value;
        }
        return result;
    }
    getLockV12Command() {
        if (this.versionCode === undefined)
            throw new error_1.BleVersionCodeError("BleCommandFactory version code value missing");
        if (this.dataType === undefined)
            throw new error_1.BleDataTypeError("BleCommandFactory data type value missing");
        if (this.commandCode === undefined)
            throw new error_1.BleCommandCodeError("BleCommandFactory command code value missing");
        if (this.data === undefined)
            throw new error_1.BleDataError("BleCommandFactory data value missing");
        if (this.additionalData === undefined)
            throw new error_1.BleAdditionalDataError("BleCommandFactory additional data value missing");
        this.setAdditionalDataSeparator(BleCommandFactorySeparator.a);
        const bVersionCode = Buffer.from([this.versionCode]);
        const bDataType = Buffer.from([this.dataType]);
        const bCommandCode = Buffer.from([this.commandCode]);
        const bPackageFlag = this.packageFlag === undefined ? Buffer.from([-64]) : Buffer.from([this.packageFlag]);
        const bAdditionalDataLength = Buffer.from([this.additionalData.length]);
        const size = Buffer.allocUnsafe(2);
        size.writeInt16LE(BleCommandFactory.HEADER.length +
            size.length +
            bVersionCode.length +
            bDataType.length +
            bCommandCode.length +
            bPackageFlag.length +
            this.additionalDataSeparatorByte.length +
            bAdditionalDataLength.length +
            this.additionalData.length +
            this.data.length +
            1 // Hash
        );
        const data = Buffer.concat([
            BleCommandFactory.HEADER,
            size,
            bVersionCode,
            bDataType,
            bCommandCode,
            bPackageFlag,
            this.additionalDataSeparatorByte,
            bAdditionalDataLength,
            this.additionalData,
            this.data
        ]);
        const hash = BleCommandFactory.generateHash(data);
        return Buffer.concat([data, Buffer.from([hash])]);
    }
    getSmartSafeCommand() {
        if (this.versionCode === undefined)
            throw new error_1.BleVersionCodeError("BleCommandFactory version code value missing");
        if (this.dataType === undefined)
            throw new error_1.BleDataTypeError("BleCommandFactory data type value missing");
        if (this.commandCode === undefined)
            throw new error_1.BleCommandCodeError("BleCommandFactory command code value missing");
        if (this.data === undefined)
            throw new error_1.BleDataError("BleCommandFactory data value missing");
        const bVersionCode = Buffer.from([this.versionCode]);
        const bDataType = Buffer.from([this.dataType]);
        const bCommandCode = Buffer.from([this.commandCode]);
        const bPackageFlag = this.packageFlag === undefined ? Buffer.from([-64]) : Buffer.from([this.packageFlag]);
        const size = Buffer.allocUnsafe(2);
        size.writeInt16LE(BleCommandFactory.HEADER.length +
            size.length +
            bVersionCode.length +
            bDataType.length +
            bCommandCode.length +
            bPackageFlag.length +
            this.data.length +
            1 // Hash
        );
        const data = Buffer.concat([
            BleCommandFactory.HEADER,
            size,
            bVersionCode,
            bDataType,
            bCommandCode,
            bPackageFlag,
            this.data
        ]);
        const hash = BleCommandFactory.generateHash(data);
        return Buffer.concat([data, Buffer.from([hash])]);
    }
}
exports.BleCommandFactory = BleCommandFactory;
BleCommandFactory.HEADER = Buffer.from([-1, 9]);
//# sourceMappingURL=ble.js.map