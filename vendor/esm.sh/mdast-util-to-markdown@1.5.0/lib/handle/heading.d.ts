/**
 * @param {Heading} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function heading(
  node: Heading,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export type Heading = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Heading
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
