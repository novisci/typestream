import * as stream from 'stream'
import { Stream, Options } from './stream'
import { Readable } from './readable'

/***
 * WRITABLE
 */
export interface WritableOptions<I> extends Options<I, I> {
  highWaterMark?: number
  decodeStrings?: boolean
  defaultEncoding?: string
  objectMode?: boolean
  emitClose?: boolean
  write? (this: Writable<I>, chunk: I, encoding: string, callback: (error?: Error | null) => void): void
  writev? (this: Writable<I>, chunks: Array<{ chunk: I, encoding: string }>, callback: (error?: Error | null) => void): void
  destroy? (this: Writable<I>, error: Error | null, callback: (error: Error | null) => void): void
  final? (this: Writable<I>, callback: (error?: Error | null) => void): void
  autoDestroy?: boolean
}

const writableEvents = ['close', 'drain', 'error', 'finish', 'pipe', 'unpipe'] as const
type WritableEvent = typeof writableEvents[number]

type CbVoid = () => void
type CbError = (error: Error | null | undefined) => void

export class Writable<I> extends Stream<I, I, stream.Writable, WritableOptions<I>> {
  constructor (opts?: WritableOptions<I>) {
    super(opts)
  }

  _createStream (opts?: WritableOptions<I>): stream.Writable {
    return new stream.Writable(opts as stream.WritableOptions)
  }

  destroy (error?: Error): void {
    return this.stream.destroy(error)
  }

  _destroy (error: Error|null, cb:(error?: Error | null | undefined) => void): void {
    return this.stream._destroy(error, cb)
  }

  end (cb?: CbVoid): void
  end (chunk: I, cb?: CbVoid): void
  end (chunk: I, encoding?: string, cb?: CbVoid): void
  end (chunk?: I | CbVoid, encoding?: string | CbVoid, cb?:CbVoid): void {
    return this.stream.end(chunk, encoding as string, cb)
  }

  write (chunk: I, cb?: CbError): boolean
  write (chunk: I, encoding: string, cb?: CbError): boolean
  write (chunk: I, encoding?: string | CbError, cb?: CbError): boolean {
    return this.stream.write(chunk, encoding as string, cb)
  }

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

  emit(event: "close"): boolean
  emit(event: "drain"): boolean
  emit(event: "error", err: Error): boolean
  emit(event: "finish"): boolean
  emit(event: "pipe", src: Readable<I>): boolean
  emit(event: "unpipe", src: Readable<I>): boolean
  emit(event: string | symbol, ...args: any[]): boolean {
    return this.stream.emit(event, ...args)
  }

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
