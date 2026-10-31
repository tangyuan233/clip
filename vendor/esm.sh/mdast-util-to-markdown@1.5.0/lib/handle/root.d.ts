/**
 * @param {Root} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function root(
  node: Root,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export type Root = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Root
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
