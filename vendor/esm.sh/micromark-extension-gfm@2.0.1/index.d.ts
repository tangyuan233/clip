/**
 * Support GFM or markdown on github.com.
 *
 * @param {Options} [options]
 * @returns {Extension}
 */
export function gfm(
  options?:
    | import('https://esm.sh/micromark-extension-gfm-strikethrough@1.0.7/lib/syntax.d.ts').Options
    | undefined
): Extension
/**
 * Support to compile GFM to HTML.
 *
 * @param {HtmlOptions} [options]
 * @returns {HtmlExtension}
 */
export function gfmHtml(
  options?:
    | import('https://esm.sh/micromark-extension-gfm-footnote@1.1.2/lib/html.d.ts').Options
    | undefined
): HtmlExtension
export type Extension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Extension
export type HtmlExtension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').HtmlExtension
export type Options = import('https://esm.sh/micromark-extension-gfm-strikethrough@1.0.7/index.d.ts').Options
export type HtmlOptions = import('https://esm.sh/micromark-extension-gfm-footnote@1.1.2/index.d.ts').HtmlOptions
