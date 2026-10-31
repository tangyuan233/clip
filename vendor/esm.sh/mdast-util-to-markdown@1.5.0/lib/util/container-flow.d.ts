/**
 * @typedef {import('../types.js').FlowContent} FlowContent
 * @typedef {import('../types.js').Node} Node
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').State} State
 * @typedef {import('../types.js').TrackFields} TrackFields
 */
/**
 * @param {Parent & {children: Array<FlowContent>}} parent
 *   Parent of flow nodes.
 * @param {State} state
 *   Info passed around about the current state.
 * @param {TrackFields} info
 *   Info on where we are in the document we are generating.
 * @returns {string}
 *   Serialized children, joined by (blank) lines.
 */
export function containerFlow(
  parent: import('../types.d.ts').Parent & {
    children: Array<FlowContent>
  },
  state: State,
  info: TrackFields
): string
export type FlowContent = import('../types.d.ts').FlowContent
export type Node = import('../types.d.ts').Node
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type TrackFields = import('../types.d.ts').TrackFields
