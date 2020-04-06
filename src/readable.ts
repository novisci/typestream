import * as stream from 'stream'
import { Stream, Options } from './stream'
import { Writable } from './writable'

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

// export interface NotifyData {
//   type: string,
//   [key: string]: any
// }

export class Readable<O> extends Stream<O, O, stream.Readable, ReadableOptions<O>> {
  constructor (opts?: ReadableOptions<O>) {
    super(opts)
  }

  _createStream (opts?: ReadableOptions<O>): stream.Readable {
    return new stream.Readable(opts as stream.ReadableOptions)
  }

  read (count?: number): any {
    return this.stream.read(count)
  }

  push (chunk: O|null, encoding?: string): boolean {
    return this.stream.push(chunk, encoding)
  }

  destroy (error?: Error): void {
    return this.stream.destroy(error)
  }

  _destroy (error: Error|null, cb:(error?: Error | null | undefined) => void): void {
    return this.stream._destroy(error, cb)
  }

  unpipe(destination?: Writable<O>): this {
    this.stream.unpipe(destination as unknown as  NodeJS.WritableStream)
    return this
  }

  addListener(event: "close", listener: () => void): this
  addListener(event: "data", listener: (chunk: any) => void): this
  addListener(event: "end", listener: () => void): this
  addListener(event: "readable", listener: () => void): this
  addListener(event: "error", listener: (err: Error) => void): this
  // addListener(event: "notify", listener: (data: NotifyData) => void): this
  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.addListener(event, listener)
    return this
  }

  emit(event: "close"): boolean
  emit(event: "data", chunk: any): boolean
  emit(event: "end"): boolean
  emit(event: "readable"): boolean
  emit(event: "error", err: Error): boolean
  // emit(event: "notify", data: NotifyData): boolean
  emit(event: string | symbol, ...args: any[]): boolean {
    return this.stream.emit(event, ...args)
  }

  // on(event: "close", listener: () => void): this
  // on(event: "data", listener: (chunk: any) => void): this
  // on(event: "end", listener: () => void): this
  // on(event: "readable", listener: () => void): this
  // on(event: "error", listener: (err: Error) => void): this
  // // on(event: "notify", listener: (data: NotifyData) => void): this
  // on(event: string | symbol, listener: (...args: any[]) => void): this {
  //   this.stream.on(event, listener)
  //   return this
  // }
  on: Readable.On<O>

  once(event: "close", listener: () => void): this
  once(event: "data", listener: (chunk: any) => void): this
  once(event: "end", listener: () => void): this
  once(event: "readable", listener: () => void): this
  once(event: "error", listener: (err: Error) => void): this
  // once(event: "notify", listener: (data: NotifyData) => void): this
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.once(event, listener)
    return this
  }

  prependListener(event: "close", listener: () => void): this
  prependListener(event: "data", listener: (chunk: any) => void): this
  prependListener(event: "end", listener: () => void): this
  prependListener(event: "readable", listener: () => void): this
  prependListener(event: "error", listener: (err: Error) => void): this
  // prependListener(event: "notify", listener: (data: NotifyData) => void): this
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependListener(event, listener)
    return this
  }

  prependOnceListener(event: "close", listener: () => void): this
  prependOnceListener(event: "data", listener: (chunk: any) => void): this
  prependOnceListener(event: "end", listener: () => void): this
  prependOnceListener(event: "readable", listener: () => void): this
  prependOnceListener(event: "error", listener: (err: Error) => void): this
  // prependOnceListener(event: "notify", listener: (data: NotifyData) => void): this
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.prependOnceListener(event, listener)
    return this
  }

  removeListener(event: "close", listener: () => void): this
  removeListener(event: "data", listener: (chunk: any) => void): this
  removeListener(event: "end", listener: () => void): this
  removeListener(event: "readable", listener: () => void): this
  removeListener(event: "error", listener: (err: Error) => void): this
  // removeListener(event: "notify", listener: (data: NotifyData) => void): this
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
    this.stream.removeListener(event, listener)
    return this
  }

}

namespace Readable {
  export interface On<O> {
    (event: "close", listener: () => void): this
    (event: "data", listener: (chunk: any) => void): this
    (event: "end", listener: () => void): this
    (event: "readable", listener: () => void): this
    (event: "error", listener: (err: Error) => void): this
    (event: string | symbol, listener: (...args: any[]) => void): this
  }

  export function on (event: string | symbol, listener: (...args: any[]) => void): Readable {
    this.stream.on(event, listener)
    return this
  }
}

// Readable.prototype.on = function (event: string | symbol, listener: (...args: any[]) => void): Readable {
//   this.stream.on(event, listener)
//   return this
// }
