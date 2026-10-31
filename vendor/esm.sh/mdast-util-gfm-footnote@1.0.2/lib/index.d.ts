/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM footnotes
 * in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function gfmFootnoteFromMarkdown(): FromMarkdownExtension
/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM footnotes
 * in markdown.
 *
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown`.
 */
export function gfmFootnoteToMarkdown(): ToMarkdownExtension
export type FootnoteReference = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').FootnoteReference
export type FootnoteDefinition = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').FootnoteDefinition
export type CompileContext = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').CompileContext
export type FromMarkdownExtension = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').Extension
export type FromMarkdownHandle = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').Handle
export type ToMarkdownExtension = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Options
export type ToMarkdownHandle = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Handle
export type Map = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Map
