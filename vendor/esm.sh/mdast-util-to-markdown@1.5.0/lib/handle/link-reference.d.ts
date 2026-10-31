/**
 * @param {LinkReference} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function linkReference(
  node: LinkReference,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export namespace linkReference {
  export {linkReferencePeek as peek}
}
export type LinkReference = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').LinkReference
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
/**
 * @returns {string}
 */
declare function linkReferencePeek(): string
export {}
