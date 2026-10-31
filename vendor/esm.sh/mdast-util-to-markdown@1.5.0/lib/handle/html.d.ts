/**
 * @param {HTML} node
 * @returns {string}
 */
export function html(node: HTML): string
export namespace html {
  export {htmlPeek as peek}
}
export type HTML = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').HTML
/**
 * @returns {string}
 */
declare function htmlPeek(): string
export {}
