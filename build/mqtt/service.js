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
exports.MQTTService = void 0;
const mqtt = __importStar(require("mqtt"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const ts_log_1 = require("ts-log");
const fse = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const protobuf_typescript_1 = require("protobuf-typescript");
class MQTTService extends tiny_typed_emitter_1.TypedEmitter {
    constructor(log = ts_log_1.dummyLogger) {
        super();
        this.CLIENT_ID_FORMAT = "android_EufySecurity_<user_id>_<android_id>";
        this.USERNAME_FORMAT = "eufy_<user_id>";
        this.SUBSCRIBE_NOTICE_FORMAT = "/phone/<user_id>/notice";
        this.SUBSCRIBE_LOCK_FORMAT = "/phone/smart_lock/<device_sn>/push_message";
        this.SUBSCRIBE_DOORBELL_FORMAT = "/phone/doorbell/<device_sn>/push_message";
        this.connected = false;
        this.client = null;
        this.connecting = false;
        this.subscribeLocks = [];
        this.log = log;
        this.deviceSmartLockMessageModel = MQTTService.proto.lookupType("DeviceSmartLockMessage");
    }
    static async init(log = ts_log_1.dummyLogger) {
        this.proto = await (0, protobuf_typescript_1.load)(path.join(__dirname, "./proto/lock.proto"));
        return new MQTTService(log);
    }
    parseSmartLockMessage(data) {
        const message = this.deviceSmartLockMessageModel.decode(data);
        const object = this.deviceSmartLockMessageModel.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
        });
        return object;
    }
    getMQTTBrokerUrl(apiBase) {
        switch (apiBase) {
            case "https://security-app.eufylife.com":
                return "mqtts://security-mqtt.eufylife.com";
            case "https://security-app-ci.eufylife.com":
                return "mqtts://security-mqtt-ci.eufylife.com";
            case "https://security-app-qa.eufylife.com":
            case "https://security-app-cn-qa.anker-in.com":
                return "mqtts://security-mqtt-qa.eufylife.com";
            case "https://security-app-eu.eufylife.com":
                return "mqtts://security-mqtt-eu.eufylife.com";
            case "https://security-app-short-qa.eufylife.com":
                return "mqtts://security-mqtt-short-qa.eufylife.com";
            default:
                return "mqtts://security-mqtt.eufylife.com";
        }
    }
    connect(clientID, androidID, apiBase, email) {
        this.clientID = clientID;
        this.androidID = androidID;
        this.apiBase = apiBase;
        this.email = email;
        if (!this.connected && !this.connecting && this.clientID && this.androidID && this.apiBase && this.email && this.subscribeLocks.length > 0) {
            this.connecting = true;
            this.client = mqtt.connect(this.getMQTTBrokerUrl(apiBase), {
                keepalive: 60,
                clean: true,
                reschedulePings: true,
                resubscribe: true,
                port: 8789,
                username: this.USERNAME_FORMAT.replace("<user_id>", clientID),
                password: email,
                ca: fse.readFileSync(path.join(__dirname, "./mqtt-eufy.crt")),
                clientId: this.CLIENT_ID_FORMAT.replace("<user_id>", clientID).replace("<android_id>", androidID),
                rejectUnauthorized: false // Some eufy mqtt servers have an expired certificate :(
            });
            this.client.on("connect", (_connack) => {
                this.connected = true;
                this.connecting = false;
                this.emit("connect");
                this.client.subscribe(this.SUBSCRIBE_NOTICE_FORMAT.replace("<user_id>", clientID), { qos: 1 });
                if (this.subscribeLocks.length > 0) {
                    let lock;
                    while ((lock = this.subscribeLocks.shift()) !== undefined) {
                        this._subscribeLock(lock);
                    }
                }
            });
            this.client.on("close", () => {
                this.connected = false;
                this.emit("close");
            });
            this.client.on("error", (error) => {
                var _a;
                this.connecting = false;
                this.log.error("MQTT Error", error);
                if (error.code === 1 || error.code === 2 || error.code === 4 || error.code === 5)
                    (_a = this.client) === null || _a === void 0 ? void 0 : _a.end();
            });
            this.client.on("message", (topic, message, _packet) => {
                if (topic.includes("smart_lock")) {
                    const parsedMessage = this.parseSmartLockMessage(message);
                    this.log.debug("Received a smart lock message over MQTT", parsedMessage);
                    this.emit("lock message", parsedMessage);
                }
                else {
                    this.log.debug("MQTT message received", topic, message.toString("hex"));
                }
            });
        }
    }
    _subscribeLock(deviceSN) {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.subscribe(this.SUBSCRIBE_LOCK_FORMAT.replace("<device_sn>", deviceSN), { qos: 1 }, (error, granted) => {
            if (error) {
                this.log.error(`Subscribe error for lock ${deviceSN}`, error);
            }
            if (granted) {
                this.log.info(`Successfully registered to MQTT notifications for lock ${deviceSN}`);
            }
        });
    }
    subscribeLock(deviceSN) {
        if (this.connected) {
            this._subscribeLock(deviceSN);
        }
        else {
            if (!this.subscribeLocks.includes(deviceSN)) {
                this.subscribeLocks.push(deviceSN);
            }
            if (this.clientID && this.androidID && this.apiBase && this.email)
                this.connect(this.clientID, this.androidID, this.apiBase, this.email);
        }
    }
    isConnected() {
        return this.connected;
    }
    close() {
        var _a;
        if (this.connected) {
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.end(true);
            this.connected = false;
            this.connecting = false;
        }
    }
}
exports.MQTTService = MQTTService;
MQTTService.proto = null;
//# sourceMappingURL=service.js.map