/**
 * @param {Emphasis} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function emphasis(
  node: Emphasis,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export namespace emphasis {
  export {emphasisPeek as peek}
}
export type Emphasis = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Emphasis
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
/**
 * @param {Emphasis} _
 * @param {Parent | undefined} _1
 * @param {State} state
 * @returns {string}
 */
declare function emphasisPeek(
  _: Emphasis,
  _1: Parent | undefined,
  state: State
): string
export {}
