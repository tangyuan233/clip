/**
 * @param {InlineCode} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @returns {string}
 */
export function inlineCode(
  node: InlineCode,
  _: Parent | undefined,
  state: State
): string
export namespace inlineCode {
  export {inlineCodePeek as peek}
}
export type InlineCode = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').InlineCode
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
/**
 * @returns {string}
 */
declare function inlineCodePeek(): string
export {}
