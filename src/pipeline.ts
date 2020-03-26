import * as stream from 'stream'
import * as util from 'util'
import { Writable } from './writable'
import { Readable } from './readable'
import { Duplex } from './duplex'

/**
 * Many many thanks to this post on freeCodeCamp about advanced Typescript
 * https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
 */

// Utility types
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never
type Tail<T extends any[]> =  ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : []
type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

// Stream connection types
type Out<S> = S extends Readable<infer O> ? O : S extends Duplex<any, infer O> ? O : never
type In<S> = S extends Writable<infer I> ? I : S extends Duplex<infer I, any> ? I : never
type CanJoin<S1, S2> = Out<S1> extends In<S2>? true: false

// Evaluate an array of streams and determine their pipe-ability
type CanPipe<T extends any[]> = {
  0: CanPipe<Tail<T>>
  1: false
  2: true
}[
  HasTail<T> extends true
  ? CanJoin<Head<T>, Head<Tail<T>>> extends true ? 0 : 1
  : 2
]

// Infer arguments from any[] and determine pipe-ability
type PipeableArgs<A extends any[]> = CanPipe<A> extends true ? A : never

// The pipe-ability checked, promisified, pipeline function
const prPipeline = util.promisify(stream.pipeline)
export function pipeline<A extends any[]> (...args: PipeableArgs<A>): Promise<void> {
  if (args.length < 2) {
    throw Error('At least two streams are required for pipeline()')
  }
  const a0 = args.shift()
  const a1 = args.shift()
  return prPipeline(a0.stream, a1.stream, ...args.map((a) => a.stream))
}

// Testing
// const pp = pipeline(
//   new Readable<Buffer>(), 
//   new Duplex<Buffer, Buffer>(),
//   new Writable<string>()
// )
