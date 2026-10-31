/**
 * Figure out the alignment of a GFM table.
 *
 * @param {Array<Event>} events
 * @param {number} index
 * @returns {Array<Align>}
 */
export function gfmTableAlign(
  events: Array<import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event>,
  index: number
): Array<Align>
export type Event = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Event
export type Align = 'left' | 'center' | 'right' | 'none'
