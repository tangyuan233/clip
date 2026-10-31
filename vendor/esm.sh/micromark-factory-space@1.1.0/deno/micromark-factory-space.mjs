/* esm.sh - micromark-factory-space@1.1.0 */
import{markdownSpace as m}from"/micromark-util-character@^1.0.0?target=deno";function p(n,t,i,u){let o=u?u-1:Number.POSITIVE_INFINITY,I=0;return a;function a(r){return m(r)?(n.enter(i),e(r)):t(r)}function e(r){return m(r)&&I++<o?(n.consume(r),e):(n.exit(i),t(r))}}export{p as factorySpace};
//# sourceMappingURL=micromark-factory-space.mjs.map