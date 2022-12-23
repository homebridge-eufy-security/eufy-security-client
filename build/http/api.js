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
exports.HTTPApi = void 0;
const got_1 = __importStar(require("got"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const ts_log_1 = require("ts-log");
const i18n_iso_countries_1 = require("i18n-iso-countries");
const i18n_iso_languages_1 = require("@cospired/i18n-iso-languages");
const crypto_1 = require("crypto");
const schedule = __importStar(require("node-schedule"));
const p_throttle_1 = __importDefault(require("p-throttle"));
const types_1 = require("./types");
const parameter_1 = require("./parameter");
const utils_1 = require("./utils");
const error_1 = require("./../error");
const utils_2 = require("./../utils");
const error_2 = require("./error");
class HTTPApi extends tiny_typed_emitter_1.TypedEmitter {
    constructor(apiBase, country, username, password, log = ts_log_1.dummyLogger, persistentData) {
        super();
        this.SERVER_PUBLIC_KEY = "04c5c00c4f8d1197cc7c3167c52bf7acb054d722f0ef08dcd7e0883236e0d72a3868d9750cb47fa4619248f3d83f0f662671dadc6e2d31c2f41db0161651c7c076";
        this.ecdh = (0, crypto_1.createECDH)("prime256v1");
        this.token = null;
        this.tokenExpiration = null;
        this.connected = false;
        this.throttle = (0, p_throttle_1.default)({
            limit: 6,
            interval: 10000,
        });
        this.devices = {};
        this.hubs = {};
        this.houses = {};
        this.persistentData = {
            user_id: "",
            email: "",
            nick_name: "",
            device_public_keys: {},
            clientPrivateKey: "",
            serverPublicKey: ""
        };
        this.headers = {
            App_version: "v4.5.1_1523",
            Os_type: "android",
            Os_version: "31",
            Phone_model: "ONEPLUS A3003",
            Country: "DE",
            Language: "en",
            Openudid: "5e4621b0152c0d00",
            //uid: "",
            Net_type: "wifi",
            Mnc: "02",
            Mcc: "262",
            Sn: "75814221ee75",
            Model_type: "PHONE",
            Timezone: "GMT+01:00",
            "Cache-Control": "no-cache",
        };
        this.username = username;
        this.password = password;
        this.log = log;
        this.apiBase = apiBase;
        this.log.debug(`Loaded API_BASE: ${apiBase}`);
        this.headers.timezone = (0, utils_1.getTimezoneGMTString)();
        this.headers.country = country.toUpperCase();
        if (persistentData) {
            this.persistentData = persistentData;
        }
        if (this.persistentData.serverPublicKey === undefined || this.persistentData.serverPublicKey === "") {
            this.persistentData.serverPublicKey = this.SERVER_PUBLIC_KEY;
        }
        if (this.persistentData.clientPrivateKey === undefined || this.persistentData.clientPrivateKey === "") {
            this.ecdh.generateKeys();
            this.persistentData.clientPrivateKey = this.ecdh.getPrivateKey().toString("hex");
        }
        else {
            this.ecdh.setPrivateKey(Buffer.from(this.persistentData.clientPrivateKey, "hex"));
        }
        this.requestEufyCloud = got_1.default.extend({
            prefixUrl: this.apiBase,
            headers: this.headers,
            responseType: "json",
            //throwHttpErrors: false,
            retry: {
                limit: 3,
                methods: ["GET", "POST"],
                statusCodes: [
                    408,
                    413,
                    423,
                    429,
                    500,
                    502,
                    503,
                    504,
                    521,
                    522,
                    524
                ],
                calculateDelay: ({ computedValue }) => {
                    return computedValue * 3;
                }
            },
            hooks: {
                afterResponse: [
                    async (response, retryWithMergedOptions) => {
                        // Unauthorized
                        if (response.statusCode === 401) {
                            const oldToken = this.token;
                            this.log.debug("Invalidate token an get a new one...", { requestUrl: response.requestUrl, statusCode: response.statusCode, statusMessage: response.statusMessage });
                            this.invalidateToken();
                            await this.login({ force: true });
                            if (oldToken !== this.token && this.token) {
                                // Refresh the access token
                                const updatedOptions = {
                                    headers: {
                                        "X-Auth-Token": this.token
                                    }
                                };
                                // Update the defaults
                                this.requestEufyCloud.defaults.options = this.requestEufyCloud.mergeOptions(this.requestEufyCloud.defaults.options, updatedOptions);
                                // Make a new retry
                                return retryWithMergedOptions(updatedOptions);
                            }
                        }
                        // No changes otherwise
                        return response;
                    }
                ],
                beforeRetry: [
                    (options, error, retryCount) => {
                        var _a;
                        // This will be called on `retryWithMergedOptions(...)`
                        this.log.debug(`Retrying [${retryCount}]: ${error === null || error === void 0 ? void 0 : error.code} (${(_a = error === null || error === void 0 ? void 0 : error.request) === null || _a === void 0 ? void 0 : _a.requestUrl})`, { options: options });
                        // Retrying [1]: ERR_NON_2XX_3XX_RESPONSE
                    }
                ],
                beforeError: [
                    error => {
                        var _a;
                        const { response } = error;
                        if (response && response.body) {
                            const result = response.body;
                            error.name = "EufyError";
                            error.message = `Code: ${result.code} Message: ${result.msg} (HTTP Code: ${response.statusCode})`;
                            this.log.error(`${error.name} - ${error.message} - requestUrl: ${(_a = error.request) === null || _a === void 0 ? void 0 : _a.requestUrl}`);
                        }
                        return error;
                    }
                ],
                beforeRequest: [
                    async (_options) => {
                        await this.throttle(async () => { return; })();
                    }
                ]
            },
            mutableDefaults: true
        });
    }
    static async getApiBaseFromCloud(country) {
        const response = await (0, got_1.default)(`domain/${country}`, {
            prefixUrl: this.apiDomainBase,
            method: "GET",
            responseType: "json",
            retry: {
                limit: 1,
                methods: ["GET"]
            }
        });
        const result = response.body;
        if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
            return `https://${result.data.domain}`;
        }
        throw new error_2.ApiBaseLoadError(result.code, result.msg);
    }
    static async initialize(country, username, password, log = ts_log_1.dummyLogger, persistentData) {
        if ((0, i18n_iso_countries_1.isValid)(country) && country.length === 2) {
            const apiBase = await this.getApiBaseFromCloud(country);
            return new HTTPApi(apiBase, country, username, password, log, persistentData);
        }
        throw new error_1.InvalidCountryCodeError("Invalid ISO 3166-1 Alpha-2 country code");
    }
    clearScheduleRenewAuthToken() {
        if (this.renewAuthTokenJob !== undefined) {
            this.renewAuthTokenJob.cancel();
        }
    }
    scheduleRenewAuthToken() {
        this.clearScheduleRenewAuthToken();
        if (this.tokenExpiration !== null) {
            const scheduleDate = new Date(this.tokenExpiration.getTime() - (1000 * 60 * 60 * 24));
            if (this.renewAuthTokenJob === undefined) {
                this.renewAuthTokenJob = schedule.scheduleJob("renewAuthToken", scheduleDate, async () => {
                    this.log.info("Authentication token is soon expiring, fetching a new one...");
                    await this.login({ force: true });
                });
            }
            else {
                this.renewAuthTokenJob.schedule(scheduleDate);
            }
        }
    }
    invalidateToken() {
        this.token = null;
        this.requestEufyCloud.defaults.options.headers["X-Auth-Token"] = undefined;
        this.tokenExpiration = null;
        this.clearScheduleRenewAuthToken();
        this.emit("auth token invalidated");
    }
    setPhoneModel(model) {
        this.headers.phone_model = model.toUpperCase();
        this.requestEufyCloud.defaults.options.headers = this.headers;
    }
    getPhoneModel() {
        return this.headers.phone_model;
    }
    getCountry() {
        return this.headers.country;
    }
    setLanguage(language) {
        if ((0, i18n_iso_languages_1.isValid)(language) && language.length === 2) {
            this.headers.language = language;
            this.requestEufyCloud.defaults.options.headers = this.headers;
        }
        else
            throw new error_1.InvalidLanguageCodeError("Invalid ISO 639 language code");
    }
    getLanguage() {
        return this.headers.language;
    }
    async login(options) {
        var _a;
        options = (0, utils_2.mergeDeep)(options, {
            force: false
        });
        this.log.debug("Login and get an access token", { token: this.token, tokenExpiration: this.tokenExpiration });
        if (!this.token || (this.tokenExpiration && (new Date()).getTime() >= this.tokenExpiration.getTime()) || options.verifyCode || options.captcha || options.force) {
            try {
                const data = {
                    ab: this.headers.country,
                    client_secret_info: {
                        public_key: this.ecdh.getPublicKey("hex")
                    },
                    enc: 0,
                    email: this.username,
                    password: (0, utils_1.encryptAPIData)(this.password, this.ecdh.computeSecret(Buffer.from(this.SERVER_PUBLIC_KEY, "hex"))),
                    time_zone: new Date().getTimezoneOffset() !== 0 ? -new Date().getTimezoneOffset() * 60 * 1000 : 0,
                    transaction: `${new Date().getTime()}`
                };
                if (options.verifyCode) {
                    data.verify_code = options.verifyCode;
                }
                else if (options.captcha) {
                    data.captcha_id = options.captcha.captchaId;
                    data.answer = options.captcha.captchaCode;
                }
                const response = await this.request({
                    method: "post",
                    endpoint: "v2/passport/login_sec",
                    data: data
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.data !== undefined) {
                        if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                            const dataresult = result.data;
                            this.persistentData.user_id = dataresult.user_id;
                            this.persistentData.email = dataresult.email;
                            this.persistentData.nick_name = dataresult.nick_name;
                            this.setToken(dataresult.auth_token);
                            this.tokenExpiration = new Date(dataresult.token_expires_at * 1000);
                            this.headers = {
                                ...this.headers,
                                gtoken: (0, utils_2.md5)(dataresult.user_id)
                            };
                            if ((_a = dataresult.server_secret_info) === null || _a === void 0 ? void 0 : _a.public_key)
                                this.persistentData.serverPublicKey = dataresult.server_secret_info.public_key;
                            this.log.debug("Token data", { token: this.token, tokenExpiration: this.tokenExpiration });
                            if (!this.connected) {
                                this.connected = true;
                                this.emit("connect");
                            }
                            this.scheduleRenewAuthToken();
                        }
                        else if (result.code == types_1.ResponseErrorCode.CODE_NEED_VERIFY_CODE) {
                            this.log.debug(`Send verification code...`);
                            const dataresult = result.data;
                            this.setToken(dataresult.auth_token);
                            this.tokenExpiration = new Date(dataresult.token_expires_at * 1000);
                            this.log.debug("Token data", { token: this.token, tokenExpiration: this.tokenExpiration });
                            await this.sendVerifyCode(types_1.VerfyCodeTypes.TYPE_EMAIL);
                            this.emit("tfa request");
                        }
                        else if (result.code == types_1.ResponseErrorCode.LOGIN_NEED_CAPTCHA || result.code == types_1.ResponseErrorCode.LOGIN_CAPTCHA_ERROR) {
                            const dataresult = result.data;
                            this.log.debug("Captcha verification received", { captchaId: dataresult.captcha_id, item: dataresult.item });
                            this.emit("captcha request", dataresult.captcha_id, dataresult.item);
                        }
                        else {
                            this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                            this.emit("connection error", new error_2.ApiResponseCodeError(`Response code not ok (${result.code}).`));
                        }
                    }
                    else {
                        this.log.error("Response data is missing", { code: result.code, msg: result.msg, data: result.data });
                        this.emit("connection error", new error_2.ApiInvalidResponseError("Response data is missing"));
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                    this.emit("connection error", new error_2.ApiHTTPResponseCodeError(`HTTP response code not ok (${response.status}).`));
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
                this.emit("connection error", new error_2.ApiGenericError(`Generic error: ${error}`));
            }
        }
        else if (!this.connected) {
            try {
                const profile = await this.getPassportProfile();
                if (profile !== null) {
                    this.connected = true;
                    this.emit("connect");
                    this.scheduleRenewAuthToken();
                }
                else {
                    this.emit("connection error", new error_2.ApiInvalidResponseError(`Invalid passport profile response`));
                }
            }
            catch (error) {
                this.log.error("getPassportProfile Error", error);
                this.emit("connection error", new error_2.ApiGenericError(`Get passport profile error: ${error}`));
            }
        }
    }
    async sendVerifyCode(type) {
        try {
            if (!type)
                type = types_1.VerfyCodeTypes.TYPE_EMAIL;
            const response = await this.request({
                method: "post",
                endpoint: "v1/sms/send/verify_code",
                data: {
                    message_type: type,
                    transaction: `${new Date().getTime()}`
                }
            });
            if (response.status == 200) {
                const result = response.data;
                if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                    this.log.info(`Requested verification code for 2FA`);
                    return true;
                }
                else {
                    this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                }
            }
            else {
                this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
            }
        }
        catch (error) {
            this.log.error("Generic Error:", error);
        }
        return false;
    }
    async listTrustDevice() {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "get",
                    endpoint: "v1/app/trust_device/list"
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data && result.data.list) {
                            return result.data.list;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return [];
    }
    async addTrustDevice(verifyCode) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/trust_device/add",
                    data: {
                        verify_code: verifyCode,
                        transaction: `${new Date().getTime()}`
                    }
                });
                this.log.debug("Response trust device:", response.data);
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        this.log.info(`2FA authentication successfully done. Device trusted.`);
                        const trusted_devices = await this.listTrustDevice();
                        trusted_devices.forEach((trusted_device) => {
                            if (trusted_device.is_current_device === 1) {
                                this.log.debug("This device is trusted. Token expiration extended:", { tokenExpiration: this.tokenExpiration });
                            }
                        });
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async getStationList() {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v2/house/station_list",
                    data: {
                        device_sn: "",
                        num: 1000,
                        orderby: "",
                        page: 0,
                        station_sn: "",
                        time_zone: new Date().getTimezoneOffset() !== 0 ? -new Date().getTimezoneOffset() * 60 * 1000 : 0,
                        transaction: `${new Date().getTime()}`
                    }
                });
                this.log.debug("Stations - Response:", response.data);
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        //TODO: Handle decryption exception resetting session auth information to reauthenticate
                        return this.decryptAPIData(result.data);
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Stations - Generic Error:", error);
            }
        }
        return [];
    }
    async getDeviceList() {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v2/house/device_list",
                    data: {
                        device_sn: "",
                        num: 1000,
                        orderby: "",
                        page: 0,
                        station_sn: "",
                        time_zone: new Date().getTimezoneOffset() !== 0 ? -new Date().getTimezoneOffset() * 60 * 1000 : 0,
                        transaction: `${new Date().getTime()}`
                    }
                });
                this.log.debug("Devices - Response:", response.data);
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        //TODO: Handle decryption exception resetting session auth information to reauthenticate
                        return this.decryptAPIData(result.data);
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Devices - Generic Error:", error);
            }
        }
        return [];
    }
    async refreshHouseData() {
        //Get Houses
        const houses = await this.getHouseList();
        if (houses && houses.length > 0) {
            houses.forEach(element => {
                this.log.debug(`Houses - element: ${JSON.stringify(element)}`);
                this.log.debug(`Houses - house name: ${element.house_name}`);
                this.houses[element.house_id] = element;
            });
            if (Object.keys(this.houses).length > 0)
                this.emit("houses", this.houses);
        }
        else {
            this.log.info("No houses found.");
        }
    }
    async refreshStationData() {
        //Get Stations
        const stations = await this.getStationList();
        if (stations && stations.length > 0) {
            stations.forEach(element => {
                this.log.debug(`Stations - element: ${JSON.stringify(element)}`);
                this.log.debug(`Stations - device_type: ${element.device_type}`);
                this.hubs[element.station_sn] = element;
            });
            if (Object.keys(this.hubs).length > 0)
                this.emit("hubs", this.hubs);
        }
        else {
            this.log.info("No stations found.");
        }
    }
    async refreshDeviceData() {
        //Get Devices
        const devices = await this.getDeviceList();
        if (devices && devices.length > 0) {
            devices.forEach(element => {
                this.devices[element.device_sn] = element;
            });
            if (Object.keys(this.devices).length > 0)
                this.emit("devices", this.devices);
        }
        else {
            this.log.info("No devices found.");
        }
    }
    async refreshAllData() {
        //Get the latest info
        //Get Houses
        await this.refreshHouseData();
        //Get Stations
        await this.refreshStationData();
        //Get Devices
        await this.refreshDeviceData();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async request(request) {
        this.log.debug("Request:", { method: request.method, endpoint: request.endpoint, token: this.token, data: request.data });
        try {
            const internalResponse = await this.requestEufyCloud(request.endpoint, {
                method: request.method,
                json: request.data,
            });
            const response = {
                status: internalResponse.statusCode,
                statusText: internalResponse.statusMessage ? internalResponse.statusMessage : "",
                headers: internalResponse.headers,
                data: internalResponse.body,
            };
            this.log.debug("Response:", { response: response.data });
            return response;
        }
        catch (error) {
            if (error instanceof got_1.HTTPError) {
                if (error.response.statusCode === 401) {
                    this.invalidateToken();
                    this.log.error("Status return code 401, invalidate token", { status: error.response.statusCode, statusText: error.response.statusMessage });
                    this.connected = false;
                    this.emit("close");
                }
            }
            throw error;
        }
    }
    async checkPushToken() {
        //Check push notification token
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/review/app_push_check",
                    data: {
                        app_type: "eufySecurity",
                        transaction: `${new Date().getTime()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        this.log.debug(`Push token OK`);
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async registerPushToken(token) {
        //Register push notification token
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/apppush/register_push_token",
                    data: {
                        is_notification_enable: true,
                        token: token,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        this.log.debug(`Push token registered successfully`);
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async setParameters(stationSN, deviceSN, params) {
        if (this.connected) {
            const tmp_params = [];
            params.forEach(param => {
                tmp_params.push({ param_type: param.paramType, param_value: parameter_1.ParameterHelper.writeValue(param.paramType, param.paramValue) });
            });
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/upload_devs_params",
                    data: {
                        device_sn: deviceSN,
                        station_sn: stationSN,
                        params: tmp_params
                    }
                });
                this.log.debug("Response:", { stationSN: stationSN, deviceSN: deviceSN, params: tmp_params, response: response.data });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        const dataresult = result.data;
                        this.log.debug("New parameters set", { params: tmp_params, response: dataresult });
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async getCiphers(cipherIDs, userID) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/cipher/get_ciphers",
                    data: {
                        cipher_ids: cipherIDs,
                        user_id: userID,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            const ciphers = {};
                            result.data.forEach((cipher) => {
                                ciphers[cipher.cipher_id] = cipher;
                            });
                            return ciphers;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return {};
    }
    async getVoices(deviceSN) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "get",
                    endpoint: `v1/voice/response/lists/${deviceSN}`
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            const voices = {};
                            result.data.forEach((voice) => {
                                voices[voice.voice_id] = voice;
                            });
                            return voices;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return {};
    }
    async getCipher(cipherID, userID) {
        return (await this.getCiphers([cipherID], userID))[cipherID];
    }
    getLog() {
        return this.log;
    }
    getDevices() {
        return this.devices;
    }
    getHubs() {
        return this.hubs;
    }
    getToken() {
        return this.token;
    }
    getTokenExpiration() {
        return this.tokenExpiration;
    }
    setToken(token) {
        this.token = token;
        this.requestEufyCloud.defaults.options.headers["X-Auth-Token"] = token;
    }
    setTokenExpiration(tokenExpiration) {
        this.tokenExpiration = tokenExpiration;
    }
    getAPIBase() {
        return this.requestEufyCloud.defaults.options.prefixUrl;
    }
    setOpenUDID(openudid) {
        this.headers.openudid = openudid;
        this.requestEufyCloud.defaults.options.headers = this.headers;
    }
    setSerialNumber(serialnumber) {
        this.headers.sn = serialnumber;
        this.requestEufyCloud.defaults.options.headers = this.headers;
    }
    async _getEvents(functionName, endpoint, startTime, endTime, filter, maxResults) {
        const records = [];
        if (this.connected) {
            try {
                if (filter === undefined)
                    filter = { deviceSN: "", stationSN: "", storageType: types_1.StorageType.NONE };
                if (maxResults === undefined)
                    maxResults = 1000;
                const response = await this.request({
                    method: "post",
                    endpoint: endpoint,
                    data: {
                        device_sn: filter.deviceSN !== undefined ? filter.deviceSN : "",
                        end_time: Math.trunc(endTime.getTime() / 1000),
                        exclude_guest: false,
                        house_id: "HOUSEID_ALL_DEVICE",
                        id: 0,
                        id_type: 1,
                        is_favorite: false,
                        num: maxResults,
                        pullup: true,
                        shared: true,
                        start_time: Math.trunc(startTime.getTime() / 1000),
                        station_sn: filter.stationSN !== undefined ? filter.stationSN : "",
                        storage: filter.storageType !== undefined ? filter.storageType : types_1.StorageType.NONE,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                this.log.debug(`${functionName} - Response:`, response.data);
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == 0) {
                        //TODO: Handle decryption exception resetting session auth information to reauthenticate
                        const dataresult = this.decryptAPIData(result.data);
                        if (dataresult) {
                            dataresult.forEach(record => {
                                this.log.debug(`${functionName} - Record:`, record);
                                records.push(record);
                            });
                        }
                    }
                    else {
                        this.log.error(`${functionName} - Response code not ok`, { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error(`${functionName} - Status return code not 200`, { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error(`${functionName} - Generic Error:`, error);
            }
        }
        return records;
    }
    async getVideoEvents(startTime, endTime, filter, maxResults) {
        return this._getEvents("getVideoEvents", "v2/event/app/get_all_video_record", startTime, endTime, filter, maxResults);
    }
    async getAlarmEvents(startTime, endTime, filter, maxResults) {
        return this._getEvents("getAlarmEvents", "v2/event/app/get_all_alarm_record", startTime, endTime, filter, maxResults);
    }
    async getHistoryEvents(startTime, endTime, filter, maxResults) {
        return this._getEvents("getHistoryEvents", "v2/event/app/get_all_history_record", startTime, endTime, filter, maxResults);
    }
    async getAllVideoEvents(filter, maxResults) {
        const fifteenYearsInMilliseconds = 15 * 365 * 24 * 60 * 60 * 1000;
        return this.getVideoEvents(new Date(new Date().getTime() - fifteenYearsInMilliseconds), new Date(), filter, maxResults);
    }
    async getAllAlarmEvents(filter, maxResults) {
        const fifteenYearsInMilliseconds = 15 * 365 * 24 * 60 * 60 * 1000;
        return this.getAlarmEvents(new Date(new Date().getTime() - fifteenYearsInMilliseconds), new Date(), filter, maxResults);
    }
    async getAllHistoryEvents(filter, maxResults) {
        const fifteenYearsInMilliseconds = 15 * 365 * 24 * 60 * 60 * 1000;
        return this.getHistoryEvents(new Date(new Date().getTime() - fifteenYearsInMilliseconds), new Date(), filter, maxResults);
    }
    isConnected() {
        return this.connected;
    }
    async getInvites() {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/family/get_invites",
                    data: {
                        num: 100,
                        orderby: "",
                        own: false,
                        page: 0,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            const invites = {};
                            result.data.forEach((invite) => {
                                invites[invite.invite_id] = invite;
                                invites[invite.invite_id].devices = JSON.parse(invites[invite.invite_id].devices);
                            });
                            return invites;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return {};
    }
    async confirmInvites(confirmInvites) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/family/confirm_invite",
                    data: {
                        invites: confirmInvites,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async getPublicKey(deviceSN, type) {
        if (this.connected) {
            try {
                if (this.persistentData.device_public_keys[deviceSN] !== undefined && type === types_1.PublicKeyType.LOCK) {
                    this.log.debug("return cached public key", this.persistentData.device_public_keys[deviceSN]);
                    return this.persistentData.device_public_keys[deviceSN];
                }
                else {
                    const response = await this.request({
                        method: "get",
                        endpoint: `v1/app/public_key/query?device_sn=${deviceSN}&type=${type}`
                    });
                    if (response.status == 200) {
                        const result = response.data;
                        if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                            if (result.data) {
                                if (type === types_1.PublicKeyType.LOCK)
                                    this.persistentData.device_public_keys[deviceSN] = result.data.public_key;
                                return result.data.public_key;
                            }
                        }
                        else {
                            this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                        }
                    }
                    else {
                        this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                    }
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return "";
    }
    decryptAPIData(data) {
        return JSON.parse((0, utils_1.decryptAPIData)(data, this.ecdh.computeSecret(Buffer.from(this.persistentData.serverPublicKey, "hex"))).toString());
    }
    async getSensorHistory(stationSN, deviceSN) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/get_sensor_history",
                    data: {
                        devicse_sn: deviceSN,
                        max_time: 0,
                        num: 500,
                        page: 0,
                        station_sn: stationSN,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            const entries = result.data;
                            return entries;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return [];
    }
    async getHouseDetail(houseID) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/house/detail",
                    data: {
                        house_id: houseID,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            return result.data;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return null;
    }
    async getHouseList() {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/house/list",
                    data: {
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            return result.data;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return [];
    }
    async getHouseInviteList(isInviter = 1) {
        //TODO: Understand the other values of isInviter and document it
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/house/invite_list",
                    data: {
                        is_inviter: isInviter,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data) {
                            return result.data;
                        }
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return [];
    }
    async confirmHouseInvite(houseID, inviteID) {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/house/confirm_invite",
                    data: {
                        house_id: houseID,
                        invite_id: inviteID,
                        is_inviter: 1,
                        //user_id: "",
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    getPersistentData() {
        return this.persistentData;
    }
    async getPassportProfile() {
        try {
            const response = await this.request({
                method: "get",
                endpoint: "v2/passport/profile"
            });
            if (response.status == 200) {
                const result = response.data;
                if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                    if (result.data) {
                        const profile = this.decryptAPIData(result.data);
                        this.persistentData.user_id = profile.user_id;
                        this.persistentData.nick_name = profile.nick_name;
                        this.persistentData.email = profile.email;
                        return profile;
                    }
                }
                else {
                    this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                }
            }
            else {
                this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
            }
        }
        catch (error) {
            this.log.error("Generic Error:", error);
        }
        return null;
    }
    async addUser(deviceSN, nickname, stationSN = "") {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/device/local_user/add",
                    data: {
                        device_sn: deviceSN,
                        nick_name: nickname,
                        station_sn: stationSN === deviceSN ? "" : stationSN,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        if (result.data)
                            return result.data;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return null;
    }
    async deleteUser(deviceSN, shortUserId, stationSN = "") {
        if (this.connected) {
            try {
                const response = await this.request({
                    method: "post",
                    endpoint: "v1/app/device/user/delete",
                    data: {
                        device_sn: deviceSN,
                        short_user_ids: [shortUserId],
                        station_sn: stationSN === deviceSN ? "" : stationSN,
                        transaction: `${new Date().getTime().toString()}`
                    }
                });
                if (response.status == 200) {
                    const result = response.data;
                    if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                        return true;
                    }
                    else {
                        this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                    }
                }
                else {
                    this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
    async getUsers(deviceSN, stationSN) {
        try {
            const response = await this.request({
                method: "get",
                endpoint: `v1/app/device/user/list?device_sn=${deviceSN}&station_sn=${stationSN}`
            });
            if (response.status == 200) {
                const result = response.data;
                if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                    if (result.data) {
                        const usersResponse = result.data;
                        return usersResponse.user_list;
                    }
                }
                else {
                    this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                }
            }
            else {
                this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
            }
        }
        catch (error) {
            this.log.error("Generic Error:", error);
        }
        return null;
    }
    async getUser(deviceSN, stationSN, shortUserId) {
        try {
            const users = await this.getUsers(deviceSN, stationSN);
            if (users !== null) {
                for (const user of users) {
                    if (user.short_user_id === shortUserId) {
                        return user;
                    }
                }
            }
        }
        catch (error) {
            this.log.error("Generic Error:", error);
        }
        return null;
    }
    async updateUser(deviceSN, stationSN, shortUserId, nickname) {
        if (this.connected) {
            try {
                const user = await this.getUser(deviceSN, stationSN, shortUserId);
                if (user !== null) {
                    const response = await this.request({
                        method: "post",
                        endpoint: "v1/app/device/local_user/update",
                        data: {
                            device_sn: deviceSN,
                            nick_name: nickname,
                            password_list: user.password_list,
                            short_user_id: shortUserId,
                            station_sn: stationSN === deviceSN ? "" : stationSN,
                            user_type: user.user_type,
                            transaction: `${new Date().getTime().toString()}`
                        }
                    });
                    if (response.status == 200) {
                        const result = response.data;
                        if (result.code == types_1.ResponseErrorCode.CODE_WHATEVER_ERROR) {
                            return true;
                        }
                        else {
                            this.log.error("Response code not ok", { code: result.code, msg: result.msg });
                        }
                    }
                    else {
                        this.log.error("Status return code not 200", { status: response.status, statusText: response.statusText });
                    }
                }
            }
            catch (error) {
                this.log.error("Generic Error:", error);
            }
        }
        return false;
    }
}
exports.HTTPApi = HTTPApi;
HTTPApi.apiDomainBase = "https://extend.eufylife.com";
//# sourceMappingURL=api.js.map