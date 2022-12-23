"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkbackStream = void 0;
const stream_1 = require("stream");
class TalkbackStream extends stream_1.Transform {
    constructor() {
        super();
        this.isStreaming = false;
    }
    _transform(data, _encoding, callback) {
        if (this.isStreaming)
            this.push(data);
        callback();
    }
    startTalkback() {
        this.isStreaming = true;
    }
    stopTalkback() {
        this.isStreaming = false;
    }
}
exports.TalkbackStream = TalkbackStream;
//# sourceMappingURL=talkback.js.map