/**
 * @param {List} node
 * @param {Parent | undefined} parent
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function list(
  node: List,
  parent: Parent | undefined,
  state: State,
  info: Info
): string
export type List = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').List
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
