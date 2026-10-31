/* eslint-disable @typescript-eslint/ban-types */

import type {Node, Parent} from 'https://esm.sh/@types/unist@2.0.11/index.d.ts'
import type {Test} from 'https://esm.sh/unist-util-is@5.2.1/index.d.ts'
import type {Visitor} from './index.d.ts'

/**
 * Internal utility to collect all descendants of in `Tree`.
 */
export type InclusiveDescendant<
  Tree extends Node = never,
  Found = void
> = Tree extends Parent
  ?
      | Tree
      | InclusiveDescendant<
          Exclude<Tree['children'][number], Found | Tree>,
          Found | Tree
        >
  : Tree

/**
 * Infer the thing that is asserted from a type guard.
 */
type Predicate<Fn, Fallback = never> = Fn extends (
  value: any
) => value is infer Thing
  ? Thing
  : Fallback

/**
 * Check if a node matches a test.
 *
 * Returns either the node if it matches or `never` otherwise.
 */
type MatchesOne<Value, Check> =
  // Is this a node?
  Value extends Node
    ? // No test.
      Check extends null
      ? Value
      : // No test.
      Check extends undefined
      ? Value
      : // Function test.
      Check extends Function
      ? Extract<Value, Predicate<Check, Value>>
      : // String (type) test.
      Value['type'] extends Check
      ? Value
      : // Partial test.
      Value extends Check
      ? Value
      : never
    : never

/**
 * Check if a node matches one or more tests.
 *
 * Returns either the node if it matches or `never` otherwise.
 */
export type Matches<Value, Check> =
  // Is this a list?
  Check extends Array<any>
    ? MatchesOne<Value, Check[keyof Check]>
    : MatchesOne<Value, Check>
/* eslint-enable @typescript-eslint/ban-types */
