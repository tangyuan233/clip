/**
 * Parse titles.
 *
 * ###### Examples
 *
 * ```markdown
 * "a"
 * 'b'
 * (c)
 * "a
 * b"
 * 'a
 *     b'
 * (a\)b)
 * ```
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {State} nok
 *   State switched to when unsuccessful.
 * @param {TokenType} type
 *   Type of the whole title (`"a"`, `'b'`, `(c)`).
 * @param {TokenType} markerType
 *   Type for the markers (`"`, `'`, `(`, and `)`).
 * @param {TokenType} stringType
 *   Type for the value (`a`).
 * @returns {State}
 *   Start state.
 */
export function factoryTitle(
  effects: Effects,
  ok: State,
  nok: State,
  type: TokenType,
  markerType: TokenType,
  stringType: TokenType
): State
export type Code = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Code
export type Effects = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Effects
export type State = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').State
export type TokenType = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenType
