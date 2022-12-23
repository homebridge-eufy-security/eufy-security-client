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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationService = void 0;
const got_1 = __importDefault(require("got"));
const qs = __importStar(require("qs"));
const ts_log_1 = require("ts-log");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const utils_1 = require("./utils");
const client_1 = require("./client");
const device_1 = require("../http/device");
const types_1 = require("../http/types");
const utils_2 = require("../http/utils");
const utils_3 = require("../utils");
class PushNotificationService extends tiny_typed_emitter_1.TypedEmitter {
    constructor(log = ts_log_1.dummyLogger) {
        super();
        this.APP_PACKAGE = "com.oceanwing.battery.cam";
        this.APP_ID = "1:348804314802:android:440a6773b3620da7";
        this.APP_SENDER_ID = "348804314802";
        this.APP_CERT_SHA1 = "F051262F9F99B638F3C76DE349830638555B4A0A";
        this.FCM_PROJECT_ID = "batterycam-3250a";
        this.GOOGLE_API_KEY = "AIzaSyCSz1uxGrHXsEktm7O3_wv-uLGpC9BvXR8";
        this.AUTH_VERSION = "FIS_v2";
        this.retryDelay = 0;
        this.persistentIds = [];
        this.connected = false;
        this.connecting = false;
        this.log = log;
    }
    buildExpiresAt(expiresIn) {
        if (expiresIn.endsWith("ms")) {
            return new Date().getTime() + Number.parseInt(expiresIn.substring(0, expiresIn.length - 2));
        }
        else if (expiresIn.endsWith("s")) {
            return new Date().getTime() + Number.parseInt(expiresIn.substring(0, expiresIn.length - 1)) * 1000;
        }
        throw new Error(`Unknown expiresIn-format: ${expiresIn}`);
    }
    async registerFid(fid) {
        const url = `https://firebaseinstallations.googleapis.com/v1/projects/${this.FCM_PROJECT_ID}/installations`;
        try {
            const response = await (0, got_1.default)(url, {
                method: "post",
                json: {
                    fid: fid,
                    appId: `${this.APP_ID}`,
                    authVersion: `${this.AUTH_VERSION}`,
                    sdkVersion: "a:16.3.1",
                },
                headers: {
                    "X-Android-Package": `${this.APP_PACKAGE}`,
                    "X-Android-Cert": `${this.APP_CERT_SHA1}`,
                    "x-goog-api-key": `${this.GOOGLE_API_KEY}`,
                },
                responseType: "json",
                http2: false,
                throwHttpErrors: false,
                retry: {
                    limit: 3,
                    methods: ["POST"]
                }
            }).catch(error => {
                this.log.error("registerFid - Error:", error);
                return error;
            });
            if (response.statusCode == 200) {
                const result = response.body;
                return {
                    ...result,
                    authToken: {
                        ...result.authToken,
                        expiresAt: this.buildExpiresAt(result.authToken.expiresIn),
                    },
                };
            }
            else {
                this.log.error("registerFid - Status return code not 200", { status: response.statusCode, statusText: response.statusMessage, data: response.body });
                throw new Error(`FID registration failed with error: ${response.statusMessage}`);
            }
        }
        catch (error) {
            this.log.error("registerFid - Generic Error:", error);
            throw new Error(`FID registration failed with error: ${error}`);
        }
    }
    async renewFidToken(fid, refreshToken) {
        const url = `https://firebaseinstallations.googleapis.com/v1/projects/${this.FCM_PROJECT_ID}/installations/${fid}/authTokens:generate`;
        try {
            const response = await (0, got_1.default)(url, {
                method: "post",
                json: {
                    installation: {
                        appId: `${this.APP_ID}`,
                        sdkVersion: "a:16.3.1",
                    }
                },
                headers: {
                    "X-Android-Package": `${this.APP_PACKAGE}`,
                    "X-Android-Cert": `${this.APP_CERT_SHA1}`,
                    "x-goog-api-key": `${this.GOOGLE_API_KEY}`,
                    Authorization: `${this.AUTH_VERSION} ${refreshToken}`
                },
                responseType: "json",
                http2: false,
                throwHttpErrors: false,
                retry: {
                    limit: 3,
                    methods: ["POST"]
                }
            }).catch(error => {
                this.log.error("renewFidToken - Error:", error);
                return error;
            });
            if (response.statusCode == 200) {
                const result = response.body;
                return {
                    ...result,
                    expiresAt: this.buildExpiresAt(result.expiresIn),
                };
            }
            else {
                this.log.error("renewFidToken - Status return code not 200", { status: response.statusCode, statusText: response.statusMessage, data: response.body });
                throw new Error(`FID Token renewal failed with error: ${response.statusMessage}`);
            }
        }
        catch (error) {
            this.log.error("renewFidToken - Generic Error:", error);
            throw new Error(`FID Token renewal failed with error: ${error}`);
        }
    }
    async createPushCredentials() {
        const generatedFid = (0, utils_1.generateFid)();
        return await this.registerFid(generatedFid)
            .then(async (registerFidResponse) => {
            const checkinResponse = await this.executeCheckin();
            return {
                fidResponse: registerFidResponse,
                checkinResponse: checkinResponse
            };
        })
            .then(async (result) => {
            const registerGcmResponse = await this.registerGcm(result.fidResponse, result.checkinResponse);
            return {
                ...result,
                gcmResponse: registerGcmResponse,
            };
        }).catch((error) => {
            throw error;
        });
    }
    async renewPushCredentials(credentials) {
        return await this.renewFidToken(credentials.fidResponse.fid, credentials.fidResponse.refreshToken)
            .then(async (response) => {
            credentials.fidResponse.authToken = response;
            return await this.executeCheckin();
        })
            .then(async (response) => {
            const registerGcmResponse = await this.registerGcm(credentials.fidResponse, response);
            return {
                fidResponse: credentials.fidResponse,
                checkinResponse: response,
                gcmResponse: registerGcmResponse,
            };
        })
            .catch(() => {
            return this.createPushCredentials();
        });
    }
    async loginPushCredentials(credentials) {
        return await this.executeCheckin()
            .then(async (response) => {
            const registerGcmResponse = await this.registerGcm(credentials.fidResponse, response);
            return {
                fidResponse: credentials.fidResponse,
                checkinResponse: response,
                gcmResponse: registerGcmResponse,
            };
        })
            .catch(() => {
            return this.createPushCredentials();
        });
    }
    async executeCheckin() {
        const url = "https://android.clients.google.com/checkin";
        try {
            const buffer = await (0, utils_1.buildCheckinRequest)();
            const response = await (0, got_1.default)(url, {
                method: "post",
                body: Buffer.from(buffer),
                headers: {
                    "Content-Type": "application/x-protobuf",
                },
                responseType: "buffer",
                http2: false,
                throwHttpErrors: false,
                retry: {
                    limit: 3,
                    methods: ["POST"]
                }
            }).catch(error => {
                this.log.error("executeCheckin - Error:", error);
                return error;
            });
            if (response.statusCode == 200) {
                return await (0, utils_1.parseCheckinResponse)(response.body);
            }
            else {
                this.log.error("executeCheckin - Status return code not 200", { status: response.statusCode, statusText: response.statusMessage, data: response.body });
                throw new Error(`Google checkin failed with error: ${response.statusMessage}`);
            }
        }
        catch (error) {
            this.log.error("executeCheckin - Generic Error:", error);
            throw new Error(`Google checkin failed with error: ${error}`);
        }
    }
    async registerGcm(fidInstallationResponse, checkinResponse) {
        const url = "https://android.clients.google.com/c2dm/register3";
        const androidId = checkinResponse.androidId;
        const fid = fidInstallationResponse.fid;
        const securityToken = checkinResponse.securityToken;
        const retry = 5;
        try {
            for (let retry_count = 1; retry_count <= retry; retry_count++) {
                const response = await (0, got_1.default)(url, {
                    method: "post",
                    body: qs.stringify({
                        "X-subtype": `${this.APP_SENDER_ID}`,
                        sender: `${this.APP_SENDER_ID}`,
                        "X-app_ver": "741",
                        "X-osv": "25",
                        "X-cliv": "fiid-20.2.0",
                        "X-gmsv": "201216023",
                        "X-appid": `${fid}`,
                        "X-scope": "*",
                        "X-Goog-Firebase-Installations-Auth": `${fidInstallationResponse.authToken.token}`,
                        "X-gmp_app_id": `${this.APP_ID}`,
                        "X-Firebase-Client": "fire-abt/17.1.1+fire-installations/16.3.1+fire-android/+fire-analytics/17.4.2+fire-iid/20.2.0+fire-rc/17.0.0+fire-fcm/20.2.0+fire-cls/17.0.0+fire-cls-ndk/17.0.0+fire-core/19.3.0",
                        "X-firebase-app-name-hash": "R1dAH9Ui7M-ynoznwBdw01tLxhI",
                        "X-Firebase-Client-Log-Type": "1",
                        "X-app_ver_name": "v2.2.2_741",
                        app: `${this.APP_PACKAGE}`,
                        device: `${androidId}`,
                        app_ver: "741",
                        info: "g3EMJXXElLwaQEb1aBJ6XhxiHjPTUxc",
                        gcm_ver: "201216023",
                        plat: "0",
                        cert: `${this.APP_CERT_SHA1}`,
                        target_ver: "28",
                    }),
                    headers: {
                        Authorization: `AidLogin ${androidId}:${securityToken}`,
                        app: `${this.APP_PACKAGE}`,
                        gcm_ver: "201216023",
                        "User-Agent": "Android-GCM/1.5 (OnePlus5 NMF26X)",
                        "content-type": "application/x-www-form-urlencoded",
                    },
                    http2: false,
                    throwHttpErrors: false,
                    retry: {
                        limit: 3,
                        methods: ["POST"]
                    }
                }).catch(error => {
                    this.log.error("registerGcm - Error:", error);
                    return error;
                });
                if (response.statusCode == 200) {
                    const result = response.body.split("=");
                    if (result[0] == "Error") {
                        this.log.debug("GCM register error, retry...", { retry: retry, retryCount: retry_count });
                        if (retry_count == retry)
                            throw new Error(`GCM-Register Error: ${result[1]}`);
                    }
                    else {
                        return {
                            token: result[1]
                        };
                    }
                }
                else {
                    this.log.error("registerGcm - Status return code not 200", { status: response.statusCode, statusText: response.statusMessage, data: response.body });
                    throw new Error(`Google register to GCM failed with error: ${response.statusMessage}`);
                }
                await (0, utils_1.sleep)(10000 * retry_count);
            }
            throw new Error(`GCM-Register Error: Undefined!`);
        }
        catch (error) {
            this.log.error("registerGcm - Generic Error:", error);
            throw new Error(`Google register to GCM failed with error: ${error}`);
        }
    }
    _normalizePushMessage(message) {
        const normalized_message = {
            name: "",
            event_time: 0,
            type: -1,
            station_sn: "",
            device_sn: ""
        };
        if (message.payload.payload) {
            // CusPush
            normalized_message.type = Number.parseInt(message.payload.type);
            try {
                normalized_message.event_time = message.payload.event_time !== undefined ? (0, utils_1.convertTimestampMs)(Number.parseInt(message.payload.event_time)) : Number.parseInt(message.payload.event_time);
            }
            catch (error) {
                this.log.error(`Type ${types_1.DeviceType[normalized_message.type]} CusPush - event_time - Error:`, error);
            }
            normalized_message.station_sn = message.payload.station_sn;
            if (normalized_message.type === types_1.DeviceType.FLOODLIGHT)
                normalized_message.device_sn = message.payload.station_sn;
            else
                normalized_message.device_sn = message.payload.device_sn;
            if ((0, utils_3.isEmpty)(normalized_message.device_sn) && !(0, utils_3.isEmpty)(normalized_message.station_sn)) {
                normalized_message.device_sn = normalized_message.station_sn;
            }
            normalized_message.title = message.payload.title;
            normalized_message.content = message.payload.content;
            try {
                normalized_message.push_time = message.payload.push_time !== undefined ? (0, utils_1.convertTimestampMs)(Number.parseInt(message.payload.push_time)) : Number.parseInt(message.payload.push_time);
            }
            catch (error) {
                this.log.error(`Type ${types_1.DeviceType[normalized_message.type]} CusPush - push_time - Error:`, error);
            }
            if (normalized_message.station_sn.startsWith("T8030") || normalized_message.type === types_1.DeviceType.HB3) {
                const push_data = message.payload.payload;
                normalized_message.name = push_data.name ? push_data.name : "";
                normalized_message.channel = push_data.channel !== undefined ? push_data.channel : 0;
                normalized_message.cipher = push_data.cipher !== undefined ? push_data.cipher : 0;
                normalized_message.event_session = push_data.session_id !== undefined ? push_data.session_id : "";
                normalized_message.event_type = push_data.a !== undefined ? push_data.a : push_data.event_type;
                normalized_message.file_path = push_data.file_path !== undefined ? push_data.file_path : "";
                normalized_message.pic_url = push_data.pic_url !== undefined ? push_data.pic_url : "";
                normalized_message.push_count = push_data.push_count !== undefined ? push_data.push_count : 1;
                normalized_message.notification_style = push_data.notification_style;
                normalized_message.storage_type = push_data.storage_type !== undefined ? push_data.storage_type : 1;
                normalized_message.msg_type = push_data.msg_type;
                normalized_message.person_name = push_data.nick_name;
                normalized_message.person_id = push_data.person_id;
                normalized_message.tfcard_status = push_data.tfcard_status;
                normalized_message.user_type = push_data.user;
                normalized_message.user_name = push_data.user_name;
                normalized_message.station_guard_mode = push_data.arming;
                normalized_message.station_current_mode = push_data.mode;
                normalized_message.alarm_delay = push_data.alarm_delay;
                normalized_message.sound_alarm = push_data.alarm !== undefined ? push_data.alarm === 1 ? true : false : undefined;
            }
            else {
                if (device_1.Device.isBatteryDoorbell(normalized_message.type) || device_1.Device.isWiredDoorbellDual(normalized_message.type)) {
                    const push_data = message.payload.payload;
                    normalized_message.name = push_data.name ? push_data.name : "";
                    //Get family face names from Doorbell Dual "Family Recognition" event
                    if (push_data.objects !== undefined) {
                        normalized_message.person_name = push_data.objects.names !== undefined ? push_data.objects.names.join(",") : "";
                    }
                    normalized_message.channel = push_data.channel !== undefined ? push_data.channel : 0;
                    normalized_message.cipher = push_data.cipher !== undefined ? push_data.cipher : 0;
                    normalized_message.event_session = push_data.session_id !== undefined ? push_data.session_id : "";
                    normalized_message.event_type = push_data.event_type;
                    normalized_message.file_path = push_data.file_path !== undefined && push_data.file_path !== "" && push_data.channel !== undefined ? (0, utils_2.getAbsoluteFilePath)(normalized_message.type, push_data.channel, push_data.file_path) : "";
                    normalized_message.pic_url = push_data.pic_url !== undefined ? push_data.pic_url : "";
                    normalized_message.push_count = push_data.push_count !== undefined ? push_data.push_count : 1;
                    normalized_message.notification_style = push_data.notification_style;
                }
                else if (device_1.Device.isIndoorCamera(normalized_message.type) ||
                    device_1.Device.isSoloCameras(normalized_message.type) ||
                    device_1.Device.isFloodLightT8420X(normalized_message.type, normalized_message.device_sn) ||
                    (device_1.Device.isFloodLight(normalized_message.type) && normalized_message.type !== types_1.DeviceType.FLOODLIGHT)) {
                    const push_data = message.payload.payload;
                    normalized_message.name = push_data.name ? push_data.name : "";
                    normalized_message.channel = push_data.channel;
                    normalized_message.cipher = push_data.cipher;
                    normalized_message.event_session = push_data.session_id;
                    normalized_message.event_type = push_data.event_type;
                    //normalized_message.file_path = push_data.file_path !== undefined && push_data.file_path !== "" && push_data.channel !== undefined ? getAbsoluteFilePath(normalized_message.type, push_data.channel, push_data.file_path) : "";
                    normalized_message.file_path = push_data.file_path;
                    normalized_message.pic_url = push_data.pic_url !== undefined ? push_data.pic_url : "";
                    normalized_message.push_count = push_data.push_count !== undefined ? push_data.push_count : 1;
                    normalized_message.notification_style = push_data.notification_style;
                    normalized_message.msg_type = push_data.msg_type;
                    normalized_message.timeout = push_data.timeout;
                    normalized_message.tfcard_status = push_data.tfcard_status;
                    normalized_message.storage_type = push_data.storage_type !== undefined ? push_data.storage_type : 1;
                    normalized_message.unique_id = push_data.unique_id;
                }
                else if (device_1.Device.isSmartSafe(normalized_message.type)) {
                    const push_data = message.payload.payload;
                    normalized_message.event_type = push_data.event_type;
                    normalized_message.event_value = push_data.event_value;
                    /*
                    event_value: {
                        type: 3,    3/4
                        action: 1,
                        figure_id: 0,
                        user_id: 0
                    }
                    */
                    normalized_message.name = push_data.dev_name !== undefined ? push_data.dev_name : "";
                    /*normalized_message.short_user_id = push_data.short_user_id !== undefined ? push_data.short_user_id : "";
                    normalized_message.user_id = push_data.user_id !== undefined ? push_data.user_id : "";*/
                }
                else if (device_1.Device.isLock(normalized_message.type)) {
                    const push_data = message.payload.payload;
                    normalized_message.event_type = push_data.event_type;
                    normalized_message.short_user_id = push_data.short_user_id !== undefined ? push_data.short_user_id : "";
                    normalized_message.user_id = push_data.user_id !== undefined ? push_data.user_id : "";
                    normalized_message.name = push_data.device_name !== undefined ? push_data.device_name : "";
                }
                else {
                    const push_data = message.payload.payload;
                    normalized_message.name = push_data.device_name && push_data.device_name !== null && push_data.device_name !== "" ? push_data.device_name : push_data.n ? push_data.n : "";
                    normalized_message.channel = push_data.c;
                    normalized_message.cipher = push_data.k;
                    normalized_message.event_session = push_data.session_id;
                    normalized_message.event_type = push_data.a;
                    normalized_message.file_path = push_data.c !== undefined && push_data.p !== undefined && push_data.p !== "" ? (0, utils_2.getAbsoluteFilePath)(normalized_message.type, push_data.c, push_data.p) : "";
                    normalized_message.pic_url = push_data.pic_url !== undefined ? push_data.pic_url : "";
                    normalized_message.push_count = push_data.push_count !== undefined ? push_data.push_count : 1;
                    normalized_message.notification_style = push_data.notification_style;
                    normalized_message.tfcard_status = push_data.tfcard;
                    normalized_message.alarm_delay_type = push_data.alarm_type;
                    normalized_message.alarm_delay = push_data.alarm_delay;
                    normalized_message.alarm_type = push_data.type;
                    normalized_message.sound_alarm = push_data.alarm !== undefined ? push_data.alarm === 1 ? true : false : undefined;
                    normalized_message.user_name = push_data.user_name;
                    normalized_message.user_type = push_data.user;
                    normalized_message.user_id = push_data.user_id;
                    normalized_message.short_user_id = push_data.short_user_id;
                    normalized_message.station_guard_mode = push_data.arming;
                    normalized_message.station_current_mode = push_data.mode;
                    normalized_message.person_name = push_data.f;
                    normalized_message.sensor_open = push_data.e !== undefined ? push_data.e === "1" ? true : false : undefined;
                    normalized_message.device_online = push_data.m !== undefined ? push_data.m === 1 ? true : false : undefined;
                    try {
                        normalized_message.fetch_id = push_data.i !== undefined ? Number.parseInt(push_data.i) : undefined;
                    }
                    catch (error) {
                        this.log.error(`Type ${types_1.DeviceType[normalized_message.type]} CusPushData - fetch_id - Error:`, error);
                    }
                    normalized_message.sense_id = push_data.j;
                    normalized_message.battery_powered = push_data.batt_powered !== undefined ? push_data.batt_powered === 1 ? true : false : undefined;
                    try {
                        normalized_message.battery_low = push_data.bat_low !== undefined ? Number.parseInt(push_data.bat_low) : undefined;
                    }
                    catch (error) {
                        this.log.error(`Type ${types_1.DeviceType[normalized_message.type]} CusPushData - battery_low - Error:`, error);
                    }
                    normalized_message.storage_type = push_data.storage_type !== undefined ? push_data.storage_type : 1;
                    normalized_message.unique_id = push_data.unique_id;
                    normalized_message.automation_id = push_data.automation_id;
                    normalized_message.click_action = push_data.click_action;
                    normalized_message.news_id = push_data.news_id;
                }
            }
        }
        else if (message.payload.doorbell !== undefined) {
            const push_data = JSON.parse(message.payload.doorbell);
            normalized_message.name = "Doorbell";
            normalized_message.type = 5;
            normalized_message.event_time = push_data.create_time !== undefined ? (0, utils_1.convertTimestampMs)(push_data.create_time) : push_data.create_time;
            normalized_message.station_sn = push_data.device_sn;
            normalized_message.device_sn = push_data.device_sn;
            normalized_message.title = push_data.title;
            normalized_message.content = push_data.content;
            normalized_message.push_time = push_data.event_time !== undefined ? (0, utils_1.convertTimestampMs)(push_data.event_time) : push_data.event_time;
            normalized_message.channel = push_data.channel;
            normalized_message.cipher = push_data.cipher;
            normalized_message.event_session = push_data.event_session;
            normalized_message.event_type = push_data.event_type;
            normalized_message.file_path = push_data.file_path;
            normalized_message.pic_url = push_data.pic_url;
            normalized_message.push_count = push_data.push_count !== undefined ? push_data.push_count : 1;
            normalized_message.doorbell_url = push_data.url;
            normalized_message.doorbell_url_ex = push_data.url_ex;
            normalized_message.doorbell_video_url = push_data.video_url;
        }
        return normalized_message;
    }
    onMessage(message) {
        this.log.debug("Raw push message received", message);
        this.emit("raw message", message);
        const normalized_message = this._normalizePushMessage(message);
        this.log.debug("Normalized push message received", normalized_message);
        this.emit("message", normalized_message);
    }
    getCurrentPushRetryDelay() {
        const delay = this.retryDelay == 0 ? 5000 : this.retryDelay;
        if (this.retryDelay < 60000)
            this.retryDelay += 10000;
        if (this.retryDelay >= 60000 && this.retryDelay < 600000)
            this.retryDelay += 60000;
        return delay;
    }
    setCredentials(credentials) {
        this.credentials = credentials;
    }
    getCredentials() {
        return this.credentials;
    }
    setPersistentIds(persistentIds) {
        this.persistentIds = persistentIds;
    }
    getPersistentIds() {
        return this.persistentIds;
    }
    async _open(renew = false) {
        if (!this.credentials || Object.keys(this.credentials).length === 0 || (this.credentials && this.credentials.fidResponse && new Date().getTime() >= this.credentials.fidResponse.authToken.expiresAt)) {
            this.log.debug(`Create new push credentials...`);
            this.credentials = await this.createPushCredentials().catch(error => {
                this.log.error("Create push credentials Error:", error);
                return undefined;
            });
        }
        else if (this.credentials && renew) {
            this.log.debug(`Renew push credentials...`);
            this.credentials = await this.renewPushCredentials(this.credentials).catch(error => {
                this.log.error("Push credentials renew Error:", error);
                return undefined;
            });
        }
        else {
            this.log.debug(`Login with previous push credentials...`, this.credentials);
            this.credentials = await this.loginPushCredentials(this.credentials).catch(error => {
                this.log.error("Push credentials login Error:", error);
                return undefined;
            });
        }
        if (this.credentials) {
            this.emit("credential", this.credentials);
            this.clearCredentialsTimeout();
            this.credentialsTimeout = setTimeout(async () => {
                this.log.info("Push notification token is expiring, renew it.");
                await this._open(true);
            }, this.credentials.fidResponse.authToken.expiresAt - new Date().getTime() - 60000);
            if (this.pushClient) {
                this.pushClient.removeAllListeners();
            }
            this.pushClient = await client_1.PushClient.init({
                androidId: this.credentials.checkinResponse.androidId,
                securityToken: this.credentials.checkinResponse.securityToken,
            }, this.log);
            if (this.persistentIds)
                this.pushClient.setPersistentIds(this.persistentIds);
            const token = this.credentials.gcmResponse.token;
            this.pushClient.on("connect", () => {
                this.emit("connect", token);
                this.connected = true;
                this.connecting = false;
            });
            this.pushClient.on("close", () => {
                this.emit("close");
                this.connected = false;
                this.connecting = false;
            });
            this.pushClient.on("message", (msg) => this.onMessage(msg));
            this.pushClient.connect();
        }
        else {
            this.emit("close");
            this.connected = false;
            this.connecting = false;
            this.log.error("Push notifications are disabled, because the registration failed!");
        }
    }
    async open() {
        if (!this.connecting && !this.connected) {
            this.connecting = true;
            await this._open().catch((error) => {
                this.log.error(`Got exception trying to initialize push notifications`, error);
            });
            if (!this.credentials) {
                this.clearRetryTimeout();
                const delay = this.getCurrentPushRetryDelay();
                this.log.info(`Retry to register/login for push notification in ${delay / 1000} seconds...`);
                this.retryTimeout = setTimeout(async () => {
                    this.log.info(`Retry to register/login for push notification`);
                    await this.open();
                }, delay);
            }
            else {
                this.resetRetryTimeout();
                this.emit("credential", this.credentials);
            }
        }
        return this.credentials;
    }
    close() {
        var _a;
        this.resetRetryTimeout();
        this.clearCredentialsTimeout();
        (_a = this.pushClient) === null || _a === void 0 ? void 0 : _a.close();
    }
    clearCredentialsTimeout() {
        if (this.credentialsTimeout) {
            clearTimeout(this.credentialsTimeout);
            this.credentialsTimeout = undefined;
        }
    }
    clearRetryTimeout() {
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = undefined;
        }
    }
    resetRetryTimeout() {
        this.clearRetryTimeout();
        this.retryDelay = 0;
    }
    isConnected() {
        return this.connected;
    }
}
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=service.js.map