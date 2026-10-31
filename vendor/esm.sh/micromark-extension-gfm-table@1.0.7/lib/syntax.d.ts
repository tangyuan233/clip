/**
 * Extension for `micromark` that can be passed in `extensions` to enable GFM
 * table syntax.
 *
 * @type {Extension}
 */
export const gfmTable: Extension
export type Event = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event
export type Extension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Extension
export type Point = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Point
export type Resolver = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Resolver
export type State = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').State
export type Token = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Token
export type TokenizeContext = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenizeContext
export type Tokenizer = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Tokenizer
/**
 * Cell info.
 */
export type Range = [number, number, number, number]
/**
 * Where we are: `1` for head row, `2` for delimiter row, `3` for body row.
 */
export type RowKind = 0 | 1 | 2 | 3
