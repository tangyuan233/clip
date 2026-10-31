/* esm.sh - mdast-util-to-markdown@1.5.0/lib/util/indent-lines */
var r=/\r?\n|\r/g;function h(e,l){let t=[],i=0,s=0,n;for(;n=r.exec(e);)c(e.slice(i,n.index)),t.push(n[0]),i=n.index+n[0].length,s++;return c(e.slice(i)),t.join("");function c(o){t.push(l(o,s,!o))}}export{h as indentLines};
//# sourceMappingURL=indent-lines.mjs.map