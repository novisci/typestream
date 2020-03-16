import * as stream from 'stream'
import { Stream, Options } from './stream'

// const readableEvents = ['close', 'data', 'end', 'readable', 'error'] as const
// type ReadableEvent = typeof readableEvents[number]

/***
 * READABLE
 */
export interface ReadableOptions<O> extends Options<O, O> {
  highWaterMark?: number
  encoding?: string
  objectMode?: boolean
  read? (this: Readable<O>, size: number): void
  destroy? (this: Readable<O>, error: Error | null, callback: (error: Error | null) => void): void
  autoDestroy?: boolean
}

export class Readable<O> extends Stream<O, O, stream.Readable, ReadableOptions<O>> {
  constructor (opts?: ReadableOptions<O>) {
    super(opts)
  }

  _createStream (opts?: ReadableOptions<O>): stream.Readable {
    return new stream.Readable(opts as stream.ReadableOptions)
  }

  push (chunk: O, encoding?: string): boolean {
    return this.stream.push(chunk, encoding)
  }

  destroy (error?: Error): void {
    return this.stream.destroy(error)
  }

  addListener(event: "close", listener: () => void): this
  addListener(event: "data", listener: (chunk: any) => void): this
  addListener(event: "end", listener: () => void): this
  addListener(event: "readable", listener: () => void): this
  addListener(event: "error", listener: (err: Error) => void): this
  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.addListener(event, listener)
    return this
  }

  emit(event: "close"): boolean
  emit(event: "data", chunk: any): boolean
  emit(event: "end"): boolean
  emit(event: "readable"): boolean
  emit(event: "error", err: Error): boolean
  emit(event: string | symbol, ...args: any[]): boolean {
    return this.stream.emit(event, ...args)
  }

  on(event: "close", listener: () => void): this
  on(event: "data", listener: (chunk: any) => void): this
  on(event: "end", listener: () => void): this
  on(event: "readable", listener: () => void): this
  on(event: "error", listener: (err: Error) => void): this
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.on(event, listener)
    return this
  }

  once(event: "close", listener: () => void): this
  once(event: "data", listener: (chunk: any) => void): this
  once(event: "end", listener: () => void): this
  once(event: "readable", listener: () => void): this
  once(event: "error", listener: (err: Error) => void): this
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.once(event, listener)
    return this
  }

  prependListener(event: "close", listener: () => void): this
  prependListener(event: "data", listener: (chunk: any) => void): this
  prependListener(event: "end", listener: () => void): this
  prependListener(event: "readable", listener: () => void): this
  prependListener(event: "error", listener: (err: Error) => void): this
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependListener(event, listener)
    return this
  }

  prependOnceListener(event: "close", listener: () => void): this
  prependOnceListener(event: "data", listener: (chunk: any) => void): this
  prependOnceListener(event: "end", listener: () => void): this
  prependOnceListener(event: "readable", listener: () => void): this
  prependOnceListener(event: "error", listener: (err: Error) => void): this
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependOnceListener(event, listener)
    return this
  }

  removeListener(event: "close", listener: () => void): this
  removeListener(event: "data", listener: (chunk: any) => void): this
  removeListener(event: "end", listener: () => void): this
  removeListener(event: "readable", listener: () => void): this
  removeListener(event: "error", listener: (err: Error) => void): this
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.removeListener(event, listener)
    return this
  }

}
