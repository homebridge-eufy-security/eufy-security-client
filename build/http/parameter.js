"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterHelper = void 0;
const types_1 = require("../p2p/types");
const utils_1 = require("../p2p/utils");
const types_2 = require("./types");
class ParameterHelper {
    static readValue(type, value, log) {
        if (value) {
            if (type === types_2.ParamType.SNOOZE_MODE ||
                type === types_2.ParamType.CAMERA_MOTION_ZONES ||
                type === types_1.CommandType.CMD_SET_DOORSENSOR_ALWAYS_OPEN_DELAY ||
                type === types_1.CommandType.CMD_SET_DOORSENSOR_ALWAYS_OPEN ||
                type === types_1.CommandType.ARM_DELAY_HOME ||
                type === types_1.CommandType.ARM_DELAY_AWAY ||
                type === types_1.CommandType.ARM_DELAY_CUS1 ||
                type === types_1.CommandType.ARM_DELAY_CUS2 ||
                type === types_1.CommandType.ARM_DELAY_CUS3 ||
                type === types_1.CommandType.ARM_DELAY_OFF ||
                type === types_1.CommandType.CELLULAR_INFO) {
                try {
                    if (typeof value === "string") {
                        return JSON.parse((0, utils_1.decodeBase64)(value).toString("utf8"));
                    }
                    else {
                        return value; //return object
                    }
                }
                catch (error) {
                    log.error(`Error readValue param ${type} `, error, type, value);
                }
                return "";
            }
            else if (type === types_1.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DETECTION_SENSITIVITY ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_AUTO_RESPONSE ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_STRAND_TIME ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_RING_AUTO_RESPONSE ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_TIME ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DISTANCE ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_TIME ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_DELIVERY_GUARD_SWITCH ||
                type === types_1.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_VOICE) {
                if (typeof value === "string") {
                    try {
                        return JSON.parse(value); //return object
                    }
                    catch (error) {
                        log.error(`Error readValue param ${type} `, error, type, value);
                    }
                    return "";
                }
                else {
                    return value; //return object
                }
            }
        }
        return value;
    }
    static writeValue(type, value) {
        if (value) {
            const result = JSON.stringify(value);
            if (type === types_2.ParamType.SNOOZE_MODE ||
                type === types_2.ParamType.CAMERA_MOTION_ZONES ||
                type === types_1.CommandType.CMD_SET_DOORSENSOR_ALWAYS_OPEN_DELAY ||
                type === types_1.CommandType.CMD_SET_DOORSENSOR_ALWAYS_OPEN) {
                return Buffer.from(result).toString("base64");
            }
            return result;
        }
        return "";
    }
}
exports.ParameterHelper = ParameterHelper;
//# sourceMappingURL=parameter.js.map