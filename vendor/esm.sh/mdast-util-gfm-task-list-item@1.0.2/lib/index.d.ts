/**
 * Extension for `mdast-util-from-markdown` to enable GFM task list items.
 *
 * @type {FromMarkdownExtension}
 */
export const gfmTaskListItemFromMarkdown: FromMarkdownExtension
/**
 * Extension for `mdast-util-to-markdown` to enable GFM task list items.
 *
 * @type {ToMarkdownExtension}
 */
export const gfmTaskListItemToMarkdown: ToMarkdownExtension
export type Content = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Content
export type ListItem = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').ListItem
export type Paragraph = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Paragraph
export type Parent = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Parent
export type Root = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').Root
export type CompileContext = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').CompileContext
export type FromMarkdownExtension = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').Extension
export type FromMarkdownHandle = import('https://esm.sh/mdast-util-from-markdown@2.0.2/index.d.ts').Handle
export type ToMarkdownExtension = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Options
export type ToMarkdownHandle = import('https://esm.sh/mdast-util-to-markdown@1.5.0/index.d.ts').Handle
export type Parents = Extract<Root | Content, Parent>
