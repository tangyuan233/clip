import type {Align} from './lib/infer.d.ts'

export {gfmTableHtml} from './lib/html.d.ts'
export {gfmTable} from './lib/syntax.d.ts'

declare module 'https://esm.sh/micromark-util-types@1.1.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Token {
    _align?: Align[]
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TokenTypeMap {
    table: 'table'
    tableBody: 'tableBody'
    tableCellDivider: 'tableCellDivider'
    tableContent: 'tableContent'
    tableData: 'tableData'
    tableDelimiter: 'tableDelimiter'
    tableDelimiterFiller: 'tableDelimiterFiller'
    tableDelimiterMarker: 'tableDelimiterMarker'
    tableDelimiterRow: 'tableDelimiterRow'
    tableHead: 'tableHead'
    tableHeader: 'tableHeader'
    tableRow: 'tableRow'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CompileData {
    tableAlign?: Align[]
    tableColumn?: number
  }
}
