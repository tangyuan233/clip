export {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown
} from './lib/index.d.ts'

// Add custom data tracked to turn a syntax tree into markdown.
declare module 'https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ConstructNameMap {
    /**
     * Whole strikethrough.
     *
     * ```markdown
     * > | ~~a~~
     *     ^^^^^
     * ```
     */
    strikethrough: 'strikethrough'
  }
}
