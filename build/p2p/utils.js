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
exports.getLockV12P2PCommand = exports.getLockP2PCommand = exports.getSmartSafeP2PCommand = exports.decodeSmartSafeData = exports.decodeP2PCloudIPs = exports.buildTalkbackAudioFrameHeader = exports.getLockV12Key = exports.getAdvancedLockKey = exports.eufyKDF = exports.decryptPayloadData = exports.encryptPayloadData = exports.isP2PQueueMessage = exports.buildVoidCommandPayload = exports.checkT8420 = exports.analyzeCodec = exports.initMediaInfo = exports.getVideoCodec = exports.generateAdvancedLockAESKey = exports.eslTimestamp = exports.decodeBase64 = exports.decodeLockPayload = exports.getLockVectorBytes = exports.encodeLockPayload = exports.generateLockSequence = exports.getCurrentTimeInSeconds = exports.generateBasicLockAESKey = exports.encryptLockAESData = exports.decryptLockAESData = exports.isIFrame = exports.findStartCode = exports.decryptAESData = exports.getNewRSAPrivateKey = exports.getRSAPrivateKey = exports.sortP2PMessageParts = exports.buildCommandWithStringTypePayload = exports.buildCommandHeader = exports.hasHeader = exports.sendMessage = exports.buildIntStringCommandPayload = exports.buildStringTypeCommandPayload = exports.buildIntCommandPayload = exports.buildCheckCamPayload2 = exports.buildCheckCamPayload = exports.buildLookupWithKeyPayload3 = exports.buildLookupWithKeyPayload2 = exports.buildLookupWithKeyPayload = exports.getLocalIpAddress = exports.isPrivateIp = exports.MEDIA_INFO = exports.MAGIC_WORD = void 0;
const node_rsa_1 = __importDefault(require("node-rsa"));
const CryptoJS = __importStar(require("crypto-js"));
const crypto_1 = require("crypto");
const os = __importStar(require("os"));
const mediainfo_js_1 = __importDefault(require("mediainfo.js"));
const types_1 = require("./types");
const device_1 = require("../http/device");
const ble_1 = require("./ble");
exports.MAGIC_WORD = "XZYH";
exports.MEDIA_INFO = null;
const isPrivateIp = (ip) => /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
    /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
    /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
    /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
    /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
    /^f[cd][0-9a-f]{2}:/i.test(ip) ||
    /^fe80:/i.test(ip) ||
    /^::1$/.test(ip) ||
    /^::$/.test(ip);
