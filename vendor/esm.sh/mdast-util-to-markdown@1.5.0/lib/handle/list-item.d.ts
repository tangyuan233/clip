/**
 * @param {ListItem} node
 * @param {Parent | undefined} parent
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function listItem(
  node: ListItem,
  parent: Parent | undefined,
  state: State,
  info: Info
): string
export type ListItem = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ListItem
export type Map = import('../types.d.ts').Map
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
