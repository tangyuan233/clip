/**
 * Combine multiple syntax extensions into one.
 *
 * @param {Array<Extension>} extensions
 *   List of syntax extensions.
 * @returns {NormalizedExtension}
 *   A single combined extension.
 */
export function combineExtensions(
  extensions: Array<Extension>
): NormalizedExtension
/**
 * Combine multiple HTML extensions into one.
 *
 * @param {Array<HtmlExtension>} htmlExtensions
 *   List of HTML extensions.
 * @returns {HtmlExtension}
 *   A single combined HTML extension.
 */
export function combineHtmlExtensions(
  htmlExtensions: Array<HtmlExtension>
): HtmlExtension
export type Extension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Extension
export type Handles = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Handles
export type HtmlExtension = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').HtmlExtension
export type NormalizedExtension =
  import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').NormalizedExtension
