import * as stream from 'stream'
import * as events from 'events'
import { Writable } from './writable'

/***
 * STREAM
 */
export interface Options<I, O> {
  stream?: stream.Stream
  [key: string]: any
}

export abstract class Stream<I, O, S extends stream.Stream, Opts extends Options<I, O>> extends events.EventEmitter {
  stream: S

  constructor (opts?: Opts) {
    super()
    if (opts && opts.stream) {
      this.stream = opts.stream as S
    } else {
      this.stream = this._createStream(opts)
    }
  }

  abstract _createStream (opts?: Opts): S

  pipe<I> (destination: Writable<I>, options?: { end?: boolean }): Writable<I> {
    this.stream.pipe(destination.stream as NodeJS.WritableStream, options)
    return destination
  }
}

