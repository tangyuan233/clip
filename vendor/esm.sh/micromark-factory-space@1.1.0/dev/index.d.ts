/**
 * Parse spaces and tabs.
 *
 * There is no `nok` parameter:
 *
 * *   spaces in markdown are often optional, in which case this factory can be
 *     used and `ok` will be switched to whether spaces were found or not
 * *   one line ending or space can be detected with `markdownSpace(code)` right
 *     before using `factorySpace`
 *
 * ###### Examples
 *
 * Where `␉` represents a tab (plus how much it expands) and `␠` represents a
 * single space.
 *
 * ```markdown
 * ␉
 * ␠␠␠␠
 * ␉␠
 * ```
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {TokenType} type
 *   Type (`' \t'`).
 * @param {number | undefined} [max=Infinity]
 *   Max (exclusive).
 * @returns
 *   Start state.
 */
export function factorySpace(
  effects: Effects,
  ok: State,
  type: TokenType,
  max?: number | undefined
): (
  code: import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Code
) => void | import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').State
export type Effects = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Effects
export type State = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').State
export type TokenType = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenType
