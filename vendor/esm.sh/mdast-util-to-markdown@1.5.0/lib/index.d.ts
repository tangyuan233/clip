/**
 * Turn an mdast syntax tree into markdown.
 *
 * @param {Node} tree
 *   Tree to serialize.
 * @param {Options} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Serialized markdown representing `tree`.
 */
export function toMarkdown(
  tree: Node,
  options?: import('./types.d.ts').Options | undefined
): string
export type Enter = import('./types.d.ts').Enter
export type Info = import('./types.d.ts').Info
export type Join = import('./types.d.ts').Join
export type FlowContent = import('./types.d.ts').FlowContent
export type Node = import('./types.d.ts').Node
export type Options = import('./types.d.ts').Options
export type Parent = import('./types.d.ts').Parent
export type PhrasingContent = import('./types.d.ts').PhrasingContent
export type SafeConfig = import('./types.d.ts').SafeConfig
export type State = import('./types.d.ts').State
export type TrackFields = import('./types.d.ts').TrackFields
