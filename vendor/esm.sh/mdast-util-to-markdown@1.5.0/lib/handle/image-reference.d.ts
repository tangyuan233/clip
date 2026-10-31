/**
 * @param {ImageReference} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function imageReference(
  node: ImageReference,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export namespace imageReference {
  export {imageReferencePeek as peek}
}
export type ImageReference = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ImageReference
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
/**
 * @returns {string}
 */
declare function imageReferencePeek(): string
export {}
