/**
 * @param {Strong} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function strong(
  node: Strong,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export namespace strong {
  export {strongPeek as peek}
}
export type Strong = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Strong
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
/**
 * @param {Strong} _
 * @param {Parent | undefined} _1
 * @param {State} state
 * @returns {string}
 */
declare function strongPeek(
  _: Strong,
  _1: Parent | undefined,
  state: State
): string
export {}
