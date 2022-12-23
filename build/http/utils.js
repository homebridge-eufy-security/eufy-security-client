"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = exports.hexWeek = exports.hexTime = exports.hexDate = exports.encodePasscode = exports.SmartSafeByteWriter = exports.getAdvancedLockTimezone = exports.getEufyTimezone = exports.getHB3DetectionMode = exports.isHB3DetectionModeEnabled = exports.getDistances = exports.getBlocklist = exports.decryptAPIData = exports.encryptAPIData = exports.calculateCellularSignalLevel = exports.calculateWifiSignalLevel = exports.switchNotificationMode = exports.isNotificationSwitchMode = exports.getAbsoluteFilePath = exports.getTimezoneGMTString = exports.pad = exports.isGreaterEqualMinVersion = void 0;
const crypto_1 = require("crypto");
const const_1 = require("./const");
const types_1 = require("./types");
const normalizeVersionString = function (version) {
    const trimmed = version ? version.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") : "";
    const pieces = trimmed.split(RegExp("\\."));
    const parts = [];
    let value, piece, num, i;
    for (i = 0; i < pieces.length; i += 1) {
        piece = pieces[i].replace(RegExp("\\D"), "");
        num = parseInt(piece, 10);
        if (isNaN(num)) {
            num = 0;
        }
        parts.push(num);
    }
    const partsLength = parts.length;
    for (i = partsLength - 1; i >= 0; i -= 1) {
        value = parts[i];
        if (value === 0) {
            parts.length -= 1;
        }
        else {
            break;
        }
    }
    return parts;
};
const isGreaterEqualMinVersion = function (minimal_version, current_version) {
    const x = normalizeVersionString(minimal_version);
    const y = normalizeVersionString(current_version);
    const size = Math.min(x.length, y.length);
    let i;
    for (i = 0; i < size; i += 1) {
        if (x[i] !== y[i]) {
            return x[i] < y[i] ? true : false;
        }
    }
    if (x.length === y.length) {
        return true;
    }
    return (x.length < y.length) ? true : false;
};
exports.isGreaterEqualMinVersion = isGreaterEqualMinVersion;
const pad = function (num) {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? "0" : "") + norm;
};
exports.pad = pad;
const getTimezoneGMTString = function () {
    const tzo = -new Date().getTimezoneOffset();
    const dif = tzo >= 0 ? "+" : "-";
    return `GMT${dif}${(0, exports.pad)(tzo / 60)}:${(0, exports.pad)(tzo % 60)}`;
};
exports.getTimezoneGMTString = getTimezoneGMTString;
const getAbsoluteFilePath = function (device_type, channel, filename) {
    if (device_type === types_1.DeviceType.FLOODLIGHT) {
        return `/mnt/data/Camera${String(channel).padStart(2, "0")}/${filename}.dat`;
    }
    return `/media/mmcblk0p1/Camera${String(channel).padStart(2, "0")}/${filename}.dat`;
};
exports.getAbsoluteFilePath = getAbsoluteFilePath;
const isNotificationSwitchMode = function (value, mode) {
    if (value === 1)
        value = 240;
    return (value & mode) !== 0;
};
exports.isNotificationSwitchMode = isNotificationSwitchMode;
const switchNotificationMode = function (currentValue, mode, enable) {
    let result = 0;
    if (!enable && currentValue === 1 /* ALL */) {
        currentValue = 240;
    }
    if (enable) {
        result = mode | currentValue;
    }
    else {
        result = ~mode & currentValue;
    }
    if ((0, exports.isNotificationSwitchMode)(result, types_1.NotificationSwitchMode.SCHEDULE) && (0, exports.isNotificationSwitchMode)(result, types_1.NotificationSwitchMode.APP) && (0, exports.isNotificationSwitchMode)(result, types_1.NotificationSwitchMode.GEOFENCE) && (0, exports.isNotificationSwitchMode)(result, types_1.NotificationSwitchMode.KEYPAD)) {
        result = 1; /* ALL */
    }
    return result;
};
exports.switchNotificationMode = switchNotificationMode;
const calculateWifiSignalLevel = function (device, rssi) {
    if (device.isWiredDoorbell()) {
        if (rssi >= -65) {
            return types_1.SignalLevel.FULL;
        }
        if (rssi >= -75) {
            return types_1.SignalLevel.STRONG;
        }
        return rssi >= -80 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
    }
    else if (device.isCamera2Product()) {
        if (rssi >= 0) {
            return types_1.SignalLevel.NO_SIGNAL;
        }
        if (rssi >= -65) {
            return types_1.SignalLevel.FULL;
        }
        if (rssi >= -75) {
            return types_1.SignalLevel.STRONG;
        }
        return rssi >= -85 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
    }
    else if (device.isFloodLight()) {
        if (rssi >= 0) {
            return types_1.SignalLevel.NO_SIGNAL;
        }
        if (rssi >= -60) {
            return types_1.SignalLevel.FULL;
        }
        if (rssi >= -70) {
            return types_1.SignalLevel.STRONG;
        }
        return rssi >= -80 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
    }
    else if (device.isBatteryDoorbell()) {
        if (rssi >= -65) {
            return types_1.SignalLevel.FULL;
        }
        if (rssi >= -75) {
            return types_1.SignalLevel.STRONG;
        }
        return rssi >= -85 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
    }
    else {
        if (rssi >= 0) {
            return types_1.SignalLevel.NO_SIGNAL;
        }
        if (rssi >= -65) {
            return types_1.SignalLevel.FULL;
        }
        if (rssi >= -75) {
            return types_1.SignalLevel.STRONG;
        }
        return rssi >= -85 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
    }
};
exports.calculateWifiSignalLevel = calculateWifiSignalLevel;
const calculateCellularSignalLevel = function (rssi) {
    if (rssi >= 0) {
        return types_1.SignalLevel.NO_SIGNAL;
    }
    if (rssi >= -90) {
        return types_1.SignalLevel.FULL;
    }
    if (rssi >= -95) {
        return types_1.SignalLevel.STRONG;
    }
    return rssi >= -105 ? types_1.SignalLevel.NORMAL : types_1.SignalLevel.WEAK;
};
exports.calculateCellularSignalLevel = calculateCellularSignalLevel;
const encryptAPIData = (data, key) => {
    const cipher = (0, crypto_1.createCipheriv)("aes-256-cbc", key, key.slice(0, 16));
    return (cipher.update(data, "utf8", "base64") +
        cipher.final("base64"));
};
exports.encryptAPIData = encryptAPIData;
const decryptAPIData = (data, key) => {
    const cipher = (0, crypto_1.createDecipheriv)("aes-256-cbc", key, key.slice(0, 16));
    return Buffer.concat([
        cipher.update(data, "base64"),
        cipher.final()
    ]);
};
exports.decryptAPIData = decryptAPIData;
const getBlocklist = function (directions) {
    const result = [];
    for (let distance = 1; distance <= 5; distance++) {
        let i = 0;
        let j = 0;
        let k = 1;
        for (const directionDistance of directions) {
            if (directionDistance >= distance) {
                j += k;
            }
            k <<= 1;
        }
        if (j == 0) {
            i = 65535;
        }
        else if (!(j == 255 || j == 65535)) {
            i = (j ^ 255) + 65280;
        }
        result.push(65535 & i);
    }
    return result;
};
exports.getBlocklist = getBlocklist;
const getDistances = function (blocklist) {
    const result = [3, 3, 3, 3, 3, 3, 3, 3];
    let calcDistance = 0;
    for (const blockElement of blocklist) {
        let valueOf = blockElement ^ 65535;
        calcDistance++;
        if (valueOf !== 0) {
            for (let i = 0; i < result.length; i++) {
                const intValue = valueOf & 1;
                if (intValue > 0) {
                    result[i] = calcDistance;
                }
                valueOf = valueOf >> 1;
            }
        }
    }
    return result;
};
exports.getDistances = getDistances;
const isHB3DetectionModeEnabled = function (value, type) {
    if (type === types_1.HB3DetectionTypes.HUMAN_RECOGNITION) {
        return (type & value) == type && (value & 65536) == 65536;
    }
    else if (type === types_1.HB3DetectionTypes.HUMAN_DETECTION) {
        return (type & value) == type && (value & 1) == 1;
    }
    return (type & value) == type;
};
exports.isHB3DetectionModeEnabled = isHB3DetectionModeEnabled;
const getHB3DetectionMode = function (value, type, enable) {
    let result = 0;
    if (!enable) {
        if (type === types_1.HB3DetectionTypes.HUMAN_RECOGNITION) {
            const tmp = (type & value) == type ? type ^ value : value;
            result = (value & 65536) == 65536 ? tmp ^ 65536 : tmp;
        }
        else if (type === types_1.HB3DetectionTypes.HUMAN_DETECTION) {
            const tmp = (type & value) == type ? type ^ value : value;
            result = (value & 1) == 1 ? tmp ^ 1 : tmp;
        }
        else {
            result = type ^ value;
        }
    }
    else {
        if (type === types_1.HB3DetectionTypes.HUMAN_RECOGNITION) {
            result = type | value | 65536;
        }
        else if (type === types_1.HB3DetectionTypes.HUMAN_DETECTION) {
            result = type | value | 1;
        }
        else {
            result = type | value;
        }
    }
    return result;
};
exports.getHB3DetectionMode = getHB3DetectionMode;
const getEufyTimezone = function () {
    for (const timezone of const_1.timeZoneData) {
        if (timezone.timeId === Intl.DateTimeFormat().resolvedOptions().timeZone) {
            return timezone;
        }
    }
    return undefined;
};
exports.getEufyTimezone = getEufyTimezone;
const getAdvancedLockTimezone = function (stationSN) {
    const timezone = (0, exports.getEufyTimezone)();
    if (timezone !== undefined) {
        if (stationSN.startsWith("T8520") && (0, exports.isGreaterEqualMinVersion)("1.2.8.6", stationSN))
            return `${timezone.timeZoneGMT}|1.${timezone.timeSn}`;
        else
            return timezone.timeZoneGMT;
    }
    return "";
};
exports.getAdvancedLockTimezone = getAdvancedLockTimezone;
class SmartSafeByteWriter {
    constructor() {
        this.split_byte = -95;
        this.data = Buffer.from([]);
    }
    write(bytes) {
        const tmp_data = Buffer.from(bytes);
        this.data = Buffer.concat([this.data, Buffer.from([this.split_byte]), Buffer.from([tmp_data.length & 255]), tmp_data]);
        this.split_byte += 1;
    }
    getData() {
        return this.data;
    }
}
exports.SmartSafeByteWriter = SmartSafeByteWriter;
/*export const generateHash = function(data: Buffer): number {
    let result = 0;
    for (const value of data) {
        result = result ^ value;
    }
    return result;
}

export const encodeSmartSafeData = function(command: number, payload: Buffer): Buffer {
    const header = Buffer.from(SmartSafe.DATA_HEADER);
    const size = Buffer.allocUnsafe(2);
    size.writeInt16LE(payload.length + 9);
    const versionCode = Buffer.from([SmartSafe.VERSION_CODE]);
    const dataType = Buffer.from([-1]);
    const commandCode = Buffer.from([command]);
    const packageFlag = Buffer.from([-64]);
    const data = Buffer.concat([header, size, versionCode, dataType, commandCode, packageFlag, payload]);
    const hash = generateHash(data);
    return Buffer.concat([data, Buffer.from([hash])]);
}*/
const encodePasscode = function (pass) {
    let result = "";
    for (let i = 0; i < pass.length; i++)
        result += pass.charCodeAt(i).toString(16);
    return result;
};
exports.encodePasscode = encodePasscode;
const hexDate = function (date) {
    const buf = Buffer.allocUnsafe(4);
    buf.writeUint8(date.getDate());
    buf.writeUint8(date.getMonth() + 1, 1);
    buf.writeUint16BE(date.getFullYear(), 2);
    return buf.readUInt32LE().toString(16).padStart(8, "0");
};
exports.hexDate = hexDate;
const hexTime = function (date) {
    const buf = Buffer.allocUnsafe(2);
    buf.writeUint8(date.getHours());
    buf.writeUint8(date.getMinutes(), 1);
    return buf.readUInt16BE().toString(16).padStart(4, "0");
};
exports.hexTime = hexTime;
const hexWeek = function (schedule) {
    const SUNDAY = 1;
    const MONDAY = 2;
    const TUESDAY = 4;
    const WEDNESDAY = 8;
    const THUERSDAY = 16;
    const FRIDAY = 32;
    const SATURDAY = 64;
    let result = 0;
    if (schedule.week !== undefined) {
        if (schedule.week.sunday) {
            result |= SUNDAY;
        }
        if (schedule.week.monday) {
            result |= MONDAY;
        }
        if (schedule.week.tuesday) {
            result |= TUESDAY;
        }
        if (schedule.week.wednesday) {
            result |= WEDNESDAY;
        }
        if (schedule.week.thursday) {
            result |= THUERSDAY;
        }
        if (schedule.week.friday) {
            result |= FRIDAY;
        }
        if (schedule.week.saturday) {
            result |= SATURDAY;
        }
        return result.toString(16);
    }
    return "ff";
};
exports.hexWeek = hexWeek;
const randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.randomNumber = randomNumber;
//# sourceMappingURL=utils.js.map