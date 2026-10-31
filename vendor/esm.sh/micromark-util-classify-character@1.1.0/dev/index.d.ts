/**
 * Classify whether a code represents whitespace, punctuation, or something
 * else.
 *
 * Used for attention (emphasis, strong), whose sequences can open or close
 * based on the class of surrounding characters.
 *
 * > 👉 **Note**: eof (`null`) is seen as whitespace.
 *
 * @param {Code} code
 *   Code.
 * @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
 *   Group.
 */
export function classifyCharacter(
  code: Code
):
  | typeof constants.characterGroupWhitespace
  | typeof constants.characterGroupPunctuation
  | undefined
export type Code = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Code
import {constants} from 'https://esm.sh/micromark-util-symbol@1.1.0/constants.d.ts'
