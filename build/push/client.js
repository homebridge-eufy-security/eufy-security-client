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
exports.PushClient = void 0;
const Long = __importStar(require("long"));
const path = __importStar(require("path"));
const protobuf_typescript_1 = require("protobuf-typescript");
const tls = __importStar(require("tls"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const ts_log_1 = require("ts-log");
const models_1 = require("./models");
const parser_1 = require("./parser");
class PushClient extends tiny_typed_emitter_1.TypedEmitter {
    constructor(pushClientParser, auth, log = ts_log_1.dummyLogger) {
        super();
        this.HOST = "mtalk.google.com";
        this.PORT = 5228;
        this.MCS_VERSION = 41;
        this.HEARTBEAT_INTERVAL = 5 * 60 * 1000;
        this.loggedIn = false;
        this.streamId = 0;
        this.lastStreamIdReported = -1;
        this.currentDelay = 0;
        this.persistentIds = [];
        this.log = log;
        this.pushClientParser = pushClientParser;
        this.auth = auth;
    }
    static async init(auth, log = ts_log_1.dummyLogger) {
        this.proto = await (0, protobuf_typescript_1.load)(path.join(__dirname, "./proto/mcs.proto"));
        const pushClientParser = await parser_1.PushClientParser.init(log);
        return new PushClient(pushClientParser, auth, log);
    }
    initialize() {
        this.loggedIn = false;
        this.streamId = 0;
        this.lastStreamIdReported = -1;
        if (this.client) {
            this.client.removeAllListeners();
            this.client.destroy();
            this.client = undefined;
        }
        this.pushClientParser.resetState();
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = undefined;
        }
    }
    getPersistentIds() {
        return this.persistentIds;
    }
    setPersistentIds(ids) {
        this.persistentIds = ids;
    }
    connect() {
        this.initialize();
        this.pushClientParser.on("message", (message) => this.handleParsedMessage(message));
        this.client = tls.connect(this.PORT, this.HOST, {
            rejectUnauthorized: false,
        });
        this.client.setKeepAlive(true);
        // For debugging purposes
        //this.client.enableTrace();
        this.client.on("connect", () => this.onSocketConnect());
        this.client.on("close", () => this.onSocketClose());
        this.client.on("error", (error) => this.onSocketError(error));
        this.client.on("data", (newData) => this.onSocketData(newData));
        this.client.write(this.buildLoginRequest());
    }
    buildLoginRequest() {
        const androidId = this.auth.androidId;
        const securityToken = this.auth.securityToken;
        const LoginRequestType = PushClient.proto.lookupType("mcs_proto.LoginRequest");
        const hexAndroidId = Long.fromString(androidId).toString(16);
        const loginRequest = {
            adaptiveHeartbeat: false,
            authService: 2,
            authToken: securityToken,
            id: "chrome-63.0.3234.0",
            domain: "mcs.android.com",
            deviceId: `android-${hexAndroidId}`,
            networkType: 1,
            resource: androidId,
            user: androidId,
            useRmq2: true,
            setting: [{ name: "new_vc", value: "1" }],
            clientEvent: [],
            receivedPersistentId: this.persistentIds,
        };
        const errorMessage = LoginRequestType.verify(loginRequest);
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        const buffer = LoginRequestType.encodeDelimited(loginRequest).finish();
        return Buffer.concat([Buffer.from([this.MCS_VERSION, models_1.MessageTag.LoginRequest]), buffer]);
    }
    buildHeartbeatPingRequest(stream_id) {
        const heartbeatPingRequest = {};
        if (stream_id) {
            heartbeatPingRequest.last_stream_id_received = stream_id;
        }
        this.log.debug(`heartbeatPingRequest`, heartbeatPingRequest);
        const HeartbeatPingRequestType = PushClient.proto.lookupType("mcs_proto.HeartbeatPing");
        const errorMessage = HeartbeatPingRequestType.verify(heartbeatPingRequest);
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        const buffer = HeartbeatPingRequestType.encodeDelimited(heartbeatPingRequest).finish();
        return Buffer.concat([Buffer.from([models_1.MessageTag.HeartbeatPing]), buffer]);
    }
    buildHeartbeatAckRequest(stream_id, status) {
        const heartbeatAckRequest = {};
        if (stream_id && !status) {
            heartbeatAckRequest.last_stream_id_received = stream_id;
        }
        else if (!stream_id && status) {
            heartbeatAckRequest.status = status;
        }
        else {
            heartbeatAckRequest.last_stream_id_received = stream_id;
            heartbeatAckRequest.status = status;
        }
        this.log.debug(`heartbeatAckRequest`, heartbeatAckRequest);
        const HeartbeatAckRequestType = PushClient.proto.lookupType("mcs_proto.HeartbeatAck");
        const errorMessage = HeartbeatAckRequestType.verify(heartbeatAckRequest);
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        const buffer = HeartbeatAckRequestType.encodeDelimited(heartbeatAckRequest).finish();
        return Buffer.concat([Buffer.from([models_1.MessageTag.HeartbeatAck]), buffer]);
    }
    onSocketData(newData) {
        this.pushClientParser.handleData(newData);
    }
    onSocketConnect() {
        //
    }
    onSocketClose() {
        this.loggedIn = false;
        if (this.heartbeatTimeout) {
            clearTimeout(this.heartbeatTimeout);
            this.heartbeatTimeout = undefined;
        }
        this.emit("close");
        this.scheduleReconnect();
    }
    onSocketError(error) {
        this.log.error(`onSocketError:`, error);
    }
    handleParsedMessage(message) {
        this.resetCurrentDelay();
        switch (message.tag) {
            case models_1.MessageTag.DataMessageStanza:
                this.log.debug(`DataMessageStanza`, message);
                if (message.object && message.object.persistentId)
                    this.persistentIds.push(message.object.persistentId);
                this.emit("message", this.convertPayloadMessage(message));
                break;
            case models_1.MessageTag.HeartbeatPing:
                this.handleHeartbeatPing(message);
                break;
            case models_1.MessageTag.HeartbeatAck:
                this.handleHeartbeatAck(message);
                break;
            case models_1.MessageTag.Close:
                this.log.debug(`Close: Server requested close`, message);
                break;
            case models_1.MessageTag.LoginResponse:
                this.log.debug("Login response: GCM -> logged in -> waiting for push messages...");
                this.loggedIn = true;
                this.persistentIds = [];
                this.emit("connect");
                this.heartbeatTimeout = setTimeout(() => {
                    this.scheduleHeartbeat(this);
                }, this.getHeartbeatInterval());
                break;
            case models_1.MessageTag.LoginRequest:
                this.log.debug(`Login request`, message);
                break;
            case models_1.MessageTag.IqStanza:
                this.log.debug(`IqStanza: Not implemented`, message);
                break;
            default:
                this.log.debug(`Unknown message`, message);
                return;
        }
        this.streamId++;
    }
    handleHeartbeatPing(message) {
        this.log.debug(`Heartbeat ping`, message);
        let streamId = undefined;
        let status = undefined;
        if (this.newStreamIdAvailable()) {
            streamId = this.getStreamId();
        }
        if (message.object && message.object.status) {
            status = message.object.status;
        }
        if (this.client)
            this.client.write(this.buildHeartbeatAckRequest(streamId, status));
    }
    handleHeartbeatAck(message) {
        this.log.debug(`Heartbeat acknowledge`, message);
    }
    convertPayloadMessage(message) {
        const { appData, ...otherData } = message.object;
        const messageData = {};
        appData.forEach((kv) => {
            if (kv.key === "payload") {
                const payload = JSON.parse(Buffer.from(kv.value, "base64").toString("utf8"));
                messageData[kv.key] = payload;
            }
            else {
                messageData[kv.key] = kv.value;
            }
        });
        return {
            ...otherData,
            payload: messageData,
        };
    }
    getStreamId() {
        this.lastStreamIdReported = this.streamId;
        return this.streamId;
    }
    newStreamIdAvailable() {
        return this.lastStreamIdReported != this.streamId;
    }
    scheduleHeartbeat(client) {
        if (client.sendHeartbeat()) {
            this.heartbeatTimeout = setTimeout(() => {
                this.scheduleHeartbeat(client);
            }, client.getHeartbeatInterval());
        }
        else {
            this.log.debug("Heartbeat disabled!");
        }
    }
    sendHeartbeat() {
        let streamId = undefined;
        if (this.newStreamIdAvailable()) {
            streamId = this.getStreamId();
        }
        if (this.client && this.isConnected()) {
            this.log.debug(`Sending heartbeat...`, streamId);
            this.client.write(this.buildHeartbeatPingRequest(streamId));
            return true;
        }
        else {
            this.log.debug("No more connected, reconnect...");
            this.scheduleReconnect();
        }
        return false;
    }
    isConnected() {
        return this.loggedIn;
    }
    getHeartbeatInterval() {
        return this.HEARTBEAT_INTERVAL;
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
        const delay = this.getCurrentDelay();
        this.log.debug("Schedule reconnect...", { delay: delay });
        if (!this.reconnectTimeout)
            this.reconnectTimeout = setTimeout(() => {
                this.connect();
            }, delay);
    }
    close() {
        const wasConnected = this.isConnected();
        this.initialize();
        if (wasConnected)
            this.emit("close");
    }
}
exports.PushClient = PushClient;
PushClient.proto = null;
//# sourceMappingURL=client.js.map