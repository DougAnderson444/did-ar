import{S as k,i as h,s as D,e as d,b as _,t as f,d as S,f as p,h as m,o as w,g as v,v as x,w as N,x as q,y as L,q as y,r as b,u as O,A as $}from"../../../chunks/index-a4477ac1.js";import{S as C}from"../../../chunks/base64-ab7bc4eb.js";import"../../../chunks/preload-helper-aa6bc0ce.js";import{a as g}from"../../../chunks/arnsResolver-0ec1328b.js";function I(s){let e,n;return e=new C({props:{$$slots:{default:[M]},$$scope:{ctx:s}}}),{c(){x(e.$$.fragment)},l(t){N(e.$$.fragment,t)},m(t,r){q(e,t,r),n=!0},p(t,r){const c={};r&16&&(c.$$scope={dirty:r,ctx:t}),e.$set(c)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function J(s){let e=JSON.stringify(s[0],null,2)+"",n;return{c(){n=y(e)},l(t){n=b(t,e)},m(t,r){_(t,n,r)},p(t,r){r&1&&e!==(e=JSON.stringify(t[0],null,2)+"")&&O(n,e)},i:$,o:$,d(t){t&&m(n)}}}function M(s){let e;return{c(){e=y("Loading DID Doc...")},l(n){e=b(n,"Loading DID Doc...")},m(n,t){_(n,e,t)},d(n){n&&m(e)}}}function P(s){let e,n,t,r;const c=[J,I],a=[];function i(o,l){return o[0]?0:1}return e=i(s),n=a[e]=c[e](s),{c(){n.c(),t=d()},l(o){n.l(o),t=d()},m(o,l){a[e].m(o,l),_(o,t,l),r=!0},p(o,[l]){let u=e;e=i(o),e===u?a[e].p(o,l):(v(),f(a[u],1,1,()=>{a[u]=null}),S(),n=a[e],n?n.p(o,l):(n=a[e]=c[e](o),n.c()),p(n,1),n.m(t.parentNode,t))},i(o){r||(p(n),r=!0)},o(o){f(n),r=!1},d(o){a[e].d(o),o&&m(t)}}}function R(s,e,n){let t,r;const c={inMemory:!0};w(async()=>{const i=window.location.search,o=new URLSearchParams(i);n(1,t=o.get("name")),console.log({arnsName:t})});async function a(i){n(0,r=await g(i,{CacheOptions:c}))}return s.$$.update=()=>{s.$$.dirty&2&&g&&t&&a(t)},[r,t]}class B extends k{constructor(e){super(),h(this,e,R,P,D,{})}}export{B as default};
//# sourceMappingURL=_page.svelte-69950880.js.map