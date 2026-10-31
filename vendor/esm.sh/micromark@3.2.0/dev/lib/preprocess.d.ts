/**
 * @returns {Preprocessor}
 */
export function preprocess(): Preprocessor
export type Chunk = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Chunk
export type Code = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Code
export type Encoding = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Encoding
export type Value = import('https://esm.sh/micromark-util-types@1.1.0/index.d.ts').Value
export type Preprocessor = (
  value: Value,
  encoding?: Encoding | null | undefined,
  end?: boolean | null | undefined
) => Array<Chunk>
