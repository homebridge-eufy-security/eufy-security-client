"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const types_1 = require("./types");
const parameter_1 = require("./parameter");
const utils_1 = require("./utils");
const session_1 = require("../p2p/session");
const types_2 = require("../p2p/types");
const device_1 = require("./device");
const utils_2 = require("../p2p/utils");
const error_1 = require("../error");
const types_3 = require("../push/types");
const error_2 = require("./error");
const utils_3 = require("../utils");
class Station extends tiny_typed_emitter_1.TypedEmitter {
    constructor(api, station, publicKey = "") {
        super();
        this.properties = {};
        this.rawProperties = {};
        this.ready = false;
        this.currentDelay = 0;
        this.terminating = false;
        this.p2pConnectionType = types_2.P2PConnectionType.QUICKEST;
        this.pinVerified = false;
        this.api = api;
        this.rawStation = station;
        this.lockPublicKey = publicKey;
        this.log = api.getLog();
        this.p2pSession = new session_1.P2PClientProtocol(this.rawStation, this.api, publicKey);
        this.p2pSession.on("connect", (address) => this.onConnect(address));
        this.p2pSession.on("close", () => this.onDisconnect());
        this.p2pSession.on("timeout", () => this.onTimeout());
        this.p2pSession.on("command", (result) => this.onCommandResponse(result));
        this.p2pSession.on("alarm mode", (mode) => this.onAlarmMode(mode));
        this.p2pSession.on("camera info", (cameraInfo) => this.onCameraInfo(cameraInfo));
        this.p2pSession.on("download started", (channel, metadata, videoStream, audioStream) => this.onStartDownload(channel, metadata, videoStream, audioStream));
        this.p2pSession.on("download finished", (channel) => this.onFinishDownload(channel));
        this.p2pSession.on("livestream started", (channel, metadata, videoStream, audioStream) => this.onStartLivestream(channel, metadata, videoStream, audioStream));
        this.p2pSession.on("livestream stopped", (channel) => this.onStopLivestream(channel));
        this.p2pSession.on("livestream error", (channel, error) => this.onErrorLivestream(channel, error));
        this.p2pSession.on("wifi rssi", (channel, rssi) => this.onWifiRssiChanged(channel, rssi));
        this.p2pSession.on("rtsp livestream started", (channel) => this.onStartRTSPLivestream(channel));
        this.p2pSession.on("rtsp livestream stopped", (channel) => this.onStopRTSPLivestream(channel));
        this.p2pSession.on("rtsp url", (channel, rtspUrl) => this.onRTSPUrl(channel, rtspUrl));
        this.p2pSession.on("parameter", (channel, param, value) => this.onParameter(channel, param, value));
        this.p2pSession.on("runtime state", (channel, batteryLevel, temperature) => this.onRuntimeState(channel, batteryLevel, temperature));
        this.p2pSession.on("charging state", (channel, chargeType, batteryLevel) => this.onChargingState(channel, chargeType, batteryLevel));
        this.p2pSession.on("floodlight manual switch", (channel, enabled) => this.onFloodlightManualSwitch(channel, enabled));
        this.p2pSession.on("alarm delay", (alarmDelayEvent, alarmDelay) => this.onAlarmDelay(alarmDelayEvent, alarmDelay));
        this.p2pSession.on("alarm armed", () => this.onAlarmArmed());
        this.p2pSession.on("alarm event", (alarmEvent) => this.onAlarmEvent(alarmEvent));
        this.p2pSession.on("talkback started", (channel, talkbackStream) => this.onTalkbackStarted(channel, talkbackStream));
        this.p2pSession.on("talkback stopped", (channel) => this.onTalkbackStopped(channel));
        this.p2pSession.on("talkback error", (channel, error) => this.onTalkbackError(channel, error));
        this.p2pSession.on("secondary command", (result) => this.onSecondaryCommandResponse(result));
        this.p2pSession.on("shake alarm", (channel, event) => this.onDeviceShakeAlarm(channel, event));
        this.p2pSession.on("911 alarm", (channel, event) => this.onDevice911Alarm(channel, event));
        this.p2pSession.on("jammed", (channel) => this.onDeviceJammed(channel));
        this.p2pSession.on("low battery", (channel) => this.onDeviceLowBattery(channel));
        this.p2pSession.on("wrong try-protect alarm", (channel) => this.onDeviceWrongTryProtectAlarm(channel));
        this.update(this.rawStation);
        this.ready = true;
        setImmediate(() => {
            this.emit("ready", this);
        });
    }
    static async initialize(api, stationData) {
        let publicKey;
        if (device_1.Device.isLock(stationData.device_type)) {
            publicKey = await api.getPublicKey(stationData.station_sn, types_1.PublicKeyType.LOCK);
        }
        const station = new Station(api, stationData, publicKey);
        return station;
    }
    getStateID(state, level = 2) {
        switch (level) {
            case 0:
                return `${this.getSerial()}`;
            case 1:
                return `${this.getSerial()}.${this.getStateChannel()}`;
            default:
                if (state)
                    return `${this.getSerial()}.${this.getStateChannel()}.${state}`;
                throw new Error("No state value passed.");
        }
    }
    getStateChannel() {
        return "station";
    }
    getRawStation() {
        return this.rawStation;
    }
    update(station, cloudOnlyProperties = false) {
        this.rawStation = station;
        this.p2pSession.updateRawStation(station);
        const metadata = this.getPropertiesMetadata();
        for (const property of Object.values(metadata)) {
            if (this.rawStation[property.key] !== undefined && typeof property.key === "string") {
                this.updateProperty(property.name, this.rawStation[property.key]);
            }
            else if (this.properties[property.name] === undefined && property.default !== undefined && !this.ready) {
                this.updateProperty(property.name, property.default);
            }
        }
        if (!cloudOnlyProperties && this.rawStation.params) {
            this.rawStation.params.forEach(param => {
                this.updateRawProperty(param.param_type, param.param_value);
            });
        }
        this.log.debug("Normalized Properties", { stationSN: this.getSerial(), properties: this.properties });
    }
    updateProperty(name, value) {
        if ((this.properties[name] !== undefined && this.properties[name] !== value)
            || this.properties[name] === undefined) {
            const oldValue = this.properties[name];
            this.properties[name] = value;
            if (this.ready)
                this.emit("property changed", this, name, value);
            try {
                this.handlePropertyChange(this.getPropertyMetadata(name), oldValue, this.properties[name]);
            }
            catch (error) {
                if (error instanceof error_2.InvalidPropertyError) {
                    this.log.error(`Invalid Property ${name} error`, error);
                }
                else {
                    this.log.error(`Property ${name} error`, error);
                }
            }
            return true;
        }
        return false;
    }
    updateRawProperties(values) {
        Object.keys(values).forEach(paramtype => {
            const param_type = Number.parseInt(paramtype);
            this.updateRawProperty(param_type, values[param_type]);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handlePropertyChange(metadata, oldValue, newValue) {
        if (metadata.name === types_1.PropertyName.StationCurrentMode) {
            //TODO: Finish implementation!
            if (newValue === types_1.AlarmMode.DISARMED) {
                if (this.hasProperty(types_1.PropertyName.StationAlarmArmed)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmArmed, false);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarmDelay)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmDelay, 0);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarmDelayType)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmDelayType, 0);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarm)) {
                    this.updateProperty(types_1.PropertyName.StationAlarm, false);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarmType)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmType, 0);
                }
            } /*else if (this.hasProperty(PropertyName.StationAlarmArmed)) { //TODO: Type !== HB3 or STATION
                this.updateProperty(PropertyName.StationAlarmArmed, this.isAlarmArmable(newValue as AlarmMode));
            }*/
        }
    }
    updateRawProperty(type, value) {
        const parsedValue = parameter_1.ParameterHelper.readValue(type, value, this.log);
        if ((this.rawProperties[type] !== undefined && this.rawProperties[type] !== parsedValue)
            || this.rawProperties[type] === undefined) {
            this.rawProperties[type] = parsedValue;
            if (this.ready) {
                this.emit("raw property changed", this, type, this.rawProperties[type]);
                try {
                    if (type === types_1.ParamType.GUARD_MODE) {
                        this.emit("guard mode", this, Number.parseInt(parsedValue));
                    }
                    else if (type === types_2.CommandType.CMD_GET_ALARM_MODE) {
                        this.emit("current mode", this, Number.parseInt(parsedValue));
                    }
                }
                catch (error) {
                    this.log.error("Number conversion error", error);
                }
            }
            const metadata = this.getPropertiesMetadata();
            for (const property of Object.values(metadata)) {
                if (property.key === type) {
                    try {
                        this.updateProperty(property.name, this.convertRawPropertyValue(property, this.rawProperties[type]));
                    }
                    catch (error) {
                        if (error instanceof error_2.PropertyNotSupportedError) {
                            this.log.debug("Property not supported error", error);
                        }
                        else {
                            this.log.error("Property error", error);
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }
    convertRawPropertyValue(property, value) {
        try {
            switch (property.key) {
                case types_2.CommandType.CMD_GET_HUB_LAN_IP:
                    return value !== undefined ? ((0, utils_2.isPrivateIp)(value) ? value : "") : "";
                case types_2.CommandType.CMD_SET_ARMING:
                    return Number.parseInt(value !== undefined ? value : "-1");
                case types_2.CommandType.CMD_GET_ALARM_MODE:
                    {
                        const guard_mode = this.getGuardMode();
                        return Number.parseInt(value !== undefined ? value : guard_mode !== undefined && guard_mode !== types_1.GuardMode.SCHEDULE && guard_mode !== types_1.GuardMode.GEO ? guard_mode : types_1.GuardMode.UNKNOWN.toString());
                    }
                case types_2.CommandType.CMD_HUB_NOTIFY_MODE:
                    {
                        switch (property.name) {
                            case types_1.PropertyName.StationNotificationSwitchModeSchedule:
                                if (!(0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
                                    return value !== undefined ? (value === "1" ? true : false) : false;
                                }
                                return value !== undefined ? (0, utils_1.isNotificationSwitchMode)(Number.parseInt(value), types_1.NotificationSwitchMode.SCHEDULE) : false;
                            case types_1.PropertyName.StationNotificationSwitchModeGeofence:
                                if (!(0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
                                    throw new error_2.PropertyNotSupportedError(`Property ${property.name} not supported for station ${this.getSerial()} with software version ${this.getSoftwareVersion()}`);
                                }
                                return value !== undefined ? (0, utils_1.isNotificationSwitchMode)(Number.parseInt(value), types_1.NotificationSwitchMode.GEOFENCE) : false;
                            case types_1.PropertyName.StationNotificationSwitchModeApp:
                                if (!(0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
                                    throw new error_2.PropertyNotSupportedError(`Property ${property.name} not supported for station ${this.getSerial()} with software version ${this.getSoftwareVersion()}`);
                                }
                                return value !== undefined ? (0, utils_1.isNotificationSwitchMode)(Number.parseInt(value), types_1.NotificationSwitchMode.APP) : false;
                            case types_1.PropertyName.StationNotificationSwitchModeKeypad:
                                if (!(0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
                                    throw new error_2.PropertyNotSupportedError(`Property ${property.name} not supported for station ${this.getSerial()} with software version ${this.getSoftwareVersion()}`);
                                }
                                return value !== undefined ? (0, utils_1.isNotificationSwitchMode)(Number.parseInt(value), types_1.NotificationSwitchMode.KEYPAD) : false;
                        }
                    }
                case types_2.CommandType.CMD_HUB_NOTIFY_ALARM:
                    return value !== undefined ? (value === "1" ? true : false) : false;
                case types_2.CommandType.CMD_HUB_ALARM_TONE:
                    try {
                        return value !== undefined ? Number.parseInt(value) : 1;
                    }
                    catch (error) {
                        this.log.error("Convert CMD_HUB_ALARM_TONE Error:", { property: property, value: value, error: error });
                        return 1;
                    }
                case types_2.CommandType.CMD_SET_HUB_SPK_VOLUME:
                    try {
                        return value !== undefined ? Number.parseInt(value) : 26;
                    }
                    catch (error) {
                        this.log.error("Convert CMD_SET_HUB_SPK_VOLUME Error:", { property: property, value: value, error: error });
                        return 26;
                    }
                case types_2.CommandType.CMD_SET_PROMPT_VOLUME:
                    try {
                        return value !== undefined ? Number.parseInt(value) : 26;
                    }
                    catch (error) {
                        this.log.error("Convert CMD_SET_PROMPT_VOLUME Error:", { property: property, value: value, error: error });
                        return 26;
                    }
                case types_2.CommandType.CMD_SET_HUB_OSD:
                    try {
                        return value !== undefined ? Number.parseInt(value) : 0;
                    }
                    catch (error) {
                        this.log.error("Convert CMD_SET_HUB_OSD Error:", { property: property, value: value, error: error });
                        return 0;
                    }
                case types_2.CommandType.CMD_SET_HUB_ALARM_AUTO_END:
                    return value !== undefined ? value !== "0" ? false : true : false;
                case types_2.CommandType.CMD_SET_HUB_ALARM_CLOSE:
                    return value !== undefined ? value === "1" ? false : true : false;
            }
            if (property.type === "number") {
                const numericProperty = property;
                try {
                    return value !== undefined ? Number.parseInt(value) : (numericProperty.default !== undefined ? numericProperty.default : (numericProperty.min !== undefined ? numericProperty.min : 0));
                }
                catch (error) {
                    this.log.warn("PropertyMetadataNumeric Convert Error:", { property: property, value: value, error: error });
                    return numericProperty.default !== undefined ? numericProperty.default : (numericProperty.min !== undefined ? numericProperty.min : 0);
                }
            }
            else if (property.type === "boolean") {
                const booleanProperty = property;
                try {
                    return value !== undefined ? (value === "1" || value.toLowerCase() === "true" ? true : false) : (booleanProperty.default !== undefined ? booleanProperty.default : false);
                }
                catch (error) {
                    this.log.warn("PropertyMetadataBoolean Convert Error:", { property: property, value: value, error: error });
                    return booleanProperty.default !== undefined ? booleanProperty.default : false;
                }
            }
            else if (property.type === "string") {
                const stringProperty = property;
                return value !== undefined ? value : (stringProperty.default !== undefined ? stringProperty.default : "");
            }
        }
        catch (error) {
            this.log.error("Convert Error:", { property: property, value: value, error: error });
        }
        return value;
    }
    getPropertyMetadata(name) {
        const property = this.getPropertiesMetadata()[name];
        if (property !== undefined)
            return property;
        throw new error_2.InvalidPropertyError(`Property ${name} invalid`);
    }
    getPropertyValue(name) {
        if (name === types_1.PropertyName.StationCurrentMode) {
            const guard_mode = this.properties[types_1.PropertyName.StationGuardMode];
            return this.properties[types_1.PropertyName.StationCurrentMode] !== undefined ? this.properties[types_1.PropertyName.StationCurrentMode] : guard_mode !== undefined && guard_mode !== types_1.GuardMode.SCHEDULE && guard_mode !== types_1.GuardMode.GEO ? guard_mode : types_1.GuardMode.UNKNOWN;
        }
        return this.properties[name];
    }
    hasPropertyValue(name) {
        return this.getPropertyValue(name) !== undefined;
    }
    getRawProperty(type) {
        return this.rawProperties[type];
    }
    getRawProperties() {
        return this.rawProperties;
    }
    getProperties() {
        return this.properties;
    }
    getPropertiesMetadata() {
        let metadata = types_1.StationProperties[this.getDeviceType()];
        if (metadata === undefined) {
            metadata = types_1.StationProperties[types_1.DeviceType.STATION];
        }
        if (this.hasDeviceWithType(types_1.DeviceType.KEYPAD)) {
            metadata[types_1.PropertyName.StationGuardMode] = types_1.StationGuardModeKeyPadProperty;
            metadata[types_1.PropertyName.StationCurrentMode] = types_1.StationCurrentModeKeyPadProperty;
            metadata[types_1.PropertyName.StationSwitchModeWithAccessCode] = types_1.StationSwitchModeWithAccessCodeProperty;
            metadata[types_1.PropertyName.StationAutoEndAlarm] = types_1.StationAutoEndAlarmProperty;
            metadata[types_1.PropertyName.StationTurnOffAlarmWithButton] = types_1.StationTurnOffAlarmWithButtonProperty;
        }
        return metadata;
    }
    hasProperty(name) {
        return this.getPropertiesMetadata()[name] !== undefined;
    }
    getCommands() {
        const commands = types_1.StationCommands[this.getDeviceType()];
        if (commands === undefined)
            return [];
        return commands;
    }
    hasCommand(name) {
        return this.getCommands().includes(name);
    }
    static getChannel(type) {
        return Station.isStation(type) === true ? (device_1.Device.isIndoorCamera(type) ? Station.CHANNEL_INDOOR : Station.CHANNEL) : 0;
    }
    static isStation(type) {
        return type === types_1.DeviceType.STATION || type === types_1.DeviceType.HB3;
    }
    isStation() {
        return Station.isStation(this.rawStation.device_type);
    }
    isIntegratedDevice() {
        var _a, _b;
        if (device_1.Device.isLock(this.getDeviceType()) || device_1.Device.isSmartDrop(this.getDeviceType()) || device_1.Device.isSmartSafe(this.getDeviceType())) {
            if (((_a = this.rawStation.devices) === null || _a === void 0 ? void 0 : _a.length) === 1)
                return ((_b = this.rawStation.devices[0]) === null || _b === void 0 ? void 0 : _b.device_sn) === this.rawStation.station_sn;
            else
                return true;
        }
        return device_1.Device.isWiredDoorbellDual(this.getDeviceType()) || device_1.Device.isFloodLight(this.getDeviceType()) || device_1.Device.isWiredDoorbell(this.getDeviceType()) || device_1.Device.isIndoorCamera(this.getDeviceType()) || device_1.Device.isSoloCameras(this.getDeviceType());
    }
    getDeviceType() {
        return this.rawStation.device_type;
    }
    getHardwareVersion() {
        return this.rawStation.main_hw_version;
    }
    getMACAddress() {
        return this.rawStation.wifi_mac;
    }
    getModel() {
        return this.rawStation.station_model;
    }
    getName() {
        return this.rawStation.station_name;
    }
    getSerial() {
        return this.rawStation.station_sn;
    }
    getSoftwareVersion() {
        return this.rawStation.main_sw_version;
    }
    getIPAddress() {
        return this.rawStation.ip_addr;
    }
    getLANIPAddress() {
        return this.getPropertyValue(types_1.PropertyName.StationLANIpAddress);
    }
    getGuardMode() {
        return this.getPropertyValue(types_1.PropertyName.StationGuardMode);
    }
    getCurrentMode() {
        const guard_mode = this.getGuardMode();
        return this.getPropertyValue(types_1.PropertyName.StationCurrentMode) !== undefined ? this.getPropertyValue(types_1.PropertyName.StationCurrentMode) : guard_mode !== undefined && guard_mode !== types_1.GuardMode.SCHEDULE && guard_mode !== types_1.GuardMode.GEO ? guard_mode : types_1.GuardMode.UNKNOWN;
    }
    processPushNotification(message) {
        if (message.type !== undefined && message.event_type !== undefined) {
            if (message.event_type === types_3.CusPushEvent.MODE_SWITCH && message.station_sn === this.getSerial()) {
                this.log.info("Received push notification for changing guard mode", { guard_mode: message.station_guard_mode, current_mode: message.station_current_mode, stationSN: message.station_sn });
                try {
                    if (message.station_guard_mode !== undefined)
                        this.updateRawProperty(types_1.ParamType.GUARD_MODE, message.station_guard_mode.toString());
                    if (message.station_current_mode !== undefined)
                        this.updateRawProperty(types_2.CommandType.CMD_GET_ALARM_MODE, message.station_current_mode.toString());
                }
                catch (error) {
                    this.log.debug(`Station ${message.station_sn} MODE_SWITCH event (${message.event_type}) - Error:`, error);
                }
            }
            else if (message.event_type === types_3.CusPushEvent.ALARM && message.station_sn === this.getSerial() && !this.isStation()) {
                this.log.info("Received push notification for alarm event", { stationSN: message.station_sn, alarmType: message.alarm_type });
                if (message.alarm_type !== undefined)
                    this.emit("alarm event", this, message.alarm_type);
            }
        }
    }
    isConnected() {
        return this.p2pSession.isConnected();
    }
    close() {
        this.terminating = true;
        this.log.info(`Disconnect from station ${this.getSerial()}`);
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = undefined;
        }
        if (this.p2pSession.isConnected()) {
            this.p2pSession.close();
        }
    }
    isEnergySavingDevice() {
        return this.p2pSession.isEnergySavingDevice();
    }
    async connect() {
        this.log.debug(`Connecting to station ${this.getSerial()}...`, { p2pConnectionType: types_2.P2PConnectionType[this.p2pConnectionType] });
        this.p2pSession.setConnectionType(this.p2pConnectionType);
        this.p2pSession.connect();
    }
    onFinishDownload(channel) {
        this.emit("download finish", this, channel);
    }
    onStartDownload(channel, metadata, videoStream, audioStream) {
        this.emit("download start", this, channel, metadata, videoStream, audioStream);
    }
    onStopLivestream(channel) {
        this.emit("livestream stop", this, channel);
    }
    onErrorLivestream(channel, error) {
        this.emit("livestream error", this, channel, error);
    }
    onStartLivestream(channel, metadata, videoStream, audioStream) {
        this.emit("livestream start", this, channel, metadata, videoStream, audioStream);
    }
    onStopRTSPLivestream(channel) {
        this.emit("rtsp livestream stop", this, channel);
    }
    onStartRTSPLivestream(channel) {
        this.emit("rtsp livestream start", this, channel);
    }
    onWifiRssiChanged(channel, rssi) {
        this.emit("wifi rssi", this, channel, rssi);
    }
    onRTSPUrl(channel, rtspUrl) {
        this.emit("rtsp url", this, channel, rtspUrl);
    }
    onParameter(channel, param, value) {
        const params = {};
        params[param] = parameter_1.ParameterHelper.readValue(param, value, this.log);
        this.emit("raw device property changed", this._getDeviceSerial(channel), params);
    }
    onAlarmDelay(alarmDelayEvent, alarmDelay) {
        this.emit("alarm delay event", this, alarmDelayEvent, alarmDelay);
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelay)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelay, alarmDelay);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelayType)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelayType, alarmDelayEvent);
        }
    }
    onAlarmArmed() {
        this.emit("alarm armed event", this);
        if (this.hasProperty(types_1.PropertyName.StationAlarmArmDelay)) {
            this.updateProperty(types_1.PropertyName.StationAlarmArmDelay, 0);
        }
        /*if (this.hasProperty(PropertyName.StationAlarmArmed) && this.hasProperty(PropertyName.StationCurrentMode)) {
            this.updateProperty(PropertyName.StationAlarmArmed, this.isAlarmArmable(this.getPropertyValue(PropertyName.StationCurrentMode) as AlarmMode));
        }*/
        if (this.hasProperty(types_1.PropertyName.StationAlarmArmed)) {
            this.updateProperty(types_1.PropertyName.StationAlarmArmed, true);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelay)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelay, 0);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelayType)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelayType, 0);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarm)) {
            this.updateProperty(types_1.PropertyName.StationAlarm, false);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarmType)) {
            this.updateProperty(types_1.PropertyName.StationAlarmType, 0);
        }
    }
    onAlarmEvent(alarmEvent) {
        this.emit("alarm event", this, alarmEvent);
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelay)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelay, 0);
        }
        if (this.hasProperty(types_1.PropertyName.StationAlarmDelayType)) {
            this.updateProperty(types_1.PropertyName.StationAlarmDelayType, 0);
        }
        switch (alarmEvent) {
            case types_2.AlarmEvent.DEV_STOP:
            case types_2.AlarmEvent.HUB_STOP:
            case types_2.AlarmEvent.HUB_STOP_BY_APP:
            case types_2.AlarmEvent.HUB_STOP_BY_HAND:
            case types_2.AlarmEvent.HUB_STOP_BY_KEYPAD:
                if (this.hasProperty(types_1.PropertyName.StationAlarm)) {
                    this.updateProperty(types_1.PropertyName.StationAlarm, false);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarmType)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmType, 0);
                }
                break;
            default:
                if (this.hasProperty(types_1.PropertyName.StationAlarm)) {
                    this.updateProperty(types_1.PropertyName.StationAlarm, true);
                }
                if (this.hasProperty(types_1.PropertyName.StationAlarmType)) {
                    this.updateProperty(types_1.PropertyName.StationAlarmType, alarmEvent);
                }
                break;
        }
    }
    async setGuardMode(mode) {
        const propertyData = {
            name: types_1.PropertyName.StationGuardMode,
            value: mode
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, mode);
        this.log.debug(`Sending guard mode command to station ${this.getSerial()} with value: ${types_1.GuardMode[mode]}`);
        if ((((0, utils_1.isGreaterEqualMinVersion)("2.0.7.9", this.getSoftwareVersion()) && !device_1.Device.isIntegratedDeviceBySn(this.getSerial())) || device_1.Device.isSoloCameraBySn(this.getSerial())) || this.rawStation.device_type === types_1.DeviceType.HB3) {
            this.log.debug(`Using CMD_SET_PAYLOAD for station ${this.getSerial()}`, { main_sw_version: this.getSoftwareVersion() });
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_ARMING,
                    "mValue3": 0,
                    "payload": {
                        "mode_type": mode,
                        "user_name": this.rawStation.member.nick_name
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            this.log.debug(`Using CMD_SET_ARMING for station ${this.getSerial()}`);
            await this.p2pSession.sendCommandWithInt({
                commandType: types_2.CommandType.CMD_SET_ARMING,
                value: mode,
                strValue: this.rawStation.member.admin_user_id,
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
    }
    async getCameraInfo() {
        this.log.debug(`Sending get camera infos command to station ${this.getSerial()}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_CAMERA_INFO,
            value: 255,
            channel: Station.CHANNEL
        });
    }
    async getStorageInfo() {
        this.log.debug(`Sending get storage info command to station ${this.getSerial()}`);
        //TODO: Verify channel! Should be 255...
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SDINFO_EX,
            value: 0,
            valueSub: 0,
            strValue: this.rawStation.member.admin_user_id
        });
    }
    async onAlarmMode(mode) {
        this.log.info(`Alarm mode for station ${this.getSerial()} changed to: ${types_1.AlarmMode[mode]}`);
        this.updateRawProperty(types_2.CommandType.CMD_GET_ALARM_MODE, mode.toString());
        const armDelay = this.getArmDelay(mode);
        if (armDelay > 0) {
            this.emit("alarm arm delay event", this, armDelay);
            if (this.hasProperty(types_1.PropertyName.StationAlarmArmDelay)) {
                this.updateProperty(types_1.PropertyName.StationAlarmArmDelay, armDelay);
            }
        }
        if (mode === types_1.AlarmMode.DISARMED) {
            if (this.hasProperty(types_1.PropertyName.StationAlarmArmDelay)) {
                this.updateProperty(types_1.PropertyName.StationAlarmArmDelay, 0);
            }
            if (this.hasProperty(types_1.PropertyName.StationAlarmArmed)) {
                this.updateProperty(types_1.PropertyName.StationAlarmArmed, false);
            }
            if (this.hasProperty(types_1.PropertyName.StationAlarmDelay)) {
                this.updateProperty(types_1.PropertyName.StationAlarmDelay, 0);
            }
            if (this.hasProperty(types_1.PropertyName.StationAlarmDelayType)) {
                this.updateProperty(types_1.PropertyName.StationAlarmDelayType, 0);
            }
            if (this.hasProperty(types_1.PropertyName.StationAlarm)) {
                this.updateProperty(types_1.PropertyName.StationAlarm, false);
            }
            if (this.hasProperty(types_1.PropertyName.StationAlarmType)) {
                this.updateProperty(types_1.PropertyName.StationAlarmType, 0);
            }
        }
        // Trigger refresh Guard Mode
        await this.getCameraInfo();
    }
    getArmDelay(mode) {
        var _a, _b, _c;
        let propertyName;
        switch (mode) {
            case types_1.AlarmMode.HOME:
                propertyName = types_1.PropertyName.StationHomeSecuritySettings;
                break;
            case types_1.AlarmMode.AWAY:
                propertyName = types_1.PropertyName.StationAwaySecuritySettings;
                break;
            case types_1.AlarmMode.CUSTOM1:
                propertyName = types_1.PropertyName.StationCustom1SecuritySettings;
                break;
            case types_1.AlarmMode.CUSTOM2:
                propertyName = types_1.PropertyName.StationCustom2SecuritySettings;
                break;
            case types_1.AlarmMode.CUSTOM3:
                propertyName = types_1.PropertyName.StationCustom3SecuritySettings;
                break;
        }
        if (propertyName !== undefined && this.hasPropertyValue(propertyName) && this.getPropertyValue(propertyName) !== "") {
            const settings = this.getPropertyValue(propertyName);
            try {
                if (((_b = (_a = settings.count_down_arm) === null || _a === void 0 ? void 0 : _a.channel_list) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = settings.count_down_arm) === null || _c === void 0 ? void 0 : _c.delay_time) > 0) {
                    return settings.count_down_arm.delay_time;
                }
            }
            catch (error) {
                this.log.debug(`Station ${this.getSerial()} - getArmDelay - Error`, { error: error, mode: mode, propertyName: propertyName, settings: settings });
            }
        }
        return 0;
    }
    /*private getGuardModeActionSetting(mode: AlarmMode): number {
        //TODO: This settings are only available on the device properties...
        let value = 0;
        try {
            switch (mode) {
                case AlarmMode.HOME:
                    value = Number.parseInt(this.getRawProperty(CommandType.CMD_GET_HOME_ACTION));
                    break;
                case AlarmMode.AWAY:
                    value = Number.parseInt(this.getRawProperty(CommandType.CMD_GET_AWAY_ACTION));
                    break;
                case AlarmMode.CUSTOM1:
                    value = Number.parseInt(this.getRawProperty(CommandType.CMD_GET_CUSTOM1_ACTION));
                    break;
                case AlarmMode.CUSTOM2:
                    value = Number.parseInt(this.getRawProperty(CommandType.CMD_GET_CUSTOM2_ACTION));
                    break;
                case AlarmMode.CUSTOM3:
                    value = Number.parseInt(this.getRawProperty(CommandType.CMD_GET_CUSTOM3_ACTION));
                    break;
            }
        } catch (error) {
            this.log.debug(`Station ${this.getSerial()} - getGuardModeActionSetting - Error`, { error: error, mode: mode });
        }
        return value;
    }

    private isAlarmArmable(mode: AlarmMode): boolean {
        const action = this.getGuardModeActionSetting(mode);
        if ((action & GuardModeSecuritySettingsAction.CAMERA_ALARM) == GuardModeSecuritySettingsAction.CAMERA_ALARM ||
            (action & GuardModeSecuritySettingsAction.HOMEBASE_ALARM) == GuardModeSecuritySettingsAction.HOMEBASE_ALARM ||
            (action & GuardModeSecuritySettingsAction.LIGHT_ALARM) == GuardModeSecuritySettingsAction.LIGHT_ALARM) {
            return true;
        }
        return false;
    }*/
    _getDeviceSerial(channel) {
        if (this.rawStation.devices)
            for (const device of this.rawStation.devices) {
                if (device.device_channel === channel)
                    return device.device_sn;
            }
        return "";
    }
    onCameraInfo(cameraInfo) {
        this.log.debug("Got camera infos", { station: this.getSerial(), cameraInfo: cameraInfo });
        const devices = {};
        cameraInfo.params.forEach(param => {
            if (param.dev_type === Station.CHANNEL || param.dev_type === Station.CHANNEL_INDOOR || this.isIntegratedDevice()) {
                this.updateRawProperty(param.param_type, param.param_value);
                if (param.param_type === types_2.CommandType.CMD_GET_ALARM_MODE) {
                    if (this.getDeviceType() !== types_1.DeviceType.STATION && this.getDeviceType() !== types_1.DeviceType.HB3)
                        // Trigger refresh Guard Mode
                        this.api.refreshStationData();
                }
                if (this.isIntegratedDevice()) {
                    const device_sn = this.getSerial();
                    if (!devices[device_sn]) {
                        devices[device_sn] = {};
                    }
                    devices[device_sn][param.param_type] = parameter_1.ParameterHelper.readValue(param.param_type, param.param_value, this.log);
                }
            }
            else {
                const device_sn = this._getDeviceSerial(param.dev_type);
                if (device_sn !== "") {
                    if (!devices[device_sn]) {
                        devices[device_sn] = {};
                    }
                    devices[device_sn][param.param_type] = parameter_1.ParameterHelper.readValue(param.param_type, param.param_value, this.log);
                }
            }
        });
        Object.keys(devices).forEach(device => {
            this.emit("raw device property changed", device, devices[device]);
        });
    }
    onCommandResponse(result) {
        this.log.debug("Got p2p command response", { station: this.getSerial(), commandType: result.command_type, channel: result.channel, returnCodeName: types_2.ErrorCode[result.return_code], returnCode: result.return_code, customData: result.customData });
        this.emit("command result", this, result);
    }
    onSecondaryCommandResponse(result) {
        var _a, _b;
        this.log.debug("Got p2p secondary command response", { station: this.getSerial(), commandType: result.command_type, channel: result.channel, returnCode: result.return_code, customData: result.customData });
        this.emit("secondary command result", this, result);
        if (result.command_type === types_2.CommandType.CMD_SMARTSAFE_SETTINGS && ((_b = (_a = result.customData) === null || _a === void 0 ? void 0 : _a.command) === null || _b === void 0 ? void 0 : _b.name) === "deviceVerifyPIN") {
            if (result.return_code === 0) {
                // Verify PIN was successfull for this session
                this.pinVerified = true;
            }
            else {
                this.pinVerified = false;
            }
            this.emit("device pin verified", this.getSerial(), this.pinVerified);
        }
    }
    onConnect(address) {
        this.terminating = false;
        this.resetCurrentDelay();
        this.log.info(`Connected to station ${this.getSerial()} on host ${address.host} and port ${address.port}`);
        this.emit("connect", this);
    }
    onDisconnect() {
        this.log.info(`Disconnected from station ${this.getSerial()}`);
        this.emit("close", this);
        this.pinVerified = false;
        if (!this.isEnergySavingDevice() && !this.terminating)
            this.scheduleReconnect();
    }
    onTimeout() {
        this.log.info(`Timeout connecting to station ${this.getSerial()}`);
        this.emit("connection error", this, new error_1.StationConnectTimeoutError());
        this.scheduleReconnect();
    }
    getCurrentDelay() {
        const delay = this.currentDelay == 0 ? 5000 : this.currentDelay;
        if (this.currentDelay < 60000)
            this.currentDelay += 10000;
        if (this.currentDelay >= 60000 && this.currentDelay < 600000)
            this.currentDelay += 60000;
        return delay;
    }
    resetCurrentDelay() {
        this.currentDelay = 0;
    }
    scheduleReconnect() {
        if (!this.reconnectTimeout) {
            const delay = this.getCurrentDelay();
            this.log.debug(`Schedule reconnect to station ${this.getSerial()}...`, { delay: delay });
            this.reconnectTimeout = setTimeout(async () => {
                this.reconnectTimeout = undefined;
                this.connect();
            }, delay);
        }
    }
    async rebootHUB() {
        const commandData = {
            name: types_1.CommandName.StationReboot
        };
        if (!this.hasCommand(types_1.CommandName.StationReboot)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        this.log.debug(`Sending reboot command to station ${this.getSerial()}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_HUB_REBOOT,
            value: 0,
            strValue: this.rawStation.member.admin_user_id,
            channel: Station.CHANNEL
        }, {
            command: commandData
        });
    }
    async setStatusLed(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceStatusLed,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending status led command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isCamera2Product() || device.isCamera3Product() || device.getDeviceType() === types_1.DeviceType.CAMERA || device.getDeviceType() === types_1.DeviceType.CAMERA_E) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_DEV_LED_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_LIVEVIEW_LED_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423 || (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT && !device.isFloodLightT8420X())) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_DEV_LED_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_LED_SWITCH,
                    "data": {
                        "value": value === true ? 1 : 0,
                        "transaction": `${new Date().getTime()}`
                    },
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isIndoorCamera() || device.isFloodLight()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_LED_SWITCH,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "mediaAccountInfo": {
                            "deviceChannel": device.getChannel(),
                            "device_sn": device.getSerial(),
                            "device_type": -1,
                            "mDeviceName": device.getName(),
                            "mDidStr": this.rawStation.p2p_did,
                            "mHubSn": this.getSerial(),
                            "mInitStr": this.rawStation.app_conn,
                            "mReceiveVersion": "",
                            "mTimeInfo": "",
                            "mVersionName": ""
                        },
                        "transaction": `${new Date().getTime()}`
                    },
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isSoloCameras()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_LED_SWITCH,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "url": "",
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "mediaAccountInfo": {
                            "deviceChannel": device.getChannel(),
                            "device_sn": device.getSerial(),
                            "device_type": -1,
                            "mDeviceName": device.getName(),
                            "mDidStr": this.rawStation.p2p_did,
                            "mHubSn": this.getSerial(),
                            "mInitStr": this.rawStation.app_conn,
                            "mReceiveVersion": "",
                            "mTimeInfo": "",
                            "mVersionName": ""
                        },
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isBatteryDoorbell() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_SET_LED_ENABLE,
                    "mValue3": 0,
                    "payload": {
                        "light_enable": value === true ? 1 : 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_LED_NIGHT_OPEN,
                    "data": {
                        "status": value === true ? 1 : 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoNightVision(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoNightvision,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending autonightvision command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_IRCUT_SWITCH,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setNightVision(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNightvision,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending nightvision command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_SET_PAYLOAD,
            value: JSON.stringify({
                "account_id": this.rawStation.member.admin_user_id,
                "cmd": types_2.CommandType.CMD_SET_NIGHT_VISION_TYPE,
                "mValue3": 0,
                "payload": {
                    "channel": device.getChannel(),
                    "night_sion": value,
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setMotionDetection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera() || (device.isFloodLight() && device.getDeviceType() !== types_1.DeviceType.FLOODLIGHT) || device.isFloodLightT8420X() || device.isWiredDoorbellT8200X() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": value === true ? 1 : 0,
                        "type": 0,
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isSoloCameras()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": value === true ? 1 : 0,
                        "type": 0,
                        "url": "",
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_MOTION_DETECTION_PACKAGE,
                    "data": {
                        "enable": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_PIR_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
    }
    async setSoundDetection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSoundDetection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending sound detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_SOUND_DETECT_ENABLE,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": value === true ? 1 : 0,
                    "type": 0,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setSoundDetectionType(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSoundDetectionType,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending sound detection type command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_SOUND_DETECT_TYPE,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": 0,
                    "type": value,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setSoundDetectionSensitivity(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSoundDetectionSensitivity,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending sound detection sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_SOUND_SENSITIVITY_IDX,
                "data": {
                    "enable": 0,
                    "index": value,
                    "status": 0,
                    "type": 0,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setPetDetection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DevicePetDetection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending pet detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_PET_ENABLE,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": value === true ? 1 : 0,
                    "type": 0,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async panAndTilt(device, direction, command = 1) {
        const commandData = {
            name: types_1.CommandName.DevicePanAndTilt,
            value: direction
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DevicePanAndTilt)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!(direction in types_2.PanTiltDirection)) {
            throw new error_1.InvalidCommandValueError(`Value "${direction}" isn't a valid value for command "panAndTilt"`);
        }
        this.log.debug(`Sending pan and tilt command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${types_2.PanTiltDirection[direction]}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_INDOOR_ROTATE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "cmd_type": direction === types_2.PanTiltDirection.ROTATE360 ? -1 : command,
                        "rotate_type": direction,
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_ROTATE,
                    "data": {
                        "cmd_type": command,
                        "rotate_type": direction,
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
    }
    async switchLight(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLight,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending switch light command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight() || device.isSoloCameraSpotlight1080() || device.isSoloCameraSpotlight2k() ||
            device.isSoloCameraSpotlightSolar() || device.isCamera2C() || device.isCamera2CPro() ||
            device.isIndoorOutdoorCamera1080p() || device.isIndoorOutdoorCamera2k() || device.isCamera3() || device.isCamera3C()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_FLOODLIGHT_MANUAL_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_SET_FLOODLIGHT_MANUAL_SWITCH,
                    "data": {
                        "time": 60,
                        "type": 2,
                        "value": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionSensitivity(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivity,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion detection sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if ((device.isFloodLight() && device.getDeviceType() !== types_1.DeviceType.FLOODLIGHT) || device.isIndoorCamera() || device.isFloodLightT8420X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_MOTION_SENSITIVITY_IDX,
                    "data": {
                        "enable": 0,
                        "index": value,
                        "status": 0,
                        "type": 0,
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isSoloCameras() || device.isWiredDoorbellT8200X() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_SET_PIR_SENSITIVITY,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if ((device.isBatteryDoorbell() && !device.isBatteryDoorbellDual()) || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_MOTION_SENSITIVITY,
                    "payload": {
                        "channel": device.getChannel(),
                        "sensitivity": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isCamera2Product()) {
            let convertedValue;
            switch (value) {
                case 1:
                    convertedValue = 192;
                    break;
                case 2:
                    convertedValue = 118;
                    break;
                case 3:
                    convertedValue = 72;
                    break;
                case 4:
                    convertedValue = 46;
                    break;
                case 5:
                    convertedValue = 30;
                    break;
                case 6:
                    convertedValue = 20;
                    break;
                case 7:
                    convertedValue = 14;
                    break;
                default:
                    convertedValue = 46;
                    break;
            }
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_PIRSENSITIVITY,
                value: convertedValue,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.getDeviceType() === types_1.DeviceType.CAMERA || device.getDeviceType() === types_1.DeviceType.CAMERA_E) {
            const convertedValue = 200 - ((value - 1) * 2);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_PIRSENSITIVITY,
                value: convertedValue,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            let intMode;
            let intSensitivity;
            switch (value) {
                case 1:
                    intMode = 3;
                    intSensitivity = 2;
                    break;
                case 2:
                    intMode = 1;
                    intSensitivity = 1;
                    break;
                case 3:
                    intMode = 1;
                    intSensitivity = 2;
                    break;
                case 4:
                    intMode = 1;
                    intSensitivity = 3;
                    break;
                case 5:
                    intMode = 2;
                    intSensitivity = 1;
                    break;
                default:
                    intMode = 1;
                    intSensitivity = 3;
                    break;
            }
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_MOTION_DETECTION_PACKAGE,
                    "data": {
                        "mode": intMode,
                        "sensitivity": intSensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_MDSENSITIVITY,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isCamera3Product()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_PIRSENSITIVITY,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionType(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionType,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion detection type command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isCamera2Product() || device.isBatteryDoorbell() || device.getDeviceType() === types_1.DeviceType.CAMERA ||
            device.getDeviceType() === types_1.DeviceType.CAMERA_E || device.isSoloCameras() ||
            device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423 || device.isWiredDoorbellDual() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithInt({
                commandType: types_2.CommandType.CMD_DEV_PUSHMSG_MODE,
                value: value,
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isFloodLight() || device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_TYPE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": value,
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbellT8200X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_SET_DETECT_TYPE,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionTypeHB3(device, type, value) {
        const propertyData = {
            name: type === types_1.HB3DetectionTypes.HUMAN_RECOGNITION ? types_1.PropertyName.DeviceMotionDetectionTypeHumanRecognition : type === types_1.HB3DetectionTypes.HUMAN_DETECTION ? types_1.PropertyName.DeviceMotionDetectionTypeHuman : type === types_1.HB3DetectionTypes.PET_DETECTION ? types_1.PropertyName.DeviceMotionDetectionTypePet : type === types_1.HB3DetectionTypes.VEHICLE_DETECTION ? types_1.PropertyName.DeviceMotionDetectionTypeVehicle : types_1.PropertyName.DeviceMotionDetectionTypeAllOtherMotions,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion detection type homebase 3 command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        try {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_MOTION_DETECTION_TYPE_HB3,
                    "mChannel": 0,
                    "mValue3": 0,
                    "payload": {
                        "ai_detect_type": (0, utils_1.getHB3DetectionMode)(Number.parseInt(device.getRawProperty(device.getPropertyMetadata(propertyData.name).key)), type, value),
                        "channel": device.getChannel(),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        catch (error) {
            this.log.error(`setMotionDetectionTypeHB3 - station ${this.getSerial()} device ${device.getSerial()}`, error);
        }
    }
    async setMotionZone(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionZone,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion zone command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DET_SET_ACTIVE_ZONE,
                "data": JSON.parse(value)
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setMotionTracking(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionTracking,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending motion tracking command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_PAN_MOTION_TRACK,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": 0,
                    "type": 0,
                    "value": value === true ? 1 : 0,
                    "voiceID": 0,
                    "zonecount": 0,
                    "transaction": `${new Date().getTime()}`,
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setPanAndTiltRotationSpeed(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRotationSpeed,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending pan and tilt rotation speed command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_PAN_SPEED,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": 0,
                    "type": 0,
                    "value": value,
                    "voiceID": 0,
                    "zonecount": 0,
                    "transaction": `${new Date().getTime()}`,
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setMicMute(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMicrophone,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending mic mute command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_DEV_MIC_MUTE,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setAudioRecording(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAudioRecording,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending audio recording command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_AUDIO_MUTE_RECORD,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "enable": value === true ? 1 : 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT && !device.isFloodLightT8420X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_RECORD_AUDIO_SWITCH,
                    "payload": {
                        "storage_audio_switch": value === true ? 0 : 1,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isFloodLight() || device.isIndoorCamera() || device.isSoloCameras() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_SET_RECORD_AUDIO_ENABLE,
                    "data": {
                        "enable": value === true ? 1 : 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isCamera2Product() || device.isCamera3Product() || device.isBatteryDoorbell() || device.getDeviceType() === types_1.DeviceType.CAMERA || device.getDeviceType() === types_1.DeviceType.CAMERA_E || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_AUDIO_MUTE_RECORD,
                    "mValue3": 0,
                    "payload": {
                        "channel": device.getChannel(),
                        "record_mute": value === true ? 0 : 1,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbellT8200X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_SET_RECORD_AUDIO_ENABLE,
                    "data": {
                        "enable": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_AUDIO_RECORDING,
                    "data": {
                        "status": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async enableSpeaker(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSpeaker,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending enable speaker command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_DEV_SPEAKER_MUTE,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setSpeakerVolume(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSpeakerVolume,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending speaker volume command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_DEV_SPEAKER_VOLUME,
            value: value,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setRingtoneVolume(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingtoneVolume,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending ringtone volume command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_BAT_DOORBELL_SET_RINGTONE_VOLUME,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbellT8200X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_T8200X_SET_RINGTONE_VOLUME,
                    "data": {
                        "status": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_RINGTONE_VOLUME,
                    "data": {
                        "volume": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async enableIndoorChime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChimeIndoor,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending enable indoor chime command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_BAT_DOORBELL_MECHANICAL_CHIME_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_INDOOR_CHIME,
                    "data": {
                        "status": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async enableHomebaseChime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChimeHomebase,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending enable homebase chime command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_BAT_DOORBELL_CHIME_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setHomebaseChimeRingtoneVolume(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChimeHomebaseRingtoneVolume,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending homebase chime ringtone volume command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_DINGDONG_V,
                    "mValue3": 0,
                    "payload": {
                        "dingdong_volume": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setHomebaseChimeRingtoneType(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChimeHomebaseRingtoneType,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending homebase chime ringtone type command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_DINGDONG_R,
                    "mValue3": 0,
                    "payload": {
                        "dingdong_ringtone": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationType(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationType,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification type command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight() || device.isIndoorCamera() || device.isSoloCameras() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_PUSH_NOTIFY_TYPE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbellT8200X()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_PUSH_NOTIFY_TYPE,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isBatteryDoorbell() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
                    "mValue3": 0,
                    "payload": {
                        "notification_motion_onoff": device.getPropertyValue(types_1.PropertyName.DeviceNotificationMotion) === true ? 1 : 0,
                        "notification_ring_onoff": device.getPropertyValue(types_1.PropertyName.DeviceNotificationRing) === true ? 1 : 0,
                        "notification_style": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isCamera2Product() || device.getDeviceType() === types_1.DeviceType.CAMERA || device.getDeviceType() === types_1.DeviceType.CAMERA_E || device.isCamera3Product()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_PUSH_EFFECT,
                    "mValue3": 0,
                    "payload": {
                        "notification_style": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_NOTIFICATION_TYPE,
                    "data": {
                        "style": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationPerson(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationPerson,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification person command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_AI_PERSON_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationPet(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationPet,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification pet command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_AI_PET_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationAllOtherMotion(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationAllOtherMotion,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification all other motion command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_AI_MOTION_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationAllSound(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationAllSound,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification all sound command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_AI_SOUND_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationCrying(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationCrying,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification crying command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_AI_CRYING_ENABLE,
                    "data": {
                        "enable": 0,
                        "index": 0,
                        "status": 0,
                        "type": 0,
                        "value": value === true ? 1 : 0,
                        "voiceID": 0,
                        "zonecount": 0,
                        "transaction": `${new Date().getTime()}`,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationRing(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationRing,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification ring command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
                    "mValue3": 0,
                    "payload": {
                        "notification_ring_onoff": value === true ? 1 : 0,
                        "notification_motion_onoff": device.getPropertyValue(types_1.PropertyName.DeviceNotificationMotion) === true ? 1 : 0,
                        "notification_style": device.getPropertyValue(types_1.PropertyName.DeviceNotificationType),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_NOTIFICATION_RING,
                    "data": {
                        "type": value === true ? (device.getPropertyValue(types_1.PropertyName.DeviceNotificationMotion) === true ? 3 : 1) : (device.getPropertyValue(types_1.PropertyName.DeviceNotificationMotion) === true ? 2 : 0),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationMotion(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationMotion,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification motion command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbell() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_SET_NOTIFICATION_MODE,
                    "mValue3": 0,
                    "payload": {
                        "notification_motion_onoff": value === true ? 1 : 0,
                        "notification_ring_onoff": device.getPropertyValue(types_1.PropertyName.DeviceNotificationRing) === true ? 1 : 0,
                        "notification_style": device.getPropertyValue(types_1.PropertyName.DeviceNotificationType),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_NOTIFICATION_RING,
                    "data": {
                        "type": value === true ? (device.getPropertyValue(types_1.PropertyName.DeviceNotificationRing) === true ? 3 : 2) : (device.getPropertyValue(types_1.PropertyName.DeviceNotificationRing) === true ? 1 : 0),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setPowerSource(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DevicePowerSource,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending power source command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_SET_POWER_CHARGE,
                    "data": {
                        "enable": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_POWER_CHARGE,
                    "mValue3": 0,
                    "payload": {
                        "charge_mode": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
    }
    async setPowerWorkingMode(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DevicePowerWorkingMode,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending power working mode command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_PIR_POWERMODE,
            value: value,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setRecordingClipLength(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRecordingClipLength,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending recording clip length command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_DEV_RECORD_TIMEOUT,
            value: value,
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setRecordingRetriggerInterval(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRecordingRetriggerInterval,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending recording retrigger interval command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_DEV_RECORD_INTERVAL,
            value: value,
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setRecordingEndClipMotionStops(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRecordingEndClipMotionStops,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending recording end clip motion stops command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_DEV_RECORD_AUTOSTOP,
            value: value === true ? 0 : 1,
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setVideoStreamingQuality(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoStreamingQuality,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending video streaming quality command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera() || device.isSoloCameras() || device.isFloodLight() || device.isWiredDoorbell() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_VIDEO_QUALITY,
                    "data": {
                        "quality": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isBatteryDoorbell() || device.isCamera2CPro() || device.isWiredDoorbellDual() || device.isCamera3() || device.isCamera3C()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_BAT_DOORBELL_VIDEO_QUALITY,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setVideoRecordingQuality(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoRecordingQuality,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending video recording quality command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamera() || device.isWiredDoorbell() || device.isFloodLight() || device.isSoloCameras() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_VIDEO_RECORDING_QUALITY,
                    "data": {
                        "quality": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isCamera2CPro() || device.isCamera3() || device.isCamera3C()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_RECORD_QUALITY,
                    "mValue3": 0,
                    "payload": {
                        "record_quality": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setWDR(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoWDR,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending wdr command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_BAT_DOORBELL_WDR_SWITCH,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setFloodlightLightSettingsEnable(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsEnable,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending floodlight light settings enable command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_FLOODLIGHT_TOTAL_SWITCH,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setFloodlightLightSettingsBrightnessManual(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsBrightnessManual,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending floodlight light settings brightness manual command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight() || device.isSoloCameraSpotlight1080() || device.isSoloCameraSpotlight2k() ||
            device.isSoloCameraSpotlightSolar() || device.isCamera2C() || device.isCamera2CPro() ||
            device.isIndoorOutdoorCamera1080p() || device.isIndoorOutdoorCamera2k() || device.isCamera3() || device.isCamera3C()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_FLOODLIGHT_BRIGHT_VALUE,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setFloodlightLightSettingsBrightnessMotion(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsBrightnessMotion,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending floodlight light settings brightness motion command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_LIGHT_CTRL_BRIGHT_PIR,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setFloodlightLightSettingsBrightnessSchedule(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsBrightnessSchedule,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending floodlight light settings brightness schedule command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_LIGHT_CTRL_BRIGHT_SCH,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setFloodlightLightSettingsMotionTriggered(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsMotionTriggered,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending floodlight light settings motion triggered command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isFloodLight()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_LIGHT_CTRL_PIR_SWITCH,
                value: value === true ? 1 : 0,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setFloodlightLightSettingsMotionTriggeredDistance(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsMotionTriggeredDistance,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        let newValue;
        switch (value) {
            case 1:
                newValue = types_1.FloodlightMotionTriggeredDistance.MIN;
                break;
            case 2:
                newValue = types_1.FloodlightMotionTriggeredDistance.LOW;
                break;
            case 3:
                newValue = types_1.FloodlightMotionTriggeredDistance.MEDIUM;
                break;
            case 4:
                newValue = types_1.FloodlightMotionTriggeredDistance.HIGH;
                break;
            case 5:
                newValue = types_1.FloodlightMotionTriggeredDistance.MAX;
                break;
            default:
                throw new error_1.InvalidPropertyValueError(`Device ${device.getSerial()} not supported value "${value}" for property named "${types_1.PropertyName.DeviceLightSettingsMotionTriggeredDistance}"`);
        }
        this.log.debug(`Sending floodlight light settings motion triggered distance command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${newValue}`);
        if (device.isFloodLight()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_PIRSENSITIVITY,
                value: newValue,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setFloodlightLightSettingsMotionTriggeredTimer(device, seconds) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsMotionTriggeredTimer,
            value: seconds
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, seconds);
        this.log.debug(`Sending floodlight light settings motion triggered timer command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${seconds}`);
        if (device.isFloodLight()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_LIGHT_CTRL_PIR_TIME,
                value: seconds,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async triggerStationAlarmSound(seconds) {
        const commandData = {
            name: types_1.CommandName.StationTriggerAlarmSound,
            value: seconds
        };
        if (!this.hasCommand(types_1.CommandName.StationTriggerAlarmSound)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        this.log.debug(`Sending trigger station alarm sound command to station ${this.getSerial()} with value: ${seconds}`);
        if (!(0, utils_1.isGreaterEqualMinVersion)("2.0.7.9", this.getSoftwareVersion()) || device_1.Device.isIntegratedDeviceBySn(this.getSerial())) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_TONE_FILE,
                value: 2,
                valueSub: seconds,
                strValue: this.rawStation.member.admin_user_id,
                channel: Station.CHANNEL
            }, {
                command: commandData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_TONE_FILE,
                    "mValue3": 0,
                    "payload": {
                        "time_out": seconds,
                        "user_name": this.rawStation.member.nick_name,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                command: commandData
            });
        }
    }
    async resetStationAlarmSound() {
        await this.triggerStationAlarmSound(0);
    }
    async triggerDeviceAlarmSound(device, seconds) {
        const commandData = {
            name: types_1.CommandName.DeviceTriggerAlarmSound,
            value: seconds
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceTriggerAlarmSound)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending trigger device alarm sound command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${seconds}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_SET_DEVS_TONE_FILE,
            value: seconds,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            command: commandData
        });
    }
    async resetDeviceAlarmSound(device) {
        await this.triggerDeviceAlarmSound(device, 0);
    }
    async setStationAlarmRingtoneVolume(value) {
        const propertyData = {
            name: types_1.PropertyName.StationAlarmVolume,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station alarm ringtone volume command to station ${this.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_SET_HUB_SPK_VOLUME,
            value: value,
            strValue: this.rawStation.member.admin_user_id,
            channel: Station.CHANNEL
        }, {
            property: propertyData
        });
    }
    async setStationAlarmTone(value) {
        const propertyData = {
            name: types_1.PropertyName.StationAlarmTone,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station alarm tone command to station ${this.getSerial()} with value: ${types_1.AlarmTone[value]}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_SET_PAYLOAD,
            value: JSON.stringify({
                "account_id": this.rawStation.member.admin_user_id,
                "cmd": types_2.CommandType.CMD_HUB_ALARM_TONE,
                "mValue3": 0,
                "payload": {
                    "type": value,
                }
            }),
            channel: Station.CHANNEL
        }, {
            property: propertyData
        });
    }
    async setStationPromptVolume(value) {
        const propertyData = {
            name: types_1.PropertyName.StationPromptVolume,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station prompt volume command to station ${this.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_SET_PAYLOAD,
            value: JSON.stringify({
                "account_id": this.rawStation.member.admin_user_id,
                "cmd": types_2.CommandType.CMD_SET_PROMPT_VOLUME,
                "mValue3": 0,
                "payload": {
                    "value": value,
                }
            }),
            channel: Station.CHANNEL
        }, {
            property: propertyData
        });
    }
    async setStationNotificationSwitchMode(mode, value) {
        if ((!this.hasProperty(types_1.PropertyName.StationNotificationSwitchModeApp) && mode === types_1.NotificationSwitchMode.APP) ||
            (!this.hasProperty(types_1.PropertyName.StationNotificationSwitchModeGeofence) && mode === types_1.NotificationSwitchMode.GEOFENCE) ||
            (!this.hasProperty(types_1.PropertyName.StationNotificationSwitchModeKeypad) && mode === types_1.NotificationSwitchMode.KEYPAD) ||
            (!this.hasProperty(types_1.PropertyName.StationNotificationSwitchModeSchedule) && mode === types_1.NotificationSwitchMode.SCHEDULE)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const propertyData = {
            name: mode === types_1.NotificationSwitchMode.APP ? types_1.PropertyName.StationNotificationSwitchModeApp : mode === types_1.NotificationSwitchMode.GEOFENCE ? types_1.PropertyName.StationNotificationSwitchModeGeofence : mode === types_1.NotificationSwitchMode.KEYPAD ? types_1.PropertyName.StationNotificationSwitchModeKeypad : mode === types_1.NotificationSwitchMode.SCHEDULE ? types_1.PropertyName.StationNotificationSwitchModeSchedule : "",
            value: value
        };
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station notification switch mode command to station ${this.getSerial()} with value: ${value}`);
        if ((0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
            let oldvalue = 0;
            const rawproperty = this.getRawProperty(types_2.CommandType.CMD_HUB_NOTIFY_MODE);
            if (rawproperty !== undefined) {
                try {
                    oldvalue = Number.parseInt(rawproperty);
                }
                catch (error) {
                }
            }
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_HUB_NOTIFY_MODE,
                    "mValue3": 0,
                    "payload": {
                        "arm_push_mode": (0, utils_1.switchNotificationMode)(oldvalue, mode, value),
                        "notify_alarm_delay": this.getPropertyValue(types_1.PropertyName.StationNotificationStartAlarmDelay) !== undefined ? (this.getPropertyValue(types_1.PropertyName.StationNotificationStartAlarmDelay) === true ? 1 : 0) : 0,
                        "notify_mode": 0,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_HUB_NOTIFY_MODE,
                    "mValue3": 0,
                    "payload": {
                        //"arm_push_mode": 0,
                        "notify_alarm_delay": this.getPropertyValue(types_1.PropertyName.StationNotificationStartAlarmDelay) !== undefined ? (this.getPropertyValue(types_1.PropertyName.StationNotificationStartAlarmDelay) === true ? 1 : 0) : 0,
                        "notify_mode": value === true ? 1 : 0, // 0 or 1
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
    }
    async setStationNotificationStartAlarmDelay(value) {
        const propertyData = {
            name: types_1.PropertyName.StationNotificationStartAlarmDelay,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        let pushmode = 0;
        const rawproperty = this.getRawProperty(types_2.CommandType.CMD_HUB_NOTIFY_MODE);
        if (rawproperty !== undefined) {
            try {
                pushmode = Number.parseInt(rawproperty);
            }
            catch (error) {
            }
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station notification start alarm delay command to station ${this.getSerial()} with value: ${value}`);
        if ((0, utils_1.isGreaterEqualMinVersion)("2.1.1.6", this.getSoftwareVersion())) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_HUB_NOTIFY_ALARM,
                    "mValue3": 0,
                    "payload": {
                        "arm_push_mode": pushmode,
                        "notify_alarm_delay": value === true ? 1 : 0,
                        "notify_mode": 0,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_HUB_NOTIFY_MODE,
                    "mValue3": 0,
                    "payload": {
                        //"arm_push_mode": 0,
                        "notify_alarm_delay": value === true ? 1 : 0,
                        "notify_mode": pushmode, // 0 or 1
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
    }
    async setStationTimeFormat(value) {
        const propertyData = {
            name: types_1.PropertyName.StationTimeFormat,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station time format command to station ${this.getSerial()} with value: ${types_1.TimeFormat[value]}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_SET_HUB_OSD,
            value: value,
            strValue: this.rawStation.member.admin_user_id,
            channel: Station.CHANNEL
        }, {
            property: propertyData
        });
    }
    async setRTSPStream(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRTSPStream,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending rtsp stream command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_NAS_SWITCH,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setAntiTheftDetection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAntitheftDetection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending antitheft detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_EAS_SWITCH,
            value: value === true ? 1 : 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setWatermark(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceWatermark,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        if (device.isCamera2Product() || device.isCamera3Product()) {
            if (!Object.values(types_2.WatermarkSetting3).includes(value)) {
                this.log.error(`The device ${device.getSerial()} accepts only this type of values:`, types_2.WatermarkSetting3);
                return;
            }
            this.log.debug(`Sending watermark command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${types_2.WatermarkSetting3[value]}`);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_DEVS_OSD,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isSoloCameras() || device.isWiredDoorbell() || device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423 || device.isStarlight4GLTE()) {
            if (!Object.values(types_2.WatermarkSetting1).includes(value)) {
                this.log.error(`The device ${device.getSerial()} accepts only this type of values:`, types_2.WatermarkSetting1);
                return;
            }
            this.log.debug(`Sending watermark command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${types_2.WatermarkSetting1[value]}`);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_DEVS_OSD,
                value: value,
                valueSub: 0,
                strValue: this.rawStation.member.admin_user_id,
                channel: 0
            }, {
                property: propertyData
            });
        }
        else if (device.isIndoorCamera() || device.isFloodLight()) {
            if (!Object.values(types_2.WatermarkSetting4).includes(value)) {
                this.log.error(`The device ${device.getSerial()} accepts only this type of values:`, types_2.WatermarkSetting4);
                return;
            }
            this.log.debug(`Sending watermark command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${types_2.WatermarkSetting4[value]}`);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_DEVS_OSD,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isBatteryDoorbell() || device.getDeviceType() === types_1.DeviceType.CAMERA || device.getDeviceType() === types_1.DeviceType.CAMERA_E || device.isWiredDoorbellDual()) {
            if (!Object.values(types_2.WatermarkSetting2).includes(value)) {
                this.log.error(`The device ${device.getSerial()} accepts only this type of values: `, types_2.WatermarkSetting2);
                return;
            }
            this.log.debug(`Sending matermark command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${types_2.WatermarkSetting2[value]}`);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_DEVS_OSD,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async enableDevice(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceEnabled,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        let param_value = value === true ? 0 : 1;
        if ((device.isIndoorCamera() && !device.isIndoorCamMini()) || (device.isWiredDoorbell() && !device.isWiredDoorbellT8200X()) || device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8422 || device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8424 || device.isFloodLightT8420X())
            param_value = value === true ? 1 : 0;
        this.log.debug(`Sending enable device command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isIndoorCamMini()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_ENABLE_PRIVACY_MODE,
                    "data": {
                        "value": param_value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_DEVS_SWITCH,
                value: param_value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
    }
    async startDownload(device, path, cipher_id) {
        const commandData = {
            name: types_1.CommandName.DeviceStartDownload,
            value: {
                path: path,
                cipher_id: cipher_id
            }
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceStartDownload)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (this.getDeviceType() === types_1.DeviceType.HB3) {
            //TODO: Implement HB3 Support! Actually doesn't work and returns return_code -104 (ERROR_INVALID_ACCOUNT). It could be that we need the new encrypted p2p protocol to make this work...
            const rsa_key = this.p2pSession.getDownloadRSAPrivateKey();
            this.log.debug(`Sending start download command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${path}`);
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                value: JSON.stringify({
                    account_id: this.rawStation.member.admin_user_id,
                    cmd: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                    mChannel: device.getChannel(),
                    mValue3: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                    payload: {
                        filepath: path,
                        key: rsa_key === null || rsa_key === void 0 ? void 0 : rsa_key.exportKey("components-public").n.slice(1).toString("hex").toUpperCase(),
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else if (cipher_id !== undefined) {
            const cipher = await this.api.getCipher(cipher_id, this.rawStation.member.admin_user_id);
            if (Object.keys(cipher).length > 0) {
                this.log.debug(`Sending start download command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${path}`);
                this.p2pSession.setDownloadRSAPrivateKeyPem(cipher.private_key);
                await this.p2pSession.sendCommandWithString({
                    commandType: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                    strValue: path,
                    strValueSub: this.rawStation.member.admin_user_id,
                    channel: device.getChannel()
                }, {
                    command: commandData
                });
            }
            else {
                this.log.warn(`Cancelled download of video "${path}" from Station ${this.getSerial()}, because RSA certificate couldn't be loaded`);
                this.emit("command result", this, {
                    channel: device.getChannel(),
                    command_type: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                    return_code: types_2.ErrorCode.ERROR_INVALID_PARAM,
                    customData: {
                        command: commandData
                    }
                });
            }
        }
        else {
            this.log.warn(`Cancelled download of video "${path}" from Station ${this.getSerial()}, because cipher_id is missing`);
            this.emit("command result", this, {
                channel: device.getChannel(),
                command_type: types_2.CommandType.CMD_DOWNLOAD_VIDEO,
                return_code: types_2.ErrorCode.ERROR_INVALID_PARAM,
                customData: {
                    command: commandData
                }
            });
        }
    }
    async cancelDownload(device) {
        const commandData = {
            name: types_1.CommandName.DeviceCancelDownload
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceCancelDownload)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending cancel download command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_DOWNLOAD_CANCEL,
            value: device.getChannel(),
            strValueSub: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            command: commandData
        });
    }
    async startLivestream(device, videoCodec = types_2.VideoCodec.H264) {
        const commandData = {
            name: types_1.CommandName.DeviceStartLivestream,
            value: videoCodec
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceStartLivestream)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (this.isLiveStreaming(device)) {
            throw new error_2.LivestreamAlreadyRunningError(`Livestream for device ${device.getSerial()} is already running`);
        }
        this.log.debug(`Sending start livestream command to station ${this.getSerial()} for device ${device.getSerial()}`);
        const rsa_key = this.p2pSession.getRSAPrivateKey();
        if (device.isSoloCameras() || device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423 || device.isWiredDoorbellT8200X()) {
            this.log.debug(`Using CMD_DOORBELL_SET_PAYLOAD (1) for station ${this.getSerial()} (main_sw_version: ${this.getSoftwareVersion()})`);
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_START_LIVESTREAM,
                    "data": {
                        "accountId": this.rawStation.member.admin_user_id,
                        "encryptkey": rsa_key === null || rsa_key === void 0 ? void 0 : rsa_key.exportKey("components-public").n.slice(1).toString("hex"),
                        "streamtype": videoCodec
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else if (device.isWiredDoorbell() || (device.isFloodLight() && device.getDeviceType() !== types_1.DeviceType.FLOODLIGHT) || device.isIndoorCamera() || (device.getSerial().startsWith("T8420") && (0, utils_1.isGreaterEqualMinVersion)("2.0.4.8", this.getSoftwareVersion()))) {
            this.log.debug(`Using CMD_DOORBELL_SET_PAYLOAD (2) for station ${this.getSerial()} (main_sw_version: ${this.getSoftwareVersion()})`);
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_START_LIVESTREAM,
                    "data": {
                        "account_id": this.rawStation.member.admin_user_id,
                        "encryptkey": rsa_key === null || rsa_key === void 0 ? void 0 : rsa_key.exportKey("components-public").n.slice(1).toString("hex"),
                        "streamtype": videoCodec
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            if ((device_1.Device.isIntegratedDeviceBySn(this.getSerial()) || !(0, utils_1.isGreaterEqualMinVersion)("2.0.9.7", this.getSoftwareVersion())) && (!this.getSerial().startsWith("T8420") || !(0, utils_1.isGreaterEqualMinVersion)("1.0.0.25", this.getSoftwareVersion()))) {
                this.log.debug(`Using CMD_START_REALTIME_MEDIA for station ${this.getSerial()} (main_sw_version: ${this.getSoftwareVersion()})`);
                await this.p2pSession.sendCommandWithInt({
                    commandType: types_2.CommandType.CMD_START_REALTIME_MEDIA,
                    value: device.getChannel(),
                    strValue: rsa_key === null || rsa_key === void 0 ? void 0 : rsa_key.exportKey("components-public").n.slice(1).toString("hex"),
                    channel: device.getChannel()
                }, {
                    command: commandData
                });
            }
            else {
                this.log.debug(`Using CMD_SET_PAYLOAD for station ${this.getSerial()} (main_sw_version: ${this.getSoftwareVersion()})`);
                await this.p2pSession.sendCommandWithStringPayload({
                    commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                    value: JSON.stringify({
                        "account_id": this.rawStation.member.admin_user_id,
                        "cmd": types_2.CommandType.CMD_START_REALTIME_MEDIA,
                        "mValue3": types_2.CommandType.CMD_START_REALTIME_MEDIA,
                        "payload": {
                            "ClientOS": "Android",
                            "key": rsa_key === null || rsa_key === void 0 ? void 0 : rsa_key.exportKey("components-public").n.slice(1).toString("hex"),
                            "streamtype": videoCodec === types_2.VideoCodec.H264 ? 1 : 2,
                        }
                    }),
                    channel: device.getChannel()
                }, {
                    command: commandData
                });
            }
        }
    }
    async stopLivestream(device) {
        const commandData = {
            name: types_1.CommandName.DeviceStopLivestream
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceStopLivestream)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!this.isLiveStreaming(device)) {
            throw new error_2.LivestreamNotRunningError(`Livestream for device ${device.getSerial()} is not running`);
        }
        this.log.debug(`Sending stop livestream command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_STOP_REALTIME_MEDIA,
            value: device.getChannel(),
            channel: device.getChannel()
        }, {
            command: commandData
        });
    }
    isLiveStreaming(device) {
        if (device.getStationSerial() !== this.getSerial())
            return false;
        return this.p2pSession.isLiveStreaming(device.getChannel());
    }
    isDownloading(device) {
        if (device.getStationSerial() !== this.getSerial())
            return false;
        return this.p2pSession.isDownloading(device.getChannel());
    }
    async quickResponse(device, voice_id) {
        const commandData = {
            name: types_1.CommandName.DeviceQuickResponse,
            value: voice_id
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceQuickResponse)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending quick response command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${voice_id}`);
        if (device.isBatteryDoorbell()) {
            this.log.debug(`Using CMD_BAT_DOORBELL_QUICK_RESPONSE for station ${this.getSerial()}`);
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_BAT_DOORBELL_QUICK_RESPONSE,
                value: voice_id,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else if (device.isWiredDoorbell()) {
            this.log.debug(`Using CMD_DOORBELL_SET_PAYLOAD for station ${this.getSerial()}`);
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_QUICK_RESPONSE,
                    "data": {
                        "voiceID": voice_id
                    }
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setChirpVolume(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChirpVolume,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending chirp volume command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isEntrySensor()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SENSOR_SET_CHIRP_VOLUME,
                    "mValue3": 0,
                    "payload": {
                        "channel": device.getChannel(),
                        "volume": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setChirpTone(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceChirpTone,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending chirp tone command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isEntrySensor()) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SENSOR_SET_CHIRP_TONE,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setHDR(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoHDR,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending hdr command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_HDR,
                    "data": {
                        "status": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDistortionCorrection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoDistortionCorrection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending distortion correction command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_DISTORTION_CORRECTION,
                    "data": {
                        "status": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setRingRecord(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoRingRecord,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending ring record command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isWiredDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_1.ParamType.COMMAND_VIDEO_RING_RECORD,
                    "data": {
                        "status": value
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async lockDevice(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLocked,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending lock device command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isLockBleNoFinger() || device.isLockBle()) {
            const key = (0, utils_2.generateBasicLockAESKey)(this.rawStation.member.admin_user_id, this.getSerial());
            const iv = (0, utils_2.getLockVectorBytes)(this.getSerial());
            const lockCmd = device_1.Lock.encodeESLCmdOnOff(Number.parseInt(this.rawStation.member.short_user_id), this.rawStation.member.nick_name, value);
            const payload = {
                channel: device.getChannel(),
                lock_cmd: types_2.ESLBleCommand.ON_OFF_LOCK,
                lock_payload: lockCmd.toString("base64"),
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const encPayload = (0, utils_2.encryptLockAESData)(key, iv, (0, utils_2.encodeLockPayload)(JSON.stringify(payload)));
            this.log.debug("Locking/unlocking device...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: payload, encPayload: encPayload.toString("hex") });
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORLOCK_DATA_PASS_THROUGH,
                    "mValue3": 0,
                    "payload": {
                        "payload": encPayload.toString("base64")
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                shortUserId: this.rawStation.member.short_user_id,
                slOperation: value === true ? 1 : 0,
                userId: this.rawStation.member.admin_user_id,
                userName: this.rawStation.member.nick_name,
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_ON_OFF_LOCK, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_ON_OFF_LOCK, command.aesKey);
            this.log.debug("Locking/unlocking device...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                property: propertyData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.ON_OFF_LOCK, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdUnlock(this.rawStation.member.short_user_id, value === true ? 1 : 0, this.rawStation.member.nick_name));
            this.log.debug("Locking/unlocking device...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command.payload });
            await this._sendLockV12P2PCommand(command, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setStationSwitchModeWithAccessCode(value) {
        const propertyData = {
            name: types_1.PropertyName.StationNotificationSwitchModeGeofence,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station switch mode with access code command to station ${this.getSerial()} with value: ${value}`);
        if (this.isStation()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_KEYPAD_PSW_OPEN,
                    "mValue3": 0,
                    "payload": {
                        "psw_required": value === true ? 1 : 0,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
    }
    async setStationAutoEndAlarm(value) {
        const propertyData = {
            name: types_1.PropertyName.StationAutoEndAlarm,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station auto end alarm command to station ${this.getSerial()} with value: ${value}`);
        if (this.isStation()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_HUB_ALARM_AUTO_END,
                    "mValue3": 0,
                    "payload": {
                        "value": value === true ? 0 : 2147483647,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
    }
    async setStationTurnOffAlarmWithButton(value) {
        const propertyData = {
            name: types_1.PropertyName.StationTurnOffAlarmWithButton,
            value: value
        };
        if (!this.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        const property = this.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending station turn off alarm with button command to station ${this.getSerial()} with value: ${value}`);
        if (this.isStation()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_SET_HUB_ALARM_CLOSE,
                    "mValue3": 0,
                    "payload": {
                        "value": value === true ? 0 : 1,
                    }
                }),
                channel: Station.CHANNEL
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
    }
    async startRTSPStream(device) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(types_1.PropertyName.DeviceRTSPStream)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const rtspStreamProperty = device.getPropertyValue(types_1.PropertyName.DeviceRTSPStream);
        if (rtspStreamProperty !== undefined && rtspStreamProperty !== true) {
            throw new error_1.RTSPPropertyNotEnabledError(`RTSP setting for device ${device.getSerial()} must be enabled first, to enable this functionality!`);
        }
        const propertyData = {
            name: types_1.PropertyName.DeviceRTSPStream,
            value: rtspStreamProperty
        };
        this.log.debug(`Start RTSP stream command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_NAS_TEST,
            value: 1,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async stopRTSPStream(device) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(types_1.PropertyName.DeviceRTSPStream)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const rtspStreamProperty = device.getPropertyValue(types_1.PropertyName.DeviceRTSPStream);
        if (rtspStreamProperty !== undefined && rtspStreamProperty !== true) {
            throw new error_1.RTSPPropertyNotEnabledError(`RTSP setting for device ${device.getSerial()} must be enabled first, to enable this functionality!`);
        }
        const propertyData = {
            name: types_1.PropertyName.DeviceRTSPStream,
            value: rtspStreamProperty
        };
        this.log.debug(`Stop RTSP stream command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithIntString({
            commandType: types_2.CommandType.CMD_NAS_TEST,
            value: 0,
            valueSub: device.getChannel(),
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setMotionDetectionRange(device, type) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionRange,
            value: type
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, type);
        this.log.debug(`Sending motion detection range command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${type}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE,
                    "data": {
                        "value": type,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionRangeStandardSensitivity(device, sensitivity) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionRangeStandardSensitivity,
            value: sensitivity
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, sensitivity);
        this.log.debug(`Sending motion detection range standard sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${sensitivity}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_STD_SENSITIVITY,
                    "data": {
                        "value": sensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionRangeAdvancedLeftSensitivity(device, sensitivity) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity,
            value: sensitivity
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, sensitivity);
        this.log.debug(`Sending motion detection range advanced left sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${sensitivity}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_LEFT_SENSITIVITY,
                    "data": {
                        "value": sensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionRangeAdvancedMiddleSensitivity(device, sensitivity) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity,
            value: sensitivity
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, sensitivity);
        this.log.debug(`Sending motion detection range advanced middle sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${sensitivity}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_MIDDLE_SENSITIVITY,
                    "data": {
                        "value": sensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionRangeAdvancedRightSensitivity(device, sensitivity) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity,
            value: sensitivity
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, sensitivity);
        this.log.debug(`Sending motion detection range advanced right sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${sensitivity}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_DETECTION_RANGE_ADV_RIGHT_SENSITIVITY,
                    "data": {
                        "value": sensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionDetectionTestMode(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionTestMode,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending motion detection test mode command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423 || device.getDeviceType() === types_1.DeviceType.FLOODLIGHT) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_PIR_TEST_MODE,
                value: enabled === true ? 1 : 2,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionTrackingSensitivity(device, sensitivity) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionTrackingSensitivity,
            value: sensitivity
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, sensitivity);
        this.log.debug(`Sending motion tracking sensitivity command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${sensitivity}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_MOTION_TRACKING_SENSITIVITY,
                    "data": {
                        "value": sensitivity,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionAutoCruise(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionAutoCruise,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending motion auto cruise command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_MOTION_AUTO_CRUISE,
                    "data": {
                        "value": enabled === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setMotionOutOfViewDetection(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionOutOfViewDetection,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending motion out-of-view detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_MOTION_OUT_OF_VIEW_DETECTION,
                    "data": {
                        "value": enabled === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLightSettingsColorTemperatureManual(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsColorTemperatureManual,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending light setting color temperature manual command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_MANUAL,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLightSettingsColorTemperatureMotion(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsColorTemperatureMotion,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending light setting color temperature motion command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_MOTION,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLightSettingsColorTemperatureSchedule(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsColorTemperatureSchedule,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending light setting color temperature schedule command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_LIGHT_COLOR_TEMP_SCHEDULE,
                    "data": {
                        "value": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLightSettingsMotionActivationMode(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLightSettingsMotionActivationMode,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending light setting motion activation mode command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithIntString({
                commandType: types_2.CommandType.CMD_SET_FLOODLIGHT_STREET_LAMP,
                value: value,
                valueSub: device.getChannel(),
                strValue: this.rawStation.member.admin_user_id,
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setVideoNightvisionImageAdjustment(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoNightvisionImageAdjustment,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending video nightvision image adjustment command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_VIDEO_NIGHTVISION_IMAGE_ADJUSTMENT,
                    "data": {
                        "value": enabled === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setVideoColorNightvision(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoColorNightvision,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending video color nightvision command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_VIDEO_COLOR_NIGHTVISION,
                    "data": {
                        "value": enabled === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoCalibration(device, enabled) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoCalibration,
            value: enabled
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, enabled);
        this.log.debug(`Sending auto calibration command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${enabled}`);
        if (device.getDeviceType() === types_1.DeviceType.FLOODLIGHT_CAMERA_8423) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_FLOODLIGHT_SET_AUTO_CALIBRATION,
                    "data": {
                        "value": enabled === true ? 0 : 1,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    isRTSPLiveStreaming(device) {
        return this.p2pSession.isRTSPLiveStreaming(device.getChannel());
    }
    setConnectionType(type) {
        this.p2pConnectionType = type;
    }
    getConnectionType() {
        return this.p2pConnectionType;
    }
    onRuntimeState(channel, batteryLevel, temperature) {
        this.emit("runtime state", this, channel, batteryLevel, temperature);
    }
    onChargingState(channel, chargeType, batteryLevel) {
        this.emit("charging state", this, channel, chargeType, batteryLevel);
    }
    hasDevice(deviceSN) {
        if (this.rawStation.devices)
            for (const device of this.rawStation.devices) {
                if (device.device_sn === deviceSN)
                    return true;
            }
        return false;
    }
    hasDeviceWithType(deviceType) {
        if (this.rawStation.devices)
            for (const device of this.rawStation.devices) {
                if (device.device_type === deviceType)
                    return true;
            }
        return false;
    }
    onFloodlightManualSwitch(channel, enabled) {
        this.emit("floodlight manual switch", this, channel, enabled);
    }
    async calibrateLock(device) {
        const commandData = {
            name: types_1.CommandName.DeviceLockCalibration
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!this.hasCommand(types_1.CommandName.DeviceLockCalibration)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending calibrate lock command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_CALIBRATE_LOCK, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_CALIBRATE_LOCK, command.aesKey);
            this.log.debug("Calibrate lock...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.CALIBRATE_LOCK, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdCalibrate(this.rawStation.member.admin_user_id));
            this.log.debug("Locking/unlocking device...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command.payload });
            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    convertAdvancedLockSettingValue(property, value) {
        switch (property) {
            case types_1.PropertyName.DeviceAutoLock:
            case types_1.PropertyName.DeviceNotification:
            case types_1.PropertyName.DeviceNotificationLocked:
            case types_1.PropertyName.DeviceOneTouchLocking:
            case types_1.PropertyName.DeviceAutoLockSchedule:
            case types_1.PropertyName.DeviceScramblePasscode:
            case types_1.PropertyName.DeviceNotificationUnlocked:
            case types_1.PropertyName.DeviceWrongTryProtection:
                return value === true ? 1 : 0;
            case types_1.PropertyName.DeviceWrongTryLockdownTime:
            case types_1.PropertyName.DeviceSound:
            case types_1.PropertyName.DeviceWrongTryAttempts:
            case types_1.PropertyName.DeviceAutoLockTimer:
                return value;
            case types_1.PropertyName.DeviceAutoLockScheduleEndTime:
            case types_1.PropertyName.DeviceAutoLockScheduleStartTime:
                const autoLockSchedule = value.split(":");
                return `${Number.parseInt(autoLockSchedule[0]).toString(16).padStart(2, "0")}${Number.parseInt(autoLockSchedule[1]).toString(16).padStart(2, "0")}`;
        }
        return "";
    }
    getAdvancedLockSettingsPayload(command, device) {
        switch (command) {
            case types_2.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE_STARTTIME:
            case types_2.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE_ENDTIME:
                command = types_2.CommandType.CMD_SMARTLOCK_AUTO_LOCK_SCHEDULE;
                break;
            case types_2.CommandType.CMD_SMARTLOCK_AUTO_LOCK_TIMER:
                command = types_2.CommandType.CMD_SMARTLOCK_AUTO_LOCK;
                break;
            case types_2.CommandType.CMD_SMARTLOCK_WRONG_TRY_ATTEMPTS:
            case types_2.CommandType.CMD_SMARTLOCK_WRONG_TRY_LOCKDOWN:
                command = types_2.CommandType.CMD_SMARTLOCK_WRONG_TRY_PROTECT;
                break;
            case types_2.CommandType.CMD_SMARTLOCK_NOTIFICATION_LOCKED:
            case types_2.CommandType.CMD_SMARTLOCK_NOTIFICATION_UNLOCKED:
                command = types_2.CommandType.CMD_SMARTLOCK_NOTIFICATION;
                break;
        }
        return {
            autoLockTime: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceAutoLockTimer, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockTimer)),
            isAutoLock: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceAutoLock, device.getPropertyValue(types_1.PropertyName.DeviceAutoLock)),
            isLockNotification: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceNotificationLocked, device.getPropertyValue(types_1.PropertyName.DeviceNotificationLocked)),
            isNotification: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceNotification, device.getPropertyValue(types_1.PropertyName.DeviceNotification)),
            isOneTouchLock: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceOneTouchLocking, device.getPropertyValue(types_1.PropertyName.DeviceOneTouchLocking)),
            isSchedule: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceAutoLockSchedule, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockSchedule)),
            isScramblePasscode: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceScramblePasscode, device.getPropertyValue(types_1.PropertyName.DeviceScramblePasscode)),
            isUnLockNotification: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceNotificationUnlocked, device.getPropertyValue(types_1.PropertyName.DeviceNotificationUnlocked)),
            isWrongTryProtect: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceWrongTryProtection, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryProtection)),
            lockDownTime: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceWrongTryLockdownTime, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryLockdownTime)),
            lockSound: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceSound, device.getPropertyValue(types_1.PropertyName.DeviceSound)),
            paramType: command,
            scheduleEnd: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceAutoLockScheduleEndTime, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleEndTime)),
            scheduleStart: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceAutoLockScheduleStartTime, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleStartTime)),
            wrongTryTime: this.convertAdvancedLockSettingValue(types_1.PropertyName.DeviceWrongTryAttempts, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryAttempts)),
            seq_num: this.p2pSession.incLockSequenceNumber()
        };
    }
    getAdvancedLockSettingName(property) {
        switch (property) {
            case types_1.PropertyName.DeviceAutoLock: return "isAutoLock";
            case types_1.PropertyName.DeviceAutoLockTimer: return "autoLockTime";
            case types_1.PropertyName.DeviceNotification: return "isNotification";
            case types_1.PropertyName.DeviceNotificationLocked: return "isLockNotification";
            case types_1.PropertyName.DeviceOneTouchLocking: return "isOneTouchLock";
            case types_1.PropertyName.DeviceAutoLockSchedule: return "isSchedule";
            case types_1.PropertyName.DeviceScramblePasscode: return "isScramblePasscode";
            case types_1.PropertyName.DeviceNotificationUnlocked: return "isUnLockNotification";
            case types_1.PropertyName.DeviceWrongTryProtection: return "isWrongTryProtect";
            case types_1.PropertyName.DeviceWrongTryLockdownTime: return "lockDownTime";
            case types_1.PropertyName.DeviceSound: return "lockSound";
            case types_1.PropertyName.DeviceAutoLockScheduleEndTime: return "scheduleEnd";
            case types_1.PropertyName.DeviceAutoLockScheduleStartTime: return "scheduleStart";
            case types_1.PropertyName.DeviceWrongTryAttempts: return "wrongTryTime";
        }
        return "";
    }
    async setAdvancedLockParams(device, property, value) {
        const propertyData = {
            name: property,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const propertyMetadata = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(propertyMetadata, value);
        this.log.debug(`Sending set advanced lock settings command to station ${this.getSerial()} for device ${device.getSerial()} property ${property}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const payload = this.getAdvancedLockSettingsPayload(device.getPropertyMetadata(property).key, device);
            const p2pParamName = this.getAdvancedLockSettingName(property);
            if (p2pParamName !== "") {
                payload[p2pParamName] = this.convertAdvancedLockSettingValue(property, value);
                const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_SET_LOCK_PARAM, device.getChannel(), this.lockPublicKey, payload);
                this.p2pSession.setLockAESKey(types_2.CommandType.P2P_SET_LOCK_PARAM, command.aesKey);
                this.log.debug("Set lock param...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, property: property, value: value, payload: command, nestedPayload: payload });
                await this.p2pSession.sendCommandWithStringPayload(command, {
                    property: propertyData
                });
            }
            else {
                this.log.warn(`Internal lock property for property ${property} not identified for ${device.getSerial()}`, { p2pParamName: p2pParamName });
                throw new error_2.InvalidPropertyError(`Internal lock property for property ${property} not identified for ${device.getSerial()}`);
            }
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLoiteringDetection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringDetection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending loitering detection command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_SWITCH,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "radar_wd_switch": value === true ? 1 : 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLoiteringDetectionRange(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringDetectionRange,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending loitering detection range command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DISTANCE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "radar_wd_distance": value
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLoiteringDetectionLength(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringDetectionLength,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending loitering detection length command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_TIME,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "radar_wd_time": value
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async _setMotionDetectionSensitivity(device, propertyData, mode, blocklist) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending motion detection sensitivity dual command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${propertyData.value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_DETECTION_SENSITIVITY,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "block_list": blocklist,
                        "model": mode,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    _getMotionDetectionSensitivityAdvanced(device) {
        return [
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedA),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedB),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedC),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedD),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedE),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedF),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedG),
            device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedH),
        ];
    }
    async setMotionDetectionSensitivityMode(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityMode,
            value: value
        };
        let distances;
        if (device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityMode) === types_1.MotionDetectionMode.STANDARD) {
            distances = Array(8).fill(device.getPropertyValue(types_1.PropertyName.DeviceMotionDetectionSensitivityStandard));
        }
        else {
            distances = this._getMotionDetectionSensitivityAdvanced(device);
        }
        await this._setMotionDetectionSensitivity(device, propertyData, value, (0, utils_1.getBlocklist)(distances));
    }
    async setMotionDetectionSensitivityStandard(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityStandard,
            value: value
        };
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.STANDARD, (0, utils_1.getBlocklist)(Array(8).fill(value)));
    }
    async setMotionDetectionSensitivityAdvancedA(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedA,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[0] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedB(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedB,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[1] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedC(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedC,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[2] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedD(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedD,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[3] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedE(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedE,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[4] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedF(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedF,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[5] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedG(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedG,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[6] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async setMotionDetectionSensitivityAdvancedH(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceMotionDetectionSensitivityAdvancedH,
            value: value
        };
        const blocklist = this._getMotionDetectionSensitivityAdvanced(device);
        blocklist[7] = value;
        await this._setMotionDetectionSensitivity(device, propertyData, types_1.MotionDetectionMode.ADVANCED, (0, utils_1.getBlocklist)(blocklist));
    }
    async _setLoiteringCustomResponse(device, propertyData, voiceID, autoVoiceResponse, homebaseAlert, pushNotification, startTime, endTime) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending loitering custom response command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${propertyData.value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RADAR_WD_AUTO_RESPONSE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "num": 1,
                        "setting": [{
                                "active": 0,
                                "auto_voice_id": voiceID,
                                "auto_voice_name": device.getVoiceName(voiceID),
                                "auto_voice_resp": autoVoiceResponse === true ? 1 : 0,
                                "end_hour": endTime.split(":")[0],
                                "end_min": endTime.split(":")[1],
                                "familiar_id": 0,
                                "homebase_alert": homebaseAlert === true ? 1 : 0,
                                "push_notify": pushNotification === true ? 1 : 0,
                                "start_hour": startTime.split(":")[0],
                                "start_min": startTime.split(":")[1],
                            }]
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLoiteringCustomResponseAutoVoiceResponse(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice), value, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo));
    }
    async setLoiteringCustomResponseAutoVoiceResponseVoice(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, value, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo));
    }
    async setLoiteringCustomResponseHomeBaseNotification(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse), value, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo));
    }
    async setLoiteringCustomResponsePhoneNotification(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification), value, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo));
    }
    async setLoiteringCustomResponseTimeFrom(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification), value, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo));
    }
    async setLoiteringCustomResponseTimeTo(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceLoiteringCustomResponseTimeTo,
            value: value
        };
        await this._setLoiteringCustomResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponsePhoneNotification), device.getPropertyValue(types_1.PropertyName.DeviceLoiteringCustomResponseTimeFrom), value);
    }
    async setDeliveryGuard(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuard,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending delivery guard command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_DELIVERY_GUARD_SWITCH,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "ai_bottom_switch": value === true ? 1024 : 0,
                        "ai_front_switch": 0
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardPackageGuarding(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardPackageGuarding,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending delivery guard package guarding command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_SWITCH,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "package_guard_switch": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardPackageGuardingVoiceResponseVoice(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending delivery guard package guarding voice response voice command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_VOICE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "auto_voice_id": value,
                        "auto_voice_name": device.getVoiceName(value),
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardPackageGuardingActivatedTime(device, propertyData, startTime, endTime) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending delivery guard package guarding activeted time command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${propertyData.value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_GUARD_TIME,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "end_h": endTime.split(":")[0],
                        "end_m": endTime.split(":")[1],
                        "start_h": startTime.split(":")[0],
                        "start_m": startTime.split(":")[1],
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardPackageGuardingActivatedTimeFrom(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom,
            value: value
        };
        await this.setDeliveryGuardPackageGuardingActivatedTime(device, propertyData, value, device.getPropertyValue(types_1.PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo));
    }
    async setDeliveryGuardPackageGuardingActivatedTimeTo(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo,
            value: value
        };
        await this.setDeliveryGuardPackageGuardingActivatedTime(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom), value);
    }
    async setDeliveryGuardUncollectedPackageAlert(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardUncollectedPackageAlert,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending delivery guard uncollected package alert command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_STRAND_SWITCH,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "package_strand_switch": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardUncollectedPackageAlertTimeToCheck(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending delivery guard uncollected package alert time to check command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_STRAND_TIME,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "start_h": value.split(":")[0],
                        "start_m": value.split(":")[1],
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDeliveryGuardPackageLiveCheckAssistance(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending delivery guard package live check assistance command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_PACKAGE_ASSISTANT_SWITCH,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "package_assitant_switch": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setDualCamWatchViewMode(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDualCamWatchViewMode,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending dual cam watch view mode command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_VIEW_MODE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "restore": 1,
                        "video_type": value,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async _setRingAutoResponse(device, propertyData, enabled, voiceID, autoVoiceResponse, startTime, endTime) {
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, propertyData.value);
        this.log.debug(`Sending ring auto response command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${propertyData.value}`);
        if (device.isBatteryDoorbellDual() || device.isWiredDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_RING_AUTO_RESPONSE,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "num": 1,
                        "setting": [{
                                "active": enabled === true ? 1 : 0,
                                "auto_voice_id": voiceID,
                                "auto_voice_name": device.getVoiceName(voiceID),
                                "auto_voice_resp": autoVoiceResponse === true ? 1 : 0,
                                "end_hour": endTime.split(":")[0],
                                "end_min": endTime.split(":")[1],
                                "familiar_id": 0,
                                "start_hour": startTime.split(":")[0],
                                "start_min": startTime.split(":")[1],
                            }]
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setRingAutoResponse(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingAutoResponse,
            value: value
        };
        await this._setRingAutoResponse(device, propertyData, value, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeTo));
    }
    async setRingAutoResponseVoiceResponse(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingAutoResponseVoiceResponse,
            value: value
        };
        await this._setRingAutoResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponseVoice), value, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeTo));
    }
    async setRingAutoResponseVoiceResponseVoice(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingAutoResponseVoiceResponseVoice,
            value: value
        };
        await this._setRingAutoResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponse), value, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeFrom), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeTo));
    }
    async setRingAutoResponseTimeFrom(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingAutoResponseTimeFrom,
            value: value
        };
        await this._setRingAutoResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponse), value, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeTo));
    }
    async setRingAutoResponseTimeTo(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceRingAutoResponseTimeTo,
            value: value
        };
        await this._setRingAutoResponse(device, propertyData, device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponseVoice), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseVoiceResponse), device.getPropertyValue(types_1.PropertyName.DeviceRingAutoResponseTimeFrom), value);
    }
    async setNotificationRadarDetector(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationRadarDetector,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification radar detector command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isBatteryDoorbellDual()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_DOORBELL_DUAL_NOTIFICATION_HUMAN_DETECT,
                    "mChannel": device.getChannel(),
                    "mValue3": 0,
                    "payload": {
                        "radar_human_detect": value === true ? 1 : 0,
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async calibrate(device) {
        const commandData = {
            name: types_1.CommandName.DeviceCalibrate
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceCalibrate)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending calibrate command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isPanAndTiltCamera()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.CommandType.CMD_INDOOR_PAN_CALIBRATION
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setContinuousRecording(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceContinuousRecording,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending continuous recording command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_SET_CONTINUE_ENABLE,
                "data": {
                    "enable": value === true ? 1 : 0,
                    "index": 0,
                    "status": 0,
                    "type": 0,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0,
                    "transaction": `${new Date().getTime()}`,
                },
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setContinuousRecordingType(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceContinuousRecordingType,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending continuous recording type command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_SET_CONTINUE_TYPE,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": 0,
                    "type": value,
                    "value": 0,
                    "voiceID": 0,
                    "zonecount": 0,
                    "transaction": `${new Date().getTime()}`,
                }
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async enableDefaultAngle(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDefaultAngle,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending default angle command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DEFAULT_ANGLE_ENABLE,
                "data": {
                    "value": value === true ? device.getPropertyValue(types_1.PropertyName.DeviceDefaultAngleIdleTime) : 0,
                },
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setDefaultAngleIdleTime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceDefaultAngleIdleTime,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending default angle idle time command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DEFAULT_ANGLE_IDLE_TIME,
                "data": {
                    "value": value,
                },
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setDefaultAngle(device) {
        const commandData = {
            name: types_1.CommandName.DeviceSetDefaultAngle
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceSetDefaultAngle)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending set default angle command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_DEFAULT_ANGLE_SET,
                "data": {
                    "value": 0,
                },
            }),
            channel: device.getChannel()
        }, {
            command: commandData
        });
    }
    async setPrivacyAngle(device) {
        const commandData = {
            name: types_1.CommandName.DeviceSetPrivacyAngle
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceSetPrivacyAngle)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending set privacy angle command to station ${this.getSerial()} for device ${device.getSerial()}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_SET_PRIVACY_ANGLE,
                "data": {
                    "value": 0,
                },
            }),
            channel: device.getChannel()
        }, {
            command: commandData
        });
    }
    async setNotificationIntervalTime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationIntervalTime,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending notification interval time command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithInt({
            commandType: types_2.CommandType.CMD_DEV_RECORD_INTERVAL,
            value: value,
            strValue: this.rawStation.member.admin_user_id,
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async setSoundDetectionRoundLook(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSoundDetectionRoundLook,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        this.log.debug(`Sending sound detection round look command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_SET_SOUND_DETECT_ROUND_LOOK,
                "data": {
                    "value": value === true ? 1 : 0,
                },
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async startTalkback(device) {
        const commandData = {
            name: types_1.CommandName.DeviceStartTalkback
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceStartTalkback)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!this.isLiveStreaming(device)) {
            throw new error_2.LivestreamNotRunningError(`Livestream for device ${device.getSerial()} is not running`);
        }
        this.log.debug(`Sending start talkback command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isIndoorCamera() || device.isSoloCamera() || device.isFloodLight() || device.isWiredDoorbell() || device.isSmartDrop() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.IndoorSoloSmartdropCommandType.CMD_START_SPEAK,
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else if (device.isBatteryDoorbell() && (0, utils_1.isGreaterEqualMinVersion)("2.0.6.8", this.getSoftwareVersion())) {
            await this.p2pSession.sendCommandWithInt({
                commandType: types_2.CommandType.CMD_START_TALKBACK,
                value: 0,
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            this.p2pSession.startTalkback(device.getChannel());
            this.emit("command result", this, {
                channel: device.getChannel(),
                command_type: 0,
                return_code: 0,
                customData: {
                    command: commandData
                }
            });
        }
    }
    async stopTalkback(device) {
        const commandData = {
            name: types_1.CommandName.DeviceStopTalkback
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceStopTalkback)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!this.isLiveStreaming(device)) {
            throw new error_2.LivestreamNotRunningError(`Livestream for device ${device.getSerial()} is not running`);
        }
        this.log.debug(`Sending stop talkback command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isIndoorCamera() || device.isSoloCamera() || device.isFloodLight() || device.isWiredDoorbell() || device.isSmartDrop() || device.isStarlight4GLTE()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
                value: JSON.stringify({
                    "commandType": types_2.IndoorSoloSmartdropCommandType.CMD_END_SPEAK,
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else if (device.isBatteryDoorbell() && (0, utils_1.isGreaterEqualMinVersion)("2.0.6.8", this.getSoftwareVersion())) {
            await this.p2pSession.sendCommandWithInt({
                commandType: types_2.CommandType.CMD_STOP_TALKBACK,
                value: 0,
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            this.p2pSession.stopTalkback(device.getChannel());
            this.emit("command result", this, {
                channel: device.getChannel(),
                command_type: 0,
                return_code: 0,
                customData: {
                    command: commandData
                }
            });
        }
    }
    onTalkbackStarted(channel, talkbackStream) {
        this.emit("talkback started", this, channel, talkbackStream);
    }
    onTalkbackStopped(channel) {
        this.emit("talkback stopped", this, channel);
    }
    onTalkbackError(channel, error) {
        this.emit("talkback error", this, channel, error);
    }
    isTalkbackOngoing(device) {
        if (device.getStationSerial() !== this.getSerial())
            return false;
        return this.p2pSession.isTalkbackOngoing(device.getChannel());
    }
    async setScramblePasscode(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceScramblePasscode,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending scramble passcode command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceScramblePasscode, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceScramblePasscode, value);
        }
        else if (device.isSmartSafe()) {
            await this.setSmartSafeParams(device, types_1.PropertyName.DeviceScramblePasscode, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setWrongTryProtection(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceWrongTryProtection,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending wrong try protection command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceWrongTryProtection, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceWrongTryProtection, value);
        }
        else if (device.isSmartSafe()) {
            await this.setSmartSafeParams(device, types_1.PropertyName.DeviceWrongTryProtection, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setWrongTryAttempts(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceWrongTryAttempts,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending wrong try attempts command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceWrongTryAttempts, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceWrongTryAttempts, value);
        }
        else if (device.isSmartSafe()) {
            await this.setSmartSafeParams(device, types_1.PropertyName.DeviceWrongTryAttempts, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setWrongTryLockdownTime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceWrongTryLockdownTime,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending wrong try lockdown time command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceWrongTryLockdownTime, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceWrongTryLockdownTime, value);
        }
        else if (device.isSmartSafe()) {
            await this.setSmartSafeParams(device, types_1.PropertyName.DeviceWrongTryLockdownTime, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async _sendSmartSafeCommand(device, command, data, customData) {
        const payload = (0, utils_2.getSmartSafeP2PCommand)(device.getSerial(), this.rawStation.member.admin_user_id, types_2.CommandType.CMD_SMARTSAFE_SETTINGS, command, device.getChannel(), this.p2pSession.incLockSequenceNumber(), data);
        await this.p2pSession.sendCommandWithStringPayload(payload, customData);
    }
    async setSmartSafeParams(device, property, value) {
        const propertyData = {
            name: property,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const propertyMetadata = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(propertyMetadata, value);
        this.log.debug(`Sending set smart safe settings command to station ${this.getSerial()} for device ${device.getSerial()} property ${property}`);
        if (device.isSmartSafe()) {
            let payload;
            let command;
            switch (property) {
                case types_1.PropertyName.DeviceWrongTryProtection:
                    payload = device_1.SmartSafe.encodeCmdWrongTryProtect(this.rawStation.member.admin_user_id, value, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryAttempts), device.getPropertyValue(types_1.PropertyName.DeviceWrongTryLockdownTime) / 60);
                    command = types_2.SmartSafeCommandCode.SET_CRACK_PROTECT;
                    break;
                case types_1.PropertyName.DeviceWrongTryAttempts:
                    payload = device_1.SmartSafe.encodeCmdWrongTryProtect(this.rawStation.member.admin_user_id, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryProtection), value, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryLockdownTime) / 60);
                    command = types_2.SmartSafeCommandCode.SET_CRACK_PROTECT;
                    break;
                case types_1.PropertyName.DeviceWrongTryLockdownTime:
                    payload = device_1.SmartSafe.encodeCmdWrongTryProtect(this.rawStation.member.admin_user_id, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryProtection), device.getPropertyValue(types_1.PropertyName.DeviceWrongTryAttempts), value / 60);
                    command = types_2.SmartSafeCommandCode.SET_CRACK_PROTECT;
                    break;
                case types_1.PropertyName.DeviceLeftOpenAlarm:
                    payload = device_1.SmartSafe.encodeCmdLeftOpenAlarm(this.rawStation.member.admin_user_id, value, device.getPropertyValue(types_1.PropertyName.DeviceLeftOpenAlarmDuration));
                    command = types_2.SmartSafeCommandCode.SET_LOCK_ALARM;
                    break;
                case types_1.PropertyName.DeviceLeftOpenAlarmDuration:
                    payload = device_1.SmartSafe.encodeCmdLeftOpenAlarm(this.rawStation.member.admin_user_id, device.getPropertyValue(types_1.PropertyName.DeviceLeftOpenAlarm), value);
                    command = types_2.SmartSafeCommandCode.SET_LOCK_ALARM;
                    break;
                case types_1.PropertyName.DeviceDualUnlock:
                    payload = device_1.SmartSafe.encodeCmdDualUnlock(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_DUAL_UNLOCK;
                    break;
                case types_1.PropertyName.DevicePowerSave:
                    payload = device_1.SmartSafe.encodeCmdPowerSave(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_POWERSAVE;
                    break;
                case types_1.PropertyName.DeviceInteriorBrightness:
                    payload = device_1.SmartSafe.encodeCmdInteriorBrightness(this.rawStation.member.admin_user_id, value, device.getPropertyValue(types_1.PropertyName.DeviceInteriorBrightnessDuration));
                    command = types_2.SmartSafeCommandCode.SET_LIGHT;
                    break;
                case types_1.PropertyName.DeviceInteriorBrightnessDuration:
                    payload = device_1.SmartSafe.encodeCmdInteriorBrightness(this.rawStation.member.admin_user_id, device.getPropertyValue(types_1.PropertyName.DeviceInteriorBrightness), value);
                    command = types_2.SmartSafeCommandCode.SET_LIGHT;
                    break;
                case types_1.PropertyName.DeviceTamperAlarm:
                    payload = device_1.SmartSafe.encodeCmdTamperAlarm(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_SHAKE;
                    break;
                case types_1.PropertyName.DeviceRemoteUnlock:
                case types_1.PropertyName.DeviceRemoteUnlockMasterPIN:
                    {
                        if (!this.pinVerified && value === true) {
                            throw new error_1.PinNotVerifiedError(`You need to call verifyPIN with correct PIN first to enable this property`);
                        }
                        let newValue = 2;
                        const remoteUnlock = property === types_1.PropertyName.DeviceRemoteUnlock ? value : device.getPropertyValue(types_1.PropertyName.DeviceRemoteUnlock);
                        const remoteUnlockMasterPIN = property === types_1.PropertyName.DeviceRemoteUnlockMasterPIN ? value : device.getPropertyValue(types_1.PropertyName.DeviceRemoteUnlockMasterPIN);
                        if (remoteUnlock && remoteUnlockMasterPIN) {
                            newValue = 0;
                        }
                        else if (remoteUnlock) {
                            newValue = 1;
                        }
                        payload = device_1.SmartSafe.encodeCmdRemoteUnlock(this.rawStation.member.admin_user_id, newValue);
                        command = types_2.SmartSafeCommandCode.SET_UNLOCK_MODE;
                        break;
                    }
                case types_1.PropertyName.DevicePromptVolume:
                    payload = device_1.SmartSafe.encodeCmdPromptVolume(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_VOLUME;
                    break;
                case types_1.PropertyName.DeviceAlarmVolume:
                    payload = device_1.SmartSafe.encodeCmdAlertVolume(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_VOLUME_ALERT;
                    break;
                case types_1.PropertyName.DeviceNotificationUnlockByKey:
                case types_1.PropertyName.DeviceNotificationUnlockByPIN:
                case types_1.PropertyName.DeviceNotificationUnlockByFingerprint:
                case types_1.PropertyName.DeviceNotificationUnlockByApp:
                case types_1.PropertyName.DeviceNotificationDualUnlock:
                case types_1.PropertyName.DeviceNotificationDualLock:
                case types_1.PropertyName.DeviceNotificationWrongTryProtect:
                case types_1.PropertyName.DeviceNotificationJammed:
                    const settingsValues = [
                        property === types_1.PropertyName.DeviceNotificationUnlockByKey ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationUnlockByKey),
                        property === types_1.PropertyName.DeviceNotificationUnlockByPIN ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationUnlockByPIN),
                        property === types_1.PropertyName.DeviceNotificationUnlockByFingerprint ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationUnlockByFingerprint),
                        property === types_1.PropertyName.DeviceNotificationUnlockByApp ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationUnlockByApp),
                        property === types_1.PropertyName.DeviceNotificationDualUnlock ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationDualUnlock),
                        property === types_1.PropertyName.DeviceNotificationDualLock ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationDualLock),
                        property === types_1.PropertyName.DeviceNotificationWrongTryProtect ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationWrongTryProtect),
                        property === types_1.PropertyName.DeviceNotificationJammed ? value : device.getPropertyValue(types_1.PropertyName.DeviceNotificationJammed),
                    ];
                    let modes = 0;
                    for (let pos = 0; pos < settingsValues.length; pos++) {
                        if (settingsValues[pos]) {
                            modes = (modes | (1 << pos));
                        }
                    }
                    payload = device_1.SmartSafe.encodeCmdPushNotification(this.rawStation.member.admin_user_id, modes);
                    command = types_2.SmartSafeCommandCode.SET_PUSH;
                    break;
                case types_1.PropertyName.DeviceScramblePasscode:
                    payload = device_1.SmartSafe.encodeCmdScramblePIN(this.rawStation.member.admin_user_id, value);
                    command = types_2.SmartSafeCommandCode.SET_SCRAMBLE_PASSWORD;
                    break;
                default:
                    payload = Buffer.from([]);
                    command = types_2.SmartSafeCommandCode.DEFAULT;
                    break;
            }
            this.log.debug(`device: ${device.getSerial()} property: ${property} value: ${value} payload: ${payload.toString("hex")}`);
            await this._sendSmartSafeCommand(device, command, payload, { property: propertyData });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async unlock(device) {
        const commandData = {
            name: types_1.CommandName.DeviceUnlock
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceUnlock)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const payload = device_1.SmartSafe.encodeCmdUnlock(this.rawStation.member.admin_user_id);
        this.log.debug(`Sending trigger device unlock command to station ${this.getSerial()} for device ${device.getSerial()}`, { payload: payload.toString("hex") });
        await this._sendSmartSafeCommand(device, types_2.SmartSafeCommandCode.UNLOCK, payload, { command: commandData });
    }
    async verifyPIN(device, pin) {
        const commandData = {
            name: types_1.CommandName.DeviceVerifyPIN
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceVerifyPIN)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!/^[1-6]{4,8}$/.test(pin)) {
            throw new error_1.InvalidCommandValueError(`PIN should contain only numbers (1-6) and be between 4 and 8 long`);
        }
        const payload = device_1.SmartSafe.encodeCmdVerifyPIN(this.rawStation.member.admin_user_id, pin);
        this.log.debug(`Sending device verify pin command to station ${this.getSerial()} for device ${device.getSerial()}`, { payload: payload.toString("hex") });
        await this._sendSmartSafeCommand(device, types_2.SmartSafeCommandCode.SET_VERIFY_PIN, payload, { command: commandData });
    }
    onDeviceShakeAlarm(channel, event) {
        this.emit("device shake alarm", this._getDeviceSerial(channel), event);
    }
    onDevice911Alarm(channel, event) {
        this.emit("device 911 alarm", this._getDeviceSerial(channel), event);
    }
    onDeviceJammed(channel) {
        this.emit("device jammed", this._getDeviceSerial(channel));
    }
    onDeviceLowBattery(channel) {
        this.emit("device low battery", this._getDeviceSerial(channel));
    }
    onDeviceWrongTryProtectAlarm(channel) {
        this.emit("device wrong try-protect alarm", this._getDeviceSerial(channel));
    }
    async setVideoTypeStoreToNAS(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceVideoTypeStoreToNAS,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const property = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(property, value);
        if (device.getPropertyValue(types_1.PropertyName.DeviceContinuousRecording) !== true && value === types_1.VideoTypeStoreToNAS.ContinuousRecording) {
            await this.setContinuousRecording(device, true);
        }
        this.log.debug(`Sending video type store to NAS command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        await this.p2pSession.sendCommandWithStringPayload({
            commandType: types_2.CommandType.CMD_DOORBELL_SET_PAYLOAD,
            value: JSON.stringify({
                "commandType": types_2.CommandType.CMD_INDOOR_NAS_STORAGE_TYPE,
                "data": {
                    "enable": 0,
                    "index": 0,
                    "status": 0,
                    "type": 0,
                    "value": value,
                    "voiceID": 0,
                    "zonecount": 0,
                    "transaction": `${new Date().getTime()}`,
                },
            }),
            channel: device.getChannel()
        }, {
            property: propertyData
        });
    }
    async snooze(device, value) {
        const commandData = {
            name: types_1.CommandName.DeviceSnooze,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceSnooze)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending snooze command to station ${this.getSerial()} for device ${device.getSerial()} with value: ${value}`);
        if (device.isDoorbell()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_SNOOZE_MODE,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "snooze_time": value.snooze_time,
                    "startTime": `${Math.trunc(new Date().getTime() / 1000)}`,
                    "chime_onoff": value.snooze_chime !== undefined && value.snooze_chime ? 1 : 0,
                    "motion_notify_onoff": value.snooze_motion !== undefined && value.snooze_motion ? 1 : 0,
                    "homebase_onoff": value.snooze_homebase !== undefined && value.snooze_homebase ? 1 : 0,
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
        else {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_SNOOZE_MODE,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "snooze_time": value.snooze_time
                }),
                channel: device.getChannel()
            }, {
                command: commandData
            });
        }
    }
    async addUser(device, username, shortUserId, passcode, schedule) {
        const commandData = {
            name: types_1.CommandName.DeviceAddUser,
            value: {
                username: username,
                shortUserId: shortUserId,
                passcode: passcode,
                schedule: schedule
            }
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceAddUser)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (!/^\d{4,8}$/.test(passcode)) {
            throw new error_1.InvalidCommandValueError(`Passcode should contain only numbers and be between 4 and 8 long`);
        }
        this.log.debug(`Sending add user command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            // passcode: min 4 max 8
            // passcode: 13579753 =>  3133353739373533
            // 04.09.2022 11:36
            // 01.01.2023 19:36
            // Mon-Sunday Wednsday No!
            // {"endDay":"e7070101","endTime":"1324","passcode":"3133353739373533","startDay":"00000000","startTime":"0b24","userId":"0009","week":"77","seq_num":662}
            //log.b 2: payloadStr: {"endDay":"ffffffff","endTime":"ffff","passcode":"3233353438333333","startDay":"00000000","startTime":"0000","userId":"0008","week":"ff","seq_num":657}
            //log.b 2: ESLP2pResponse: {"channel":0,"command_type":1950,"payload":"w36zICk5a8pXZ8I6L4ldeI6ZQPWmbEEVZHctBfW0Zx0\u003d","payloadLen":30,"sn":"T8520Q2021340AD6"}
            //log.b 2: payload full:{"code":0,"passwordId":"0008"} payloadLength:30
            const nestedPayload = {
                endDay: schedule !== undefined && schedule.endDateTime !== undefined ? (0, utils_1.hexDate)(schedule.endDateTime) : "ffffffff",
                endTime: schedule !== undefined && schedule.endDateTime !== undefined ? (0, utils_1.hexTime)(schedule.endDateTime) : "ffff",
                passcode: (0, utils_1.encodePasscode)(passcode),
                startDay: schedule !== undefined && schedule.startDateTime !== undefined ? (0, utils_1.hexDate)(schedule.startDateTime) : "00000000",
                startTime: schedule !== undefined && schedule.startDateTime !== undefined ? (0, utils_1.hexTime)(schedule.startDateTime) : "0000",
                userId: shortUserId,
                week: schedule !== undefined && schedule.week !== undefined ? (0, utils_1.hexWeek)(schedule) : "ff",
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_ADD_PW, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_ADD_PW, command.aesKey);
            this.log.debug("Add user...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.ADD_PW, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdAddUser(shortUserId, (0, utils_1.encodePasscode)(passcode), username, schedule));
            this.log.debug("Add user...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command });
            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async deleteUser(device, username, shortUserId) {
        const commandData = {
            name: types_1.CommandName.DeviceDeleteUser,
            value: {
                username: username,
                shortUserId: shortUserId,
            }
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceDeleteUser)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending delete user command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                userId: shortUserId,
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_DELETE_USER, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_DELETE_USER, command.aesKey);
            this.log.debug("Delete user...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.DELETE_USER, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdDeleteUser(shortUserId));
            this.log.debug("Delete user...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command });
            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async updateUserSchedule(device, username, shortUserId, schedule) {
        const commandData = {
            name: types_1.CommandName.DeviceUpdateUserSchedule,
            value: {
                username: username,
                shortUserId: shortUserId,
                schedule: schedule
            }
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceUpdateUserSchedule)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending update user schedule command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                endDay: schedule !== undefined && schedule.endDateTime !== undefined ? (0, utils_1.hexDate)(schedule.endDateTime) : "ffffffff",
                endTime: schedule !== undefined && schedule.endDateTime !== undefined ? (0, utils_1.hexTime)(schedule.endDateTime) : "ffff",
                startDay: schedule !== undefined && schedule.startDateTime !== undefined ? (0, utils_1.hexDate)(schedule.startDateTime) : "00000000",
                startTime: schedule !== undefined && schedule.startDateTime !== undefined ? (0, utils_1.hexTime)(schedule.startDateTime) : "0000",
                userId: shortUserId,
                week: schedule !== undefined && schedule.week !== undefined ? (0, utils_1.hexWeek)(schedule) : "ff",
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_UPDATE_USER_TIME, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_UPDATE_USER_TIME, command.aesKey);
            this.log.debug("Update user time...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.UPDATE_USER_TIME, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdUpdateSchedule(shortUserId, schedule));
            this.log.debug("Update user time...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command });
            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async updateUserPasscode(device, username, shortUserId, passcode) {
        const commandData = {
            name: types_1.CommandName.DeviceUpdateUserPasscode,
            value: {
                username: username,
                shortUserId: shortUserId,
                passcode: passcode
            }
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(types_1.CommandName.DeviceUpdateUserPasscode)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        if (passcode.length < 4 || passcode.length > 8 || !/^\d+$/.test(passcode)) {
            throw new error_1.InvalidCommandValueError(`Passcode should contain only numbers and be between 4 and 8 long`);
        }
        this.log.debug(`Sending update user passcode command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                passcode: (0, utils_1.encodePasscode)(passcode),
                passwordId: shortUserId,
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_UPDATE_PW, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_UPDATE_PW, command.aesKey);
            this.log.debug("Update user time...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            const command = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.UPDATE_PW, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdModifyPassword(shortUserId, (0, utils_1.encodePasscode)(passcode)));
            this.log.debug("Update user time...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command });
            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setLockV12Params(device, property, value) {
        const propertyData = {
            name: property,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        const propertyMetadata = device.getPropertyMetadata(propertyData.name);
        (0, utils_3.validValue)(propertyMetadata, value);
        this.log.debug(`Sending set lock v12 settings command to station ${this.getSerial()} for device ${device.getSerial()} property ${property}`);
        if (device.isLockWifiR10() || device.isLockWifiR20()) {
            let payload;
            switch (property) {
                case types_1.PropertyName.DeviceWrongTryProtection:
                    payload = device_1.Lock.encodeCmdSetLockParamWrongTryProtect(value, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryAttempts), device.getPropertyValue(types_1.PropertyName.DeviceWrongTryLockdownTime));
                    break;
                case types_1.PropertyName.DeviceWrongTryAttempts:
                    payload = device_1.Lock.encodeCmdSetLockParamWrongTryProtect(device.getPropertyValue(types_1.PropertyName.DeviceWrongTryProtection), value, device.getPropertyValue(types_1.PropertyName.DeviceWrongTryLockdownTime));
                    break;
                case types_1.PropertyName.DeviceWrongTryLockdownTime:
                    payload = device_1.Lock.encodeCmdSetLockParamWrongTryProtect(device.getPropertyValue(types_1.PropertyName.DeviceWrongTryProtection), device.getPropertyValue(types_1.PropertyName.DeviceWrongTryAttempts), value);
                    break;
                case types_1.PropertyName.DeviceAutoLock:
                    payload = device_1.Lock.encodeCmdSetLockParamAutoLock(value, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockTimer));
                    break;
                case types_1.PropertyName.DeviceAutoLockTimer:
                    payload = device_1.Lock.encodeCmdSetLockParamAutoLock(device.getPropertyValue(types_1.PropertyName.DeviceAutoLock), value);
                    break;
                case types_1.PropertyName.DeviceAutoLockSchedule:
                    payload = device_1.Lock.encodeCmdSetLockParamAutoLockSchedule(value, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleStartTime), device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleEndTime));
                    break;
                case types_1.PropertyName.DeviceAutoLockScheduleStartTime:
                    payload = device_1.Lock.encodeCmdSetLockParamAutoLockSchedule(device.getPropertyValue(types_1.PropertyName.DeviceAutoLockSchedule), value, device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleEndTime));
                    break;
                case types_1.PropertyName.DeviceAutoLockScheduleEndTime:
                    payload = device_1.Lock.encodeCmdSetLockParamAutoLockSchedule(device.getPropertyValue(types_1.PropertyName.DeviceAutoLockSchedule), device.getPropertyValue(types_1.PropertyName.DeviceAutoLockScheduleStartTime), value);
                    break;
                case types_1.PropertyName.DeviceOneTouchLocking:
                    payload = device_1.Lock.encodeCmdSetLockParamOneTouchLock(value);
                    break;
                case types_1.PropertyName.DeviceScramblePasscode:
                    payload = device_1.Lock.encodeCmdSetLockParamScramblePasscode(value);
                    break;
                case types_1.PropertyName.DeviceSound:
                    payload = device_1.Lock.encodeCmdSetLockParamSound(value);
                    break;
                default:
                    payload = Buffer.from([]);
                    break;
            }
            this.log.debug(`device: ${device.getSerial()} property: ${property} value: ${value} payload: ${payload.toString("hex")}`);
            const lockCommand = (0, utils_2.getLockV12P2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.ESLCommand.SET_LOCK_PARAM, device.getChannel(), this.lockPublicKey, this.p2pSession.incLockSequenceNumber(), device_1.Lock.encodeCmdStatus(this.rawStation.member.admin_user_id));
            await this._sendLockV12P2PCommand(lockCommand, {
                property: propertyData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoLock(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoLock,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending auto lock command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceAutoLock, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceAutoLock, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoLockSchedule(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoLockSchedule,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending auto lock schedule command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceAutoLockSchedule, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceAutoLockSchedule, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoLockScheduleStartTime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoLockScheduleStartTime,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending auto lock schedule start time command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceAutoLockScheduleStartTime, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceAutoLockScheduleStartTime, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoLockScheduleEndTime(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoLockScheduleEndTime,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending auto lock schedule end time command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceAutoLockScheduleEndTime, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceAutoLockScheduleEndTime, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setAutoLockTimer(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceAutoLockTimer,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending auto lock timer command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceAutoLockTimer, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceAutoLockTimer, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setOneTouchLocking(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceOneTouchLocking,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending one touch locking command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceOneTouchLocking, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceOneTouchLocking, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setSound(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceSound,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending sound command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceSound, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            await this.setLockV12Params(device, types_1.PropertyName.DeviceSound, value);
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotification(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotification,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending notification command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceNotification, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            //TODO: Implmenet LockWifiR10 / LockWifiR20 commnand
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationLocked(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationLocked,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending notification locked command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceNotificationLocked, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            //TODO: Implmenet LockWifiR10 / LockWifiR20 commnand
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async setNotificationUnlocked(device, value) {
        const propertyData = {
            name: types_1.PropertyName.DeviceNotificationUnlocked,
            value: value
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasProperty(propertyData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending notification unlocked command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            await this.setAdvancedLockParams(device, types_1.PropertyName.DeviceNotificationUnlocked, value);
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            //TODO: Implmenet LockWifiR10 / LockWifiR20 commnand
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async _sendLockV12P2PCommand(command, customData) {
        this.p2pSession.setLockAESKey(command.bleCommand, command.aesKey);
        await this.p2pSession.sendCommandWithStringPayload(command.payload, customData);
    }
    async queryAllUserId(device) {
        const commandData = {
            name: types_1.CommandName.DeviceQueryAllUserId
        };
        if (device.getStationSerial() !== this.getSerial()) {
            throw new error_1.WrongStationError(`Device ${device.getSerial()} is not managed by this station ${this.getSerial()}`);
        }
        if (!device.hasCommand(commandData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
        this.log.debug(`Sending query all user id command to station ${this.getSerial()} for device ${device.getSerial()}`);
        if (device.isLockBleNoFinger() || device.isLockBle()) {
            //TODO: Finish implementation of query all user id for LockBleNoFinger / LockBle
            /*const key = generateBasicLockAESKey(this.rawStation.member.admin_user_id, this.getSerial());
            const iv = getLockVectorBytes(this.getSerial());
            const lockCmd = Lock.encodeESLCmdOnOff(Number.parseInt(this.rawStation.member.short_user_id), this.rawStation.member.nick_name, value);
            const payload: ESLStationP2PThroughData = {
                channel: device.getChannel(),
                lock_cmd: ESLBleCommand.ON_OFF_LOCK,
                lock_payload: lockCmd.toString("base64"),
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const encPayload = encryptLockAESData(key, iv, encodeLockPayload(JSON.stringify(payload)));

            this.log.debug("Locking/unlocking device...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: payload, encPayload: encPayload.toString("hex") });

            await this.p2pSession.sendCommandWithStringPayload({
                commandType: CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": CommandType.CMD_DOORLOCK_DATA_PASS_THROUGH,
                    "mValue3": 0,
                    "payload": {
                        "payload": encPayload.toString("base64")
                    }
                }),
                channel: device.getChannel()
            }, {
                property: propertyData
            });*/
        }
        else if (device.isLockWifi() || device.isLockWifiNoFinger()) {
            const nestedPayload = {
                seq_num: this.p2pSession.incLockSequenceNumber()
            };
            const command = (0, utils_2.getLockP2PCommand)(this.rawStation.station_sn, this.rawStation.member.admin_user_id, types_2.CommandType.P2P_GET_USER_AND_PW_ID, device.getChannel(), this.lockPublicKey, nestedPayload);
            this.p2pSession.setLockAESKey(types_2.CommandType.P2P_GET_USER_AND_PW_ID, command.aesKey);
            this.log.debug("Querying all user id...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command, nestedPayload: nestedPayload });
            await this.p2pSession.sendCommandWithStringPayload(command, {
                command: commandData
            });
        }
        else if (device.isLockWifiR10() || device.isLockWifiR20()) {
            //TODO: Finish implementation of query all user id for r10 / r20
            /*const command = getLockV12P2PCommand(
                this.rawStation.station_sn,
                this.rawStation.member.admin_user_id,
                ESLCommand.GET_USER_ID_AND_PW_ID,
                device.getChannel(),
                this.lockPublicKey,
                this.p2pSession.incLockSequenceNumber(),
                Lock.encodeCmd(this.rawStation.member.short_user_id, value === true ? 1 : 0, this.rawStation.member.nick_name)
            );
            this.log.debug("Querying all user id...", { station: this.getSerial(), device: device.getSerial(), admin_user_id: this.rawStation.member.admin_user_id, payload: command.payload });

            await this._sendLockV12P2PCommand(command, {
                command: commandData
            });*/
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${device.getSerial()}`);
        }
    }
    async chimeHomebase(value) {
        const commandData = {
            name: types_1.CommandName.StationChime,
            value: value
        };
        if (!this.hasCommand(commandData.name)) {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
        if (this.rawStation.devices !== undefined) {
            this.rawStation.devices.forEach((device) => {
                if (device_1.Device.isDoorbell(device.device_type)) {
                    throw new error_1.NotSupportedError(`This functionality is only supported on stations without registered Doorbells on it (${this.getSerial()})`);
                }
            });
        }
        this.log.debug(`Sending homebase chime command to station ${this.getSerial()} with value: ${value}`);
        if (this.isStation()) {
            await this.p2pSession.sendCommandWithStringPayload({
                commandType: types_2.CommandType.CMD_SET_PAYLOAD,
                value: JSON.stringify({
                    "account_id": this.rawStation.member.admin_user_id,
                    "cmd": types_2.CommandType.CMD_BAT_DOORBELL_DINGDONG_R,
                    "mValue3": 0,
                    "payload": {
                        "dingdong_ringtone": value,
                    }
                }),
                channel: 0
            }, {
                command: commandData
            });
        }
        else {
            throw new error_1.NotSupportedError(`This functionality is not implemented or supported by ${this.getSerial()}`);
        }
    }
}
exports.Station = Station;
Station.CHANNEL = 255;
Station.CHANNEL_INDOOR = 1000;
//# sourceMappingURL=station.js.map