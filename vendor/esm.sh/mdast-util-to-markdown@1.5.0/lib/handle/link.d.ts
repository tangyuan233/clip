/**
 * @param {Link} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @param {Info} info
 * @returns {string}
 */
export function link(
  node: Link,
  _: Parent | undefined,
  state: State,
  info: Info
): string
export namespace link {
  export {linkPeek as peek}
}
export type Link = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Link
export type Parent = import('../types.d.ts').Parent
export type State = import('../types.d.ts').State
export type Info = import('../types.d.ts').Info
export type Exit = import('../types.d.ts').Exit
/**
 * @param {Link} node
 * @param {Parent | undefined} _
 * @param {State} state
 * @returns {string}
 */
declare function linkPeek(
  node: Link,
  _: Parent | undefined,
  state: State
): string
export {}