exports.isPrivateIp = isPrivateIp;
const stringWithLength = (input, chunkLength = 128) => {
    const stringAsBuffer = Buffer.from(input);
    const bufferSize = stringAsBuffer.byteLength < chunkLength ? chunkLength : Math.ceil(stringAsBuffer.byteLength / chunkLength) * chunkLength;
    const result = Buffer.alloc(bufferSize);
    stringAsBuffer.copy(result);
    return result;
};
const getLocalIpAddress = (init = "") => {
    const ifaces = os.networkInterfaces();
    let localAddress = init;
    for (const name in ifaces) {
        const iface = ifaces[name].filter(function (details) {
            return details.family === "IPv4" && details.internal === false;
        });
        if (iface.length > 0) {
            localAddress = iface[0].address;
            break;
        }
    }
    return localAddress;
};
exports.getLocalIpAddress = getLocalIpAddress;
const p2pDidToBuffer = (p2pDid) => {
    const p2pArray = p2pDid.split("-");
    const buf1 = stringWithLength(p2pArray[0], 8);
    const buf2 = Buffer.allocUnsafe(4);
    buf2.writeUInt32BE(Number.parseInt(p2pArray[1]), 0);
    const buf3 = stringWithLength(p2pArray[2], 8);
    return Buffer.concat([buf1, buf2, buf3], 20);
};
const buildLookupWithKeyPayload = (socket, p2pDid, dskKey) => {
    const p2pDidBuffer = p2pDidToBuffer(p2pDid);
    const addressInfo = socket.address();
    const port = addressInfo.port;
    const portAsBuffer = Buffer.allocUnsafe(2);
    portAsBuffer.writeUInt16LE(port, 0);
    //const ip = socket.address().address;
    const ip = (0, exports.getLocalIpAddress)(addressInfo.address);
    const temp_buff = [];
    ip.split(".").reverse().forEach(element => {
        temp_buff.push(Number.parseInt(element));
    });
    const ipAsBuffer = Buffer.from(temp_buff);
    const splitter = Buffer.from([0x00, 0x02]);
    const magic = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x04, 0x00, 0x00]);
    const dskKeyAsBuffer = Buffer.from(dskKey);
    const fourEmpty = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    return Buffer.concat([p2pDidBuffer, splitter, portAsBuffer, ipAsBuffer, magic, dskKeyAsBuffer, fourEmpty]);
};
exports.buildLookupWithKeyPayload = buildLookupWithKeyPayload;
const buildLookupWithKeyPayload2 = (p2pDid, dskKey) => {
    const p2pDidBuffer = p2pDidToBuffer(p2pDid);
    const dskKeyAsBuffer = Buffer.from(dskKey);
    const fourEmpty = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    return Buffer.concat([p2pDidBuffer, dskKeyAsBuffer, fourEmpty]);
};
exports.buildLookupWithKeyPayload2 = buildLookupWithKeyPayload2;
const buildLookupWithKeyPayload3 = (p2pDid, address, data) => {
    const p2pDidBuffer = p2pDidToBuffer(p2pDid);
    const portAsBuffer = Buffer.allocUnsafe(2);
    portAsBuffer.writeUInt16LE(address.port, 0);
    const temp_buff = [];
    address.host.split(".").reverse().forEach(element => {
        temp_buff.push(Number.parseInt(element));
    });
    const ipAsBuffer = Buffer.from(temp_buff);
    const splitter = Buffer.from([0x00, 0x02]);
    const eightEmpty = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    return Buffer.concat([p2pDidBuffer, splitter, portAsBuffer, ipAsBuffer, eightEmpty, data]);
};
exports.buildLookupWithKeyPayload3 = buildLookupWithKeyPayload3;
const buildCheckCamPayload = (p2pDid) => {
    const p2pDidBuffer = p2pDidToBuffer(p2pDid);
    const magic = Buffer.from([0x00, 0x00, 0x00]);
    return Buffer.concat([p2pDidBuffer, magic]);
};
exports.buildCheckCamPayload = buildCheckCamPayload;
const buildCheckCamPayload2 = (p2pDid, data) => {
    const p2pDidBuffer = p2pDidToBuffer(p2pDid);
    const magic = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    return Buffer.concat([data, p2pDidBuffer, magic]);
};
exports.buildCheckCamPayload2 = buildCheckCamPayload2;
const buildIntCommandPayload = (value, strValue = "", channel = 255) => {
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    const valueBuffer = Buffer.allocUnsafe(4);
    valueBuffer.writeUInt32LE(value, 0);
    const headerBuffer = Buffer.allocUnsafe(2);
    const strValueBuffer = strValue.length === 0 ? Buffer.from([]) : stringWithLength(strValue);
    headerBuffer.writeUInt16LE(valueBuffer.length + strValueBuffer.length, 0);
    return Buffer.concat([
        headerBuffer,
        emptyBuffer,
        magicBuffer,
        channelBuffer,
        emptyBuffer,
        valueBuffer,
        strValueBuffer
    ]);
};
exports.buildIntCommandPayload = buildIntCommandPayload;
const buildStringTypeCommandPayload = (strValue, strValueSub, channel = 255) => {
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    const someBuffer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]);
    const strValueBuffer = stringWithLength(strValue);
    const strValueSubBuffer = stringWithLength(strValueSub);
    const headerBuffer = Buffer.allocUnsafe(2);
    headerBuffer.writeUInt16LE(someBuffer.length + strValueBuffer.length + strValueSubBuffer.length, 0);
    return Buffer.concat([
        headerBuffer,
        emptyBuffer,
        magicBuffer,
        channelBuffer,
        emptyBuffer,
        someBuffer,
        strValueBuffer,
        strValueSubBuffer
    ]);
};
exports.buildStringTypeCommandPayload = buildStringTypeCommandPayload;
const buildIntStringCommandPayload = (value, valueSub = 0, strValue = "", strValueSub = "", channel = 0) => {
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    const someintBuffer = Buffer.allocUnsafe(4);
    someintBuffer.writeUInt32LE(valueSub, 0);
    const valueBuffer = Buffer.allocUnsafe(4);
    valueBuffer.writeUInt32LE(value, 0);
    const strValueBuffer = strValue.length === 0 ? Buffer.from([]) : stringWithLength(strValue);
    const strValueSubBuffer = strValueSub.length === 0 ? Buffer.from([]) : stringWithLength(strValueSub);
    const headerBuffer = Buffer.allocUnsafe(2);
    headerBuffer.writeUInt16LE(someintBuffer.length + valueBuffer.length + strValueBuffer.length + strValueSubBuffer.length, 0);
    return Buffer.concat([
        headerBuffer,
        emptyBuffer,
        magicBuffer,
        channelBuffer,
        emptyBuffer,
        someintBuffer,
        valueBuffer,
        strValueBuffer,
        strValueSubBuffer
    ]);
};
exports.buildIntStringCommandPayload = buildIntStringCommandPayload;
const sendMessage = async (socket, address, msgID, payload) => {
    if (!payload)
        payload = Buffer.from([]);
    const payloadLen = Buffer.allocUnsafe(2);
    payloadLen.writeUInt16BE(payload.length, 0);
    const message = Buffer.concat([msgID, payloadLen, payload], 4 + payload.length);
    return new Promise((resolve, reject) => {
        socket.send(message, address.port, address.host, (err, bytes) => {
            return err ? reject(err) : resolve(bytes);
        });
    });
};
exports.sendMessage = sendMessage;
const hasHeader = (msg, searchedType) => {
    const header = Buffer.allocUnsafe(2);
    msg.copy(header, 0, 0, 2);
    return Buffer.compare(header, searchedType) === 0;
};
exports.hasHeader = hasHeader;
const buildCommandHeader = (seqNumber, commandType, p2pDataTypeHeader = null) => {
    let dataTypeBuffer = types_1.P2PDataTypeHeader.DATA;
    if (p2pDataTypeHeader !== null &&
        (Buffer.compare(p2pDataTypeHeader, types_1.P2PDataTypeHeader.DATA) === 0 ||
            Buffer.compare(p2pDataTypeHeader, types_1.P2PDataTypeHeader.BINARY) === 0 ||
            Buffer.compare(p2pDataTypeHeader, types_1.P2PDataTypeHeader.CONTROL) === 0 ||
            Buffer.compare(p2pDataTypeHeader, types_1.P2PDataTypeHeader.VIDEO) === 0)) {
        dataTypeBuffer = p2pDataTypeHeader;
    }
    const seqAsBuffer = Buffer.allocUnsafe(2);
    seqAsBuffer.writeUInt16BE(seqNumber, 0);
    const magicString = Buffer.from(exports.MAGIC_WORD);
    const commandTypeBuffer = Buffer.allocUnsafe(2);
    commandTypeBuffer.writeUInt16LE(commandType, 0);
    return Buffer.concat([dataTypeBuffer, seqAsBuffer, magicString, commandTypeBuffer]);
};
exports.buildCommandHeader = buildCommandHeader;
const buildCommandWithStringTypePayload = (value, channel = 0) => {
    // type = 6
    //setCommandWithString()
    const headerBuffer = Buffer.allocUnsafe(2);
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    const jsonBuffer = Buffer.from(value);
    headerBuffer.writeUInt16LE(jsonBuffer.length, 0);
    return Buffer.concat([
        headerBuffer,
        emptyBuffer,
        magicBuffer,
        channelBuffer,
        emptyBuffer,
        jsonBuffer,
    ]);
};
exports.buildCommandWithStringTypePayload = buildCommandWithStringTypePayload;
const sortP2PMessageParts = (messages) => {
    let completeMessage = Buffer.from([]);
    Object.keys(messages).map(Number)
        .sort((a, b) => a - b) // assure the seqNumbers are in correct order
        .forEach((key) => {
        completeMessage = Buffer.concat([completeMessage, messages[key]]);
    });
    return completeMessage;
};
exports.sortP2PMessageParts = sortP2PMessageParts;
const getRSAPrivateKey = (pem) => {
    const key = new node_rsa_1.default();
    if (pem.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
        pem = pem.replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "");
    }
    key.importKey(pem, "pkcs8");
    key.setOptions({
        encryptionScheme: "pkcs1"
    });
    return key;
};
exports.getRSAPrivateKey = getRSAPrivateKey;
const getNewRSAPrivateKey = () => {
    const key = new node_rsa_1.default({ b: 1024 });
    key.setOptions({
        encryptionScheme: "pkcs1"
    });
    return key;
};
exports.getNewRSAPrivateKey = getNewRSAPrivateKey;
const decryptAESData = (hexkey, data) => {
    const key = CryptoJS.enc.Hex.parse(hexkey);
    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(data.toString("hex"))
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding
    });
    return Buffer.from(CryptoJS.enc.Hex.stringify(decrypted), "hex");
};
exports.decryptAESData = decryptAESData;
const findStartCode = (data) => {
    if (data !== undefined && data.length > 0) {
        if (data.length >= 4) {
            const startcode = [...data.slice(0, 4)];
            if ((startcode[0] === 0 && startcode[1] === 0 && startcode[2] === 1) || (startcode[0] === 0 && startcode[1] === 0 && startcode[2] === 0 && startcode[3] === 1))
                return true;
        }
        else if (data.length === 3) {
            const startcode = [...data.slice(0, 3)];
            if ((startcode[0] === 0 && startcode[1] === 0 && startcode[2] === 1))
                return true;
        }
    }
    return false;
};
exports.findStartCode = findStartCode;
const isIFrame = (data) => {
    const validValues = [64, 66, 68, 78, 101, 103];
    if (data !== undefined && data.length > 0) {
        if (data.length >= 5) {
            const startcode = [...data.slice(0, 5)];
            if (validValues.includes(startcode[3]) || validValues.includes(startcode[4]))
                return true;
        }
    }
    return false;
};
exports.isIFrame = isIFrame;
const decryptLockAESData = (key, iv, data) => {
    const ekey = CryptoJS.enc.Hex.parse(key);
    const eiv = CryptoJS.enc.Hex.parse(iv);
    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(data.toString("hex"))
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, ekey, {
        iv: eiv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return Buffer.from(CryptoJS.enc.Hex.stringify(decrypted), "hex");
};
exports.decryptLockAESData = decryptLockAESData;
const encryptLockAESData = (key, iv, data) => {
    const ekey = CryptoJS.enc.Hex.parse(key);
    const eiv = CryptoJS.enc.Hex.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(data.toString("hex")), ekey, {
        iv: eiv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return Buffer.from(CryptoJS.enc.Hex.stringify(encrypted.ciphertext), "hex");
};
exports.encryptLockAESData = encryptLockAESData;
const generateBasicLockAESKey = (adminID, stationSN) => {
    const encoder = new TextEncoder();
    const encOwnerID = encoder.encode(adminID);
    const encStationSerial = encoder.encode(stationSN);
    const array = [104, -83, -72, 38, -107, 99, -110, 17, -95, -121, 54, 57, -46, -98, -111, 89];
    for (let i = 0; i < 16; i++) {
        array[i] = (array[i] + encStationSerial[((encStationSerial[i] * 3) + 5) % 16] + encOwnerID[((encOwnerID[i] * 3) + 5) % 40]);
    }
    return Buffer.from(array).toString("hex");
};
exports.generateBasicLockAESKey = generateBasicLockAESKey;
const getCurrentTimeInSeconds = function () {
    return Math.trunc(new Date().getTime() / 1000);
};
exports.getCurrentTimeInSeconds = getCurrentTimeInSeconds;
const generateLockSequence = (deviceType) => {
    if (device_1.Device.isLockWifi(deviceType) || device_1.Device.isLockWifiNoFinger(deviceType))
        return Math.trunc(Math.random() * 1000);
    return (0, exports.getCurrentTimeInSeconds)();
};
exports.generateLockSequence = generateLockSequence;
const encodeLockPayload = (data) => {
    const encoder = new TextEncoder();
    const encData = encoder.encode(data);
    const length = encData.length;
    const old_buffer = Buffer.from(encData);
    if (length % 16 == 0) {
        return old_buffer;
    }
    const new_length = (Math.trunc(length / 16) + 1) * 16;
    const new_buffer = Buffer.alloc(new_length);
    old_buffer.copy(new_buffer, 0);
    return new_buffer;
};
exports.encodeLockPayload = encodeLockPayload;
const getLockVectorBytes = (data) => {
    const encoder = new TextEncoder();
    const encData = encoder.encode(data);
    const old_buffer = Buffer.from(encData);
    if (encData.length >= 16)
        return old_buffer.toString("hex");
    const new_buffer = Buffer.alloc(16);
    old_buffer.copy(new_buffer, 0);
    return new_buffer.toString("hex");
};
exports.getLockVectorBytes = getLockVectorBytes;
const decodeLockPayload = (data) => {
    const decoder = new TextDecoder();
    return decoder.decode(data);
};
exports.decodeLockPayload = decodeLockPayload;
const decodeBase64 = (data) => {
    return Buffer.from(data, "base64");
};
exports.decodeBase64 = decodeBase64;
const eslTimestamp = function (timestamp_in_sec = new Date().getTime() / 1000) {
    const array = [];
    for (let pos = 0; pos < 4; pos++) {
        array[pos] = ((timestamp_in_sec >> (pos * 8)) & 255);
    }
    return array;
};
exports.eslTimestamp = eslTimestamp;
const generateAdvancedLockAESKey = () => {
    const randomBytesArray = [...(0, crypto_1.randomBytes)(16)];
    let result = "";
    for (let pos = 0; pos < randomBytesArray.length; pos++) {
        result += "0123456789ABCDEF".charAt((randomBytesArray[pos] >> 4) & 15);
        result += "0123456789ABCDEF".charAt(randomBytesArray[pos] & 15);
    }
    return result;
};
exports.generateAdvancedLockAESKey = generateAdvancedLockAESKey;
const getVideoCodec = (data) => {
    if (data !== undefined && data.length > 0) {
        if (data.length >= 5) {
            const h265Values = [38, 64, 66, 68, 78];
            const startcode = [...data.slice(0, 5)];
            if (h265Values.includes(startcode[3]) || h265Values.includes(startcode[4])) {
                return types_1.VideoCodec.H265;
            }
            else if (startcode[3] === 103 || startcode[4] === 103) {
                return types_1.VideoCodec.H264;
            }
        }
        return types_1.VideoCodec.H264;
    }
    return types_1.VideoCodec.UNKNOWN; // Maybe return h264 as Eufy does?
};
exports.getVideoCodec = getVideoCodec;
const initMediaInfo = async () => {
    if (exports.MEDIA_INFO !== null && exports.MEDIA_INFO !== undefined) {
        return exports.MEDIA_INFO;
    }
    return new Promise((resolve, reject) => {
        (0, mediainfo_js_1.default)({
        //chunkSize: 256 * 1024
        }, mediainfo => {
            exports.MEDIA_INFO = mediainfo;
            resolve(mediainfo);
        }, error => {
            reject(error);
        });
    });
};
exports.initMediaInfo = initMediaInfo;
const analyzeCodec = async (data) => {
    if (data !== undefined && data.length > 0) {
        try {
            const mediainfo = await (0, exports.initMediaInfo)();
            mediainfo.openBufferInit(data.byteLength, 0);
            const result = mediainfo.openBufferContinue(data, data.byteLength);
            mediainfo.openBufferFinalize();
            if (result) {
                return JSON.parse(mediainfo.inform());
            }
        }
        catch (error) {
        }
    }
    return {};
};
exports.analyzeCodec = analyzeCodec;
const checkT8420 = (serialNumber) => {
    if (!(serialNumber !== undefined && serialNumber !== null && serialNumber.length > 0 && serialNumber.startsWith("T8420")) || serialNumber.length <= 7 || serialNumber[6] != "6") {
        return false;
    }
    return true;
};
exports.checkT8420 = checkT8420;
const buildVoidCommandPayload = (channel = 255) => {
    const headerBuffer = Buffer.from([0x00, 0x00]);
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    return Buffer.concat([
        headerBuffer,
        emptyBuffer,
        magicBuffer,
        channelBuffer,
        emptyBuffer
    ]);
};
exports.buildVoidCommandPayload = buildVoidCommandPayload;
function isP2PQueueMessage(type) {
    return type.payload !== undefined;
}
exports.isP2PQueueMessage = isP2PQueueMessage;
const encryptPayloadData = (data, key, iv) => {
    const cipher = (0, crypto_1.createCipheriv)("aes-128-cbc", key, iv);
    return Buffer.concat([
        cipher.update(data),
        cipher.final()
    ]);
};
exports.encryptPayloadData = encryptPayloadData;
const decryptPayloadData = (data, key, iv) => {
    const cipher = (0, crypto_1.createDecipheriv)("aes-128-cbc", key, iv);
    return Buffer.concat([
        cipher.update(data),
        cipher.final()
    ]);
};
exports.decryptPayloadData = decryptPayloadData;
const eufyKDF = (key) => {
    const hash_length = 32;
    const digest_length = 48;
    const staticBuffer = Buffer.from("ECIES");
    const steps = Math.ceil(digest_length / hash_length);
    const buffer = Buffer.alloc(hash_length * steps);
    let tmpBuffer = staticBuffer;
    for (let step = 0; step < steps; ++step) {
        tmpBuffer = (0, crypto_1.createHmac)("sha256", key).update(tmpBuffer).digest();
        const digest = (0, crypto_1.createHmac)("sha256", key).update(Buffer.concat([tmpBuffer, staticBuffer])).digest();
        digest.copy(buffer, hash_length * step);
    }
    return buffer.slice(0, digest_length);
};
exports.eufyKDF = eufyKDF;
const getAdvancedLockKey = (key, publicKey) => {
    const ecdh = (0, crypto_1.createECDH)("prime256v1");
    ecdh.generateKeys();
    const secret = ecdh.computeSecret(Buffer.concat([Buffer.from("04", "hex"), Buffer.from(publicKey, "hex")]));
    const randomValue = (0, crypto_1.randomBytes)(16);
    const derivedKey = (0, exports.eufyKDF)(secret);
    const encryptedData = (0, exports.encryptPayloadData)(key, derivedKey.slice(0, 16), randomValue);
    const hmac = (0, crypto_1.createHmac)("sha256", derivedKey.slice(16));
    hmac.update(randomValue);
    hmac.update(encryptedData);
    const hmacDigest = hmac.digest();
    return Buffer.concat([Buffer.from(ecdh.getPublicKey("hex", "compressed"), "hex"), randomValue, encryptedData, hmacDigest]).toString("hex");
};
exports.getAdvancedLockKey = getAdvancedLockKey;
const getLockV12Key = (key, publicKey) => {
    const ecdh = (0, crypto_1.createECDH)("prime256v1");
    ecdh.generateKeys();
    const secret = ecdh.computeSecret(Buffer.concat([Buffer.from("04", "hex"), Buffer.from(publicKey, "hex")]));
    const randomValue = (0, crypto_1.randomBytes)(16);
    const derivedKey = (0, exports.eufyKDF)(secret);
    const encryptedData = (0, exports.encryptPayloadData)(Buffer.from(key, "hex"), derivedKey.slice(0, 16), randomValue);
    const hmac = (0, crypto_1.createHmac)("sha256", derivedKey.slice(16));
    hmac.update(randomValue);
    hmac.update(encryptedData);
    const hmacDigest = hmac.digest();
    return Buffer.concat([Buffer.from(ecdh.getPublicKey("hex", "compressed"), "hex"), randomValue, encryptedData, hmacDigest]).toString("hex");
};
exports.getLockV12Key = getLockV12Key;
const buildTalkbackAudioFrameHeader = (audioData, channel = 0) => {
    const audioDataLength = Buffer.allocUnsafe(4);
    audioDataLength.writeUInt32LE(audioData.length);
    const unknown1 = Buffer.alloc(1);
    const audioType = Buffer.alloc(1);
    const audioSeq = Buffer.alloc(2);
    const audioTimestamp = Buffer.alloc(8);
    const audioDataHeader = Buffer.concat([audioDataLength, unknown1, audioType, audioSeq, audioTimestamp]);
    const bytesToRead = Buffer.allocUnsafe(4);
    bytesToRead.writeUInt32LE(audioData.length + audioDataHeader.length);
    const magicBuffer = Buffer.from([0x01, 0x00]);
    const channelBuffer = Buffer.from([channel, 0x00]);
    const emptyBuffer = Buffer.from([0x00, 0x00]);
    return Buffer.concat([
        bytesToRead,
        magicBuffer,
        channelBuffer,
        emptyBuffer,
        audioDataHeader
    ]);
};
exports.buildTalkbackAudioFrameHeader = buildTalkbackAudioFrameHeader;
const decodeP2PCloudIPs = (data) => {
    const lookupTable = Buffer.from("4959433db5bf6da347534f6165e371e9677f02030badb3892b2f35c16b8b959711e5a70deff1050783fb9d3bc5c713171d1f2529d3df", "hex");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [encoded, name = "name not included"] = data.split(":");
    const output = Buffer.alloc(encoded.length / 2);
    for (let i = 0; i <= data.length / 2; i++) {
        let z = 0x39; // 57 // '9'
        for (let j = 0; j < i; j++) {
            z = z ^ output[j];
        }
        const x = (data.charCodeAt(i * 2 + 1) - "A".charCodeAt(0));
        const y = (data.charCodeAt(i * 2) - "A".charCodeAt(0)) * 0x10;
        output[i] = z ^ lookupTable[i % lookupTable.length] ^ x + y;
    }
    const result = [];
    output.toString("utf8").split(",").forEach((ip) => {
        if (ip !== "") {
            result.push({ host: ip, port: 32100 });
        }
    });
    return result;
};
exports.decodeP2PCloudIPs = decodeP2PCloudIPs;
const decodeSmartSafeData = function (deviceSN, data) {
    const response = new ble_1.BleCommandFactory(data);
    return {
        versionCode: response.getVersionCode(),
        dataType: response.getDataType(),
        commandCode: response.getCommandCode(),
        packageFlag: response.getPackageFlag(),
        responseCode: response.getResponseCode(),
        data: (0, exports.decryptPayloadData)(response.getData(), Buffer.from(deviceSN), Buffer.from(device_1.SmartSafe.IV, "hex"))
    };
};
exports.decodeSmartSafeData = decodeSmartSafeData;
const getSmartSafeP2PCommand = function (deviceSN, user_id, command, intCommand, channel, sequence, data) {
    const encPayload = (0, exports.encryptPayloadData)(data, Buffer.from(deviceSN), Buffer.from(device_1.SmartSafe.IV, "hex"));
    const bleCommand = new ble_1.BleCommandFactory()
        .setVersionCode(device_1.SmartSafe.VERSION_CODE)
        .setCommandCode(intCommand)
        .setDataType(-1)
        .setData(encPayload)
        .getSmartSafeCommand();
    return {
        commandType: types_1.CommandType.CMD_SET_PAYLOAD,
        value: JSON.stringify({
            account_id: user_id,
            cmd: command,
            mChannel: channel,
            mValue3: 0,
            payload: {
                data: bleCommand.toString("hex"),
                prj_id: command,
                seq_num: sequence,
            }
        }),
        channel: channel
    };
};
exports.getSmartSafeP2PCommand = getSmartSafeP2PCommand;
const getLockP2PCommand = function (deviceSN, user_id, command, channel, lockPublicKey, payload) {
    const key = (0, exports.generateAdvancedLockAESKey)();
    const ecdhKey = (0, exports.getAdvancedLockKey)(key, lockPublicKey);
    const iv = (0, exports.getLockVectorBytes)(deviceSN);
    const encPayload = (0, exports.encryptLockAESData)(key, iv, Buffer.from(JSON.stringify(payload)));
    return {
        commandType: types_1.CommandType.CMD_SET_PAYLOAD,
        value: JSON.stringify({
            key: ecdhKey,
            account_id: user_id,
            cmd: command,
            mChannel: channel,
            mValue3: 0,
            payload: encPayload.toString("base64")
        }).replace(/=/g, "\\u003d"),
        channel: channel,
        aesKey: key
    };
};
exports.getLockP2PCommand = getLockP2PCommand;
const getLockV12P2PCommand = function (deviceSN, user_id, command, channel, lockPublicKey, sequence, data) {
    const key = (0, exports.generateAdvancedLockAESKey)();
    const encryptedAesKey = (0, exports.getLockV12Key)(key, lockPublicKey);
    const iv = (0, exports.getLockVectorBytes)(deviceSN);
    const encPayload = (0, exports.encryptPayloadData)(data, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    const bleCommand = new ble_1.BleCommandFactory()
        .setVersionCode(device_1.Lock.VERSION_CODE_LOCKV12)
        .setCommandCode(Number.parseInt(types_1.ESLBleCommand[types_1.ESLCommand[command]])) //TODO: Change internal command identification?
        .setDataType(-1)
        .setData(encPayload)
        .setAdditionalData(Buffer.from(encryptedAesKey, "hex"));
    return {
        aesKey: key,
        bleCommand: bleCommand.getCommandCode(),
        payload: {
            commandType: types_1.CommandType.CMD_SET_PAYLOAD,
            value: JSON.stringify({
                account_id: user_id,
                cmd: types_1.CommandType.CMD_SET_PAYLOAD_LOCKV12,
                mChannel: channel,
                mValue3: 0,
                payload: {
                    apiCommand: command,
                    lock_payload: bleCommand.getLockV12Command().toString("hex"),
                    seq_num: sequence,
                }
            })
        }
    };
};
exports.getLockV12P2PCommand = getLockV12P2PCommand;
//# sourceMappingURL=utils.js.map