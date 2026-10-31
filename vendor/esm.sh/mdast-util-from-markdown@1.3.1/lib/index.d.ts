/**
 * @param value
 *   Markdown to parse.
 * @param encoding
 *   Character encoding for when `value` is `Buffer`.
 * @param options
 *   Configuration.
 * @returns
 *   mdast tree.
 */
export const fromMarkdown: ((
  value: Value,
  encoding: Encoding,
  options?: Options | null | undefined
) => Root) &
  ((value: Value, options?: Options | null | undefined) => Root)
export type Encoding = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Encoding
export type Event = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event
export type ParseOptions = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').ParseOptions
export type Token = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Token
export type TokenizeContext = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenizeContext
export type Value = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Value
export type UnistParent = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Parent
export type Point = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Point
export type PhrasingContent = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').PhrasingContent
export type StaticPhrasingContent = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').StaticPhrasingContent
export type Content = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Content
export type Break = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Break
export type Blockquote = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Blockquote
export type Code = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Code
export type Definition = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Definition
export type Emphasis = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Emphasis
export type Heading = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Heading
export type HTML = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').HTML
export type Image = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Image
export type ImageReference = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ImageReference
export type InlineCode = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').InlineCode
export type Link = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Link
export type LinkReference = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').LinkReference
export type List = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').List
export type ListItem = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ListItem
export type Paragraph = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Paragraph
export type Root = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Root
export type Strong = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Strong
export type Text = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Text
export type ThematicBreak = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ThematicBreak
export type ReferenceType = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ReferenceType
export type CompileData = import('../index.d.ts').CompileData
export type Node = Root | Content
export type Parent = Extract<Node, UnistParent>
export type Fragment = Omit<UnistParent, 'type' | 'children'> & {
  type: 'fragment'
  children: Array<PhrasingContent>
}
/**
 * Extra transform, to change the AST afterwards.
 */
export type Transform = (tree: Root) => Root | undefined | null | void
/**
 * Handle a token.
 */
export type Handle = (this: CompileContext, token: Token) => void
/**
 * Token types mapping to handles
 */
export type Handles = Record<string, Handle>
/**
 * Handle the case where the `right` token is open, but it is closed (by the
 * `left` token) or because we reached the end of the document.
 */
export type OnEnterError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token | undefined,
  right: Token
) => void
/**
 * Handle the case where the `right` token is open but it is closed by
 * exiting the `left` token.
 */
export type OnExitError = (
  this: Omit<CompileContext, 'sliceSerialize'>,
  left: Token,
  right: Token
) => void
/**
 * Open token on the stack, with an optional error handler for when
 * that token isn’t closed properly.
 */
export type TokenTuple = [Token, OnEnterError | undefined]
/**
 * Configuration.
 *
 * We have our defaults, but extensions will add more.
 */
export type Config = {
  /**
   *   Token types where line endings are used.
   */
  canContainEols: Array<string>
  /**
   *   Opening handles.
   */
  enter: Handles
  /**
   *   Closing handles.
   */
  exit: Handles
  /**
   *   Tree transforms.
   */
  transforms: Array<Transform>
}
/**
 * Change how markdown tokens from micromark are turned into mdast.
 */
export type Extension = Partial<Config>
/**
 * mdast compiler context.
 */
export type CompileContext = {
  /**
   *   Stack of nodes.
   */
  stack: Array<Node | Fragment>
  /**
   *   Stack of tokens.
   */
  tokenStack: Array<TokenTuple>
  /**
   *   Get data from the key/value store.
   */
  getData: <Key extends keyof import('../index.d.ts').CompileData>(
    key: Key
  ) => import('../index.d.ts').CompileData[Key]
  /**
   *   Set data into the key/value store.
   */
  setData: <Key_1 extends keyof import('../index.d.ts').CompileData>(
    key: Key_1,
    value?: import('../index.d.ts').CompileData[Key_1] | undefined
  ) => void
  /**
   *   Capture some of the output data.
   */
  buffer: (this: CompileContext) => void
  /**
   *   Stop capturing and access the output data.
   */
  resume: (this: CompileContext) => string
  /**
   *   Enter a token.
   */
  enter: <Kind extends Node>(
    this: CompileContext,
    node: Kind,
    token: Token,
    onError?: OnEnterError
  ) => Kind
  /**
   *   Exit a token.
   */
  exit: (this: CompileContext, token: Token, onError?: OnExitError) => Node
  /**
   *   Get the string value of a token.
   */
  sliceSerialize: TokenizeContext['sliceSerialize']
  /**
   *   Configuration.
   */
  config: Config
}
/**
 * Configuration for how to build mdast.
 */
export type FromMarkdownOptions = {
  /**
   * Extensions for this utility to change how tokens are turned into a tree.
   */
  mdastExtensions?: Array<Extension | Array<Extension>> | null | undefined
}
/**
 * Configuration.
 */
export type Options = ParseOptions & FromMarkdownOptions
