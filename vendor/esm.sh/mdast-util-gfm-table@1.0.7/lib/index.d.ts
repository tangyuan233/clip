/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM tables in
 * markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM tables.
 */
export function gfmTableToMarkdown(
  options?: Options | null | undefined
): ToMarkdownExtension
/**
 * Extension for `mdast-util-from-markdown` to enable GFM tables.
 *
 * @type {FromMarkdownExtension}
 */
export const gfmTableFromMarkdown: FromMarkdownExtension
export type Table = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Table
export type TableRow = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').TableRow
export type TableCell = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').TableCell
export type InlineCode = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').InlineCode
export type MarkdownTableOptions = import('https://esm.sh/markdown-table@3.0.4/index.d.ts').MarkdownTableOptions
export type CompileContext = import('https://esm.sh/mdast-util-from-markdown@1.3.1/index.d.ts').CompileContext
export type FromMarkdownExtension = import('https://esm.sh/mdast-util-from-markdown@1.3.1/index.d.ts').Extension
export type FromMarkdownHandle = import('https://esm.sh/mdast-util-from-markdown@1.3.1/index.d.ts').Handle
export type ToMarkdownExtension = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Options
export type ToMarkdownHandle = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Handle
export type ToMarkdownContext = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Context
export type SafeOptions = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').SafeOptions
/**
 * Configuration.
 */
export type Options = {
  /**
   * Whether to add a space of padding between delimiters and cells.
   */
  tableCellPadding?: boolean | null | undefined
  /**
   * Whether to align the delimiters.
   */
  tablePipeAlign?: boolean | null | undefined
  /**
   * Function to detect the length of table cell content, used when aligning
   * the delimiters between cells
   */
  stringLength?: MarkdownTableOptions['stringLength'] | null | undefined
}
