/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @returns {Array<FromMarkdownExtension>}
 *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmFromMarkdown(): Array<FromMarkdownExtension>
/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmToMarkdown(
  options?: Options | null | undefined
): ToMarkdownExtension
export type FromMarkdownExtension = import('https://esm.sh/mdast-util-from-markdown@1.3.1/index.d.ts').Extension
export type ToMarkdownExtension = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Options
/**
 * Configuration.
 */
export type Options = import('https://esm.sh/mdast-util-gfm-table@1.0.7/index.d.ts').Options
