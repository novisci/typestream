"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tstream = __importStar(require("../index"));
const readStream = new tstream.Readable();
const writeStream = new tstream.Writable();
// Valid pipe
readStream.pipe(writeStream);
const bufferWriteStream = new tstream.Writable();
// Invalid pipe
readStream.pipe(bufferWriteStream);
// Valid pipeline
tstream.pipeline(new tstream.Readable(), new tstream.Duplex(), new tstream.Writable()).then(() => console.log('complete'));
// Invalid pipeline
// tstream.pipeline(
//   new tstream.Readable<Buffer>(),
//   new tstream.Duplex<Buffer, string>(),
//   new tstream.Writable<Buffer>()
// ).then(() => console.log('complete'))
//# sourceMappingURL=teststream.js.map