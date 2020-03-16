# `typestream`

A typescript wrapper around Node streams which manages the type of data flowing through the stream.

Example
```typescript
import * as tstream from 'node-typestream'
const readStream = new tstream.Readable<Buffer>(...)
```

## Piping
```typescript
const readStream = new tstream.Readable<string>(...)
const writeStream = new tstream.Writable<string>(...)
// Valid pipe
readStream.pipe(writeStream)

const bufferWriteStream = new tstream.Writable<Buffer>(...)
// Invalid pipe
readStream.pipe(bufferWriteStream)
```

## Pipelines
```typescript
// Valid pipeline
tstream.pipeline(
  new tstream.Readable<Buffer>(...)
  new tstream.Transform<Buffer, string>(...)
  new tstream.Writable<string>(...)
).then(() => console.log('complete'))

// Invalid pipeline
tstream.pipeline(
  new tstream.Readable<Buffer>(...)
  new tstream.Transform<Buffer, string>(...)
  new tstream.Writable<Buffer>(...)
).then(() => console.log('complete'))
// Produces: Argument of type '[Readable<Buffer>, Duplex<Buffer, string>, Writable<Buffer>]' is not assignable to parameter of type 'never'.
```