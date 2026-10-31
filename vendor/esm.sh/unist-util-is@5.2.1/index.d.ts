export type Test = import('./lib/index.d.ts').Test
export type TestFunctionAnything = import('./lib/index.d.ts').TestFunctionAnything
export type AssertAnything = import('./lib/index.d.ts').AssertAnything
export type PredicateTest<
  Kind extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>
> = import('./lib/index.d.ts').PredicateTest<Kind>
export type TestFunctionPredicate<
  Kind extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>
> = import('./lib/index.d.ts').TestFunctionPredicate<Kind>
export type AssertPredicate<
  Kind extends import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Node<import('https://esm.sh/@types/unist@2.0.11/index.d.ts').Data>
> = import('./lib/index.d.ts').AssertPredicate<Kind>
export {is, convert} from './lib/index.d.ts'
