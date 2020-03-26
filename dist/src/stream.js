"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events = __importStar(require("events"));
class Stream extends events.EventEmitter {
    constructor(opts) {
        super();
        if (opts && opts.stream) {
            this.stream = opts.stream;
        }
        else {
            this.stream = this._createStream(opts);
        }
    }
    pipe(destination, options) {
        this.stream.pipe(destination.stream, options);
        return destination;
    }
}
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map