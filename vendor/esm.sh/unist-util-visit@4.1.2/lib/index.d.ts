/**
 * Visit nodes.
 *
 * This algorithm performs *depth-first* *tree traversal* in *preorder*
 * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).
 *
 * You can choose for which nodes `visitor` is called by passing a `test`.
 * For complex tests, you should test yourself in `visitor`, as it will be
 * faster and will have improved type information.
 *
 * Walking the tree is an intensive task.
 * Make use of the return values of the visitor when possible.
 * Instead of walking a tree multiple times, walk it once, use `unist-util-is`
 * to check if a node matches, and then perform different operations.
 *
 * You can change the tree.
 * See `Visitor` for more info.
 *
 * @param tree
 *   Tree to traverse.
 * @param test
 *   `unist-util-is`-compatible test
 * @param visitor
 *   Handle each node.
 * @param reverse
 *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).
 * @returns
 *   Nothing.
 */
export const visit: (<
  Tree extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Check extends import('https://esm.sh/unist-util-is@5.2.1/lib/index.js').Test
>(
  tree: Tree,
  test: Check,
  visitor: BuildVisitor<Tree, Check>,
  reverse?: boolean | null | undefined
) => void) &
  (<Tree_1 extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>>(
    tree: Tree_1,
    visitor: BuildVisitor<Tree_1, string>,
    reverse?: boolean | null | undefined
  ) => void)
export type Node = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node
export type Parent = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Parent
export type Test = import('https://esm.sh/unist-util-is@5.2.1/index.d.ts').Test
export type VisitorResult = import('https://esm.sh/unist-util-visit-parents@5.1.3/index.d.ts').VisitorResult
/**
 * Check if `Child` can be a child of `Ancestor`.
 *
 * Returns the ancestor when `Child` can be a child of `Ancestor`, or returns
 * `never`.
 */
export type ParentsOf<
  Ancestor extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Child extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>
> = Ancestor extends Parent
  ? Child extends Ancestor['children'][number]
    ? Ancestor
    : never
  : never
/**
 * Handle a node (matching `test`, if given).
 *
 * Visitors are free to transform `node`.
 * They can also transform `parent`.
 *
 * Replacing `node` itself, if `SKIP` is not returned, still causes its
 * descendants to be walked (which is a bug).
 *
 * When adding or removing previous siblings of `node` (or next siblings, in
 * case of reverse), the `Visitor` should return a new `Index` to specify the
 * sibling to traverse after `node` is traversed.
 * Adding or removing next siblings of `node` (or previous siblings, in case
 * of reverse) is handled as expected without needing to return a new `Index`.
 *
 * Removing the children property of `parent` still results in them being
 * traversed.
 */
export type Visitor<
  Visited extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data
  > = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Ancestor extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Parent<
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data
  > = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Parent<
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data
  >
> = (
  node: Visited,
  index: Visited extends Node ? number | null : never,
  parent: Ancestor extends Node ? Ancestor | null : never
) => VisitorResult
/**
 * Build a typed `Visitor` function from a node and all possible parents.
 *
 * It will infer which values are passed as `node` and which as `parent`.
 */
export type BuildVisitorFromMatch<
  Visited extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Ancestor extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Parent<
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data
  >
> = Visitor<Visited, ParentsOf<Ancestor, Visited>>
/**
 * Build a typed `Visitor` function from a list of descendants and a test.
 *
 * It will infer which values are passed as `node` and which as `parent`.
 */
export type BuildVisitorFromDescendants<
  Descendant extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Check extends import('https://esm.sh/unist-util-is@5.2.1/lib/index.js').Test
> = BuildVisitorFromMatch<
  import('https://esm.sh/unist-util-visit-parents@5.1.3/complex-types.js').Matches<
    Descendant,
    Check
  >,
  Extract<Descendant, Parent>
>
/**
 * Build a typed `Visitor` function from a tree and a test.
 *
 * It will infer which values are passed as `node` and which as `parent`.
 */
export type BuildVisitor<
  Tree extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<
    import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data
  > = import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>,
  Check extends import('https://esm.sh/unist-util-is@5.2.1/lib/index.js').Test = string
> = BuildVisitorFromDescendants<
  import('https://esm.sh/unist-util-visit-parents@5.1.3/complex-types.js').InclusiveDescendant<Tree>,
  Check
>
export {CONTINUE, EXIT, SKIP} from 'https://esm.sh/unist-util-visit-parents@5.1.3/index.d.ts'
