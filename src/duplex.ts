import * as stream from 'stream'
import { Stream, Options } from './stream'
import { Readable } from './readable'
import { WritableOptions } from './writable'


/***
 * DUPLEX
 */
export interface DuplexOptions<I, O> extends Options<I, O> {
  highWaterMark?: number
  encoding?: string
  objectMode?: boolean
  autoDestroy?: boolean
  decodeStrings?: boolean
  defaultEncoding?: string
  emitClose?: boolean
  allowHalfOpen?: boolean
  readableObjectMode?: boolean
  writableObjectMode?: boolean
  readableHighWaterMark?: number
  writableHighWaterMark?: number
  writableCorked?: number
  read? (this: Duplex<I, O>, size: number): void
  write? (this: Duplex<I, O>, chunk: I, encoding: string, callback: (error?: Error | null) => void): void
  writev? (this: Duplex<I, O>, chunks: Array<{ chunk: I, encoding: string }>, callback: (error?: Error | null) => void): void
  final? (this: Duplex<I, O>, callback: (error?: Error | null) => void): void
  destroy? (this: Duplex<I, O>, error: Error | null, callback: (error: Error | null) => void): void
}

type CbVoid = () => void
type CbError = (error: Error | null | undefined) => void

export class Duplex<I, O> extends Stream<I, O, stream.Duplex, DuplexOptions<I, O>> {
  readonly writable: boolean

  constructor (opts?: DuplexOptions<I, O>) {
    super(opts)
    this.writable = this.stream.writable
  }

  _createStream (opts?: WritableOptions<I>): stream.Duplex {
    return new stream.Duplex(opts as stream.DuplexOptions)
  }

  end (cb?: () => void): void
  end (chunk: I, cb?: () => void): void
  end (chunk: I, encoding: string, cb?: () => void): void
  end (chunk?: I | CbVoid, encoding?: string | CbVoid, cb?:CbVoid): void {
    return this.stream.end(chunk, encoding as string, cb)
  }

  write (chunk: I, cb?: (error: Error | null | undefined) => void): boolean
  write (chunk: I, encoding: string, cb?: (error: Error | null | undefined) => void): boolean
  write (chunk: I, encoding?: string | CbError, cb?: CbError): boolean {
    return this.stream.write(chunk, encoding as string, cb)
  }

  addListener(event: "data", listener: (chunk: any) => void): this
  addListener(event: "end", listener: () => void): this
  addListener(event: "readable", listener: () => void): this
  addListener(event: "close", listener: () => void): this
  addListener(event: "drain", listener: () => void): this
  addListener(event: "error", listener: (err: Error) => void): this
  addListener(event: "finish", listener: () => void): this
  addListener(event: "pipe", listener: (src: Readable<I>) => void): this
  addListener(event: "unpipe", listener: (src: Readable<I>) => void): this
  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.addListener(event, listener)
    return this
  }

  emit(event: "data", chunk: any): boolean
  emit(event: "end"): boolean
  emit(event: "readable"): boolean
  emit(event: "close"): boolean
  emit(event: "drain"): boolean
  emit(event: "error", err: Error): boolean
  emit(event: "finish"): boolean
  emit(event: "pipe", src: Readable<I>): boolean
  emit(event: "unpipe", src: Readable<I>): boolean
  emit(event: string | symbol, ...args: any[]): boolean {
    return this.stream.emit(event, ...args)
  }

  on(event: "data", listener: (chunk: any) => void): this
  on(event: "end", listener: () => void): this
  on(event: "readable", listener: () => void): this
  on(event: "close", listener: () => void): this
  on(event: "drain", listener: () => void): this
  on(event: "error", listener: (err: Error) => void): this
  on(event: "finish", listener: () => void): this
  on(event: "pipe", listener: (src: Readable<I>) => void): this
  on(event: "unpipe", listener: (src: Readable<I>) => void): this
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.on(event, listener)
    return this
  }

  once(event: "data", listener: (chunk: any) => void): this
  once(event: "end", listener: () => void): this
  once(event: "readable", listener: () => void): this
  once(event: "close", listener: () => void): this
  once(event: "drain", listener: () => void): this
  once(event: "error", listener: (err: Error) => void): this
  once(event: "finish", listener: () => void): this
  once(event: "pipe", listener: (src: Readable<I>) => void): this
  once(event: "unpipe", listener: (src: Readable<I>) => void): this
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.once(event, listener)
    return this
  }

  prependListener(event: "data", listener: (chunk: any) => void): this
  prependListener(event: "end", listener: () => void): this
  prependListener(event: "readable", listener: () => void): this
  prependListener(event: "close", listener: () => void): this
  prependListener(event: "drain", listener: () => void): this
  prependListener(event: "error", listener: (err: Error) => void): this
  prependListener(event: "finish", listener: () => void): this
  prependListener(event: "pipe", listener: (src: Readable<I>) => void): this
  prependListener(event: "unpipe", listener: (src: Readable<I>) => void): this
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependListener(event, listener)
    return this
  }

  prependOnceListener(event: "data", listener: (chunk: any) => void): this
  prependOnceListener(event: "end", listener: () => void): this
  prependOnceListener(event: "readable", listener: () => void): this
  prependOnceListener(event: "close", listener: () => void): this
  prependOnceListener(event: "drain", listener: () => void): this
  prependOnceListener(event: "error", listener: (err: Error) => void): this
  prependOnceListener(event: "finish", listener: () => void): this
  prependOnceListener(event: "pipe", listener: (src: Readable<I>) => void): this
  prependOnceListener(event: "unpipe", listener: (src: Readable<I>) => void): this
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependOnceListener(event, listener)
    return this
  }

  removeListener(event: "data", listener: (chunk: any) => void): this
  removeListener(event: "end", listener: () => void): this
  removeListener(event: "readable", listener: () => void): this
  removeListener(event: "close", listener: () => void): this
  removeListener(event: "drain", listener: () => void): this
  removeListener(event: "error", listener: (err: Error) => void): this
  removeListener(event: "finish", listener: () => void): this
  removeListener(event: "pipe", listener: (src: Readable<I>) => void): this
  removeListener(event: "unpipe", listener: (src: Readable<I>) => void): this
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.removeListener(event, listener)
    return this
  }

}

/***
 * TRANSFORM
 */
export type TransformCallback<O> = (error?: Error | null, data?: O) => void

export interface TransformOptions<I, O> extends DuplexOptions<I, O> {
  read? (this: Transform<I, O>, size: number): void
  write? (this: Transform<I, O>, chunk: I, encoding: string, callback: (error?: Error | null) => void): void
  writev? (this: Transform<I, O>, chunks: Array<{ chunk: I, encoding: string }>, callback: (error?: Error | null) => void): void
  final? (this: Transform<I, O>, callback: (error?: Error | null) => void): void
  destroy? (this: Transform<I, O>, error: Error | null, callback: (error: Error | null) => void): void
  transform? (this: Transform<I, O>, chunk: I, encoding: string, callback: TransformCallback<O>): void
  flush? (this: Transform<I, O>, callback: TransformCallback<O>): void
}

export  class Transform<I, O> extends Duplex<I, O> {
  constructor(opts?: TransformOptions<I, O>) {
    super(opts)
  }

  _createStream (opts?: WritableOptions<I>): stream.Duplex {
    return new stream.Transform(opts as stream.TransformOptions)
  }
}

export  class PassThrough<I> extends Transform<I, I> { }

