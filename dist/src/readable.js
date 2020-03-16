"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream = __importStar(require("stream"));
const stream_1 = require("./stream");
class Readable extends stream_1.Stream {
    constructor(opts) {
        super(opts);
    }
    _createStream(opts) {
        return new stream.Readable(opts);
    }
    push(chunk, encoding) {
        return this.stream.push(chunk, encoding);
    }
    destroy(error) {
        return this.stream.destroy(error);
    }
    addListener(event, listener) {
        this.stream.addListener(event, listener);
        return this;
    }
    emit(event, ...args) {
        return this.stream.emit(event, ...args);
    }
    on(event, listener) {
        this.stream.on(event, listener);
        return this;
    }
    once(event, listener) {
        this.stream.once(event, listener);
        return this;
    }
    prependListener(event, listener) {
        this.stream.prependListener(event, listener);
        return this;
    }
    prependOnceListener(event, listener) {
        this.stream.prependOnceListener(event, listener);
        return this;
    }
    removeListener(event, listener) {
        this.stream.removeListener(event, listener);
        return this;
    }
}
exports.Readable = Readable;
//# sourceMappingURL=readable.js.map