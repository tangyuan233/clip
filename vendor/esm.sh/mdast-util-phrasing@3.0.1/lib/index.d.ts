/**
 * Check if the given value is *phrasing content*.
 *
 * @param
 *   Thing to check, typically `Node`.
 * @returns
 *   Whether `node` is phrasing content.
 */
export const phrasing: AssertPredicatePhrasing
export type PhrasingContent = import('https://esm.sh/@types/mdast@3.0.15/index.d.ts').PhrasingContent
export type AssertPredicatePhrasing =
  import('https://esm.sh/unist-util-is@5.2.1/index.d.ts').AssertPredicate<PhrasingContent>
