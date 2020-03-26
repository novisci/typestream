import * as tstream from '../index'

const readStream = new tstream.Readable<string>()
const writeStream = new tstream.Writable<string>()
// Valid pipe
readStream.pipe(writeStream)

const bufferWriteStream = new tstream.Writable<Buffer>()
// Invalid pipe
readStream.pipe(bufferWriteStream)

// Valid pipeline
tstream.pipeline(
  new tstream.Readable<Buffer>(),
  new tstream.Duplex<Buffer, string>(),
  new tstream.Writable<string>()
).then(() => console.log('complete'))

// Invalid pipeline
// tstream.pipeline(
//   new tstream.Readable<Buffer>(),
//   new tstream.Duplex<Buffer, string>(),
//   new tstream.Writable<Buffer>()
// ).then(() => console.log('complete'))
