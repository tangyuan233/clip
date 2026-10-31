/**
 * @typedef {import('mdast').Text} Text
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').State} State
 * @typedef {import('../types.js').Info} Info
 */
/**
 * @param {Text} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function text(
  node: Text,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export type Text = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Text
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
