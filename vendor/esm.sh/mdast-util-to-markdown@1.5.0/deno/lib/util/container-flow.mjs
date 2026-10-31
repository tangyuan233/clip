/* esm.sh - mdast-util-to-markdown@1.5.0/lib/util/container-flow */
function f(t,e,o){let r=e.indexStack,i=t.children||[],n=e.createTracker(o),c=[],l=-1;for(r.push(-1);++l<i.length;){let u=i[l];r[r.length-1]=l,c.push(n.move(e.handle(u,t,e,{before:`
`,after:`
`,...n.current()}))),u.type!=="list"&&(e.bulletLastUsed=void 0),l<i.length-1&&c.push(n.move(h(u,i[l+1],t,e)))}return r.pop(),c.join("")}function h(t,e,o,r){let i=r.join.length;for(;i--;){let n=r.join[i](t,e,o,r);if(n===!0||n===1)break;if(typeof n=="number")return`
`.repeat(1+n);if(n===!1)return`

<!---->

`}return`

`}export{f as containerFlow};
//# sourceMappingURL=container-flow.mjs.map