/**
 * Create an extension for `micromark` to enable GFM strikethrough syntax.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable GFM strikethrough syntax.
 */
export function gfmStrikethrough(
  options?: Options | null | undefined
): Extension
export type Event = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event
export type Extension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Extension
export type Resolver = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Resolver
export type State = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').State
export type Token = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Token
export type TokenizeContext = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenizeContext
export type Tokenizer = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Tokenizer
/**
 * Configuration (optional).
 */
export type Options = {
  /**
   * Whether to support strikethrough with a single tilde.
   *
   * Single tildes work on github.com, but are technically prohibited by the
   * GFM spec.
   */
  singleTilde?: boolean
}
