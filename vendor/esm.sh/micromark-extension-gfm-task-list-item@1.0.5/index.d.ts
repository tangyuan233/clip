export {gfmTaskListItemHtml} from './lib/html.d.ts'
export {gfmTaskListItem} from './lib/syntax.d.ts'

declare module 'https://esm.sh/micromark-util-types@1.1.0/index.d.ts' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TokenTypeMap {
    taskListCheck: 'taskListCheck'
    taskListCheckMarker: 'taskListCheckMarker'
    taskListCheckValueChecked: 'taskListCheckValueChecked'
    taskListCheckValueUnchecked: 'taskListCheckValueUnchecked'
  }
}
