export {gfmStrikethroughHtml} from './lib/html.d.ts'
export {gfmStrikethrough, type Options} from './lib/syntax.d.ts'

declare module 'https://esm.sh/micromark-util-types@1.1.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TokenTypeMap {
    strikethroughSequence: 'strikethroughSequence'
    strikethroughSequenceTemporary: 'strikethroughSequenceTemporary'
    strikethrough: 'strikethrough'
    strikethroughText: 'strikethroughText'
  }
}
