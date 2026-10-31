/**
 * @typedef {import('../types.js').Handle} Handle
 * @typedef {import('../types.js').Info} Info
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').PhrasingContent} PhrasingContent
 * @typedef {import('../types.js').State} State
 */
/**
 * Serialize the children of a parent that contains phrasing children.
 *
 * These children will be joined flush together.
 *
 * @param {Parent & {children: Array<PhrasingContent>}} parent
 *   Parent of flow nodes.
 * @param {State} state
 *   Info passed around about the current state.
 * @param {Info} info
 *   Info on where we are in the document we are generating.
 * @returns {string}
 *   Serialized children, joined together.
 */
export function containerPhrasing(
  parent: import('../types.d.ts').Parent & {
    children: Array<PhrasingContent>
  },
  state: State,
  info: Info
): string
export type Handle = import('../types.d.ts').Handle
export type Info = import('../types.d.ts').Info
export type Parent = import('../types.d.ts').Parent
export type PhrasingContent = import('../types.d.ts').PhrasingContent
export type State = import('../types.d.ts').State
