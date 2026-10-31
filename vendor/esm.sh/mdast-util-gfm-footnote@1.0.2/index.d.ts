export {gfmFootnoteFromMarkdown, gfmFootnoteToMarkdown} from './lib/index.d.ts'

declare module 'https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ConstructNameMap {
    /**
     * Footnote reference.
     *
     * ```markdown
     * > | A[^b].
     *      ^^^^
     * ```
     */
    footnoteReference: 'footnoteReference'

    /**
     * Footnote definition.
     *
     * ```markdown
     * > | [^a]: B.
     *     ^^^^^^^^
     * ```
     */
    footnoteDefinition: 'footnoteDefinition'
  }
}
