/**
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 */
/**
 * Call all `resolveAll`s.
 *
 * @param {Array<{resolveAll?: Resolver | undefined}>} constructs
 *   List of constructs, optionally with `resolveAll`s.
 * @param {Array<Event>} events
 *   List of events.
 * @param {TokenizeContext} context
 *   Context used by `tokenize`.
 * @returns {Array<Event>}
 *   Changed events.
 */
export function resolveAll(
  constructs: Array<{
    resolveAll?: Resolver | undefined
  }>,
  events: Array<import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event>,
  context: TokenizeContext
): Array<import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event>
export type Event = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event
export type Resolver = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Resolver
export type TokenizeContext = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').TokenizeContext
