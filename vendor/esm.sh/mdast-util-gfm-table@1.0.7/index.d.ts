export type {Options} from './lib/index.d.ts'

export {gfmTableFromMarkdown, gfmTableToMarkdown} from './lib/index.d.ts'

// Add custom data tracked to turn markdown into a tree.
declare module 'https://esm.sh/mdast-util-from-markdown@1.3.1/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CompileData {
    /**
     * Whether we’re currently in a table.
     */
    inTable?: boolean | undefined
  }
}

// Add custom data tracked to turn a syntax tree into markdown.
declare module 'https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ConstructNameMap {
    /**
     * Whole table.
     *
     * ```markdown
     * > | | a |
     *     ^^^^^
     * > | | - |
     *     ^^^^^
     * ```
     */
    table: 'table'

    /**
     * Table cell.
     *
     * ```markdown
     * > | | a |
     *     ^^^^^
     *   | | - |
     * ```
     */
    tableCell: 'tableCell'

    /**
     * Table row.
     *
     * ```markdown
     * > | | a |
     *     ^^^^^
     *   | | - |
     * ```
     */
    tableRow: 'tableRow'
  }
}

// Note: `Table` is exposed from `@types/mdast`.
