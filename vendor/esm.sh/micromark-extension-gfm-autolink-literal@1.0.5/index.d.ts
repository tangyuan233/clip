export {gfmAutolinkLiteral} from './lib/syntax.d.ts'
export {gfmAutolinkLiteralHtml} from './lib/html.d.ts'

declare module 'https://esm.sh/micromark-util-types@1.1.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Token {
    _gfmAutolinkLiteralWalkedInto?: boolean
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TokenTypeMap {
    literalAutolink: 'literalAutolink'
    literalAutolinkEmail: 'literalAutolinkEmail'
    literalAutolinkHttp: 'literalAutolinkHttp'
    literalAutolinkWww: 'literalAutolinkWww'
  }
}
