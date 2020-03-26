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
const util = __importStar(require("util"));
// The pipe-ability checked, promisified, pipeline function
const prPipeline = util.promisify(stream.pipeline);
function pipeline(...args) {
    if (args.length < 2) {
        throw Error('At least two streams are required for pipeline()');
    }
    const a0 = args.shift();
    const a1 = args.shift();
    return prPipeline(a0.stream, a1.stream, ...args.map((a) => a.stream));
}
exports.pipeline = pipeline;
// Testing
// const pp = pipeline(
//   new Readable<Buffer>(), 
//   new Duplex<Buffer, Buffer>(),
//   new Writable<string>()
// )
//# sourceMappingURL=pipeline.js.map