import{S as ke,i as Ie,s as De,k as M,H as N,l as P,m as y,I as V,h as d,n as c,J as Ve,b as B,F as w,A as Te,B as it,v as se,a as K,w as ie,c as F,K as ye,x as ae,L as le,M as It,C as at,D as ot,E as ct,f as R,t as T,y as oe,N as ft,g as ue,d as de,O as ut,P as ge,Q as x,R as be,p as Le,T as Ke,U as Fe,V as $e,o as We,W as Dt,q as St,r as Rt,u as Ct,X as Mt,Y as ze,e as Ye,Z as dt,_ as ht,$ as Pt}from"../../chunks/index-a9922c5c.js";import{D as Lt}from"../../chunks/DIDAr-1e9468f1.js";import{_ as At}from"../../chunks/preload-helper-aa6bc0ce.js";import{f as ee}from"../../chunks/base64-2f165bce.js";function Nt(n,t){var e=t&&t.cache?t.cache:Ut,l=t&&t.serializer?t.serializer:zt,s=t&&t.strategy?t.strategy:Wt;return s(n,{cache:e,serializer:l})}function Vt(n){return n==null||typeof n=="number"||typeof n=="boolean"}function Tt(n,t,e,l){var s=Vt(l)?l:e(l),r=t.get(s);return typeof r>"u"&&(r=n.call(this,l),t.set(s,r)),r}function Ot(n,t,e){var l=Array.prototype.slice.call(arguments,3),s=e(l),r=t.get(s);return typeof r>"u"&&(r=n.apply(this,l),t.set(s,r)),r}function Ht(n,t,e,l,s){return e.bind(t,n,l,s)}function Wt(n,t){var e=n.length===1?Tt:Ot;return Ht(n,this,e,t.cache.create(),t.serializer)}function zt(){return JSON.stringify(arguments)}function Ae(){this.cache=Object.create(null)}Ae.prototype.has=function(n){return n in this.cache};Ae.prototype.get=function(n){return this.cache[n]};Ae.prototype.set=function(n,t){this.cache[n]=t};var Ut={create:function(){return new Ae}},Bt=Nt,Ee={MAIN:"svelte-draggable",DRAGGING:"svelte-draggable-dragging",DRAGGED:"svelte-draggable-dragged"},Gt=(n,t={})=>{var e,l;let{bounds:s,axis:r="both",gpuAcceleration:i=!0,applyUserSelectHack:a=!0,disabled:o=!1,ignoreMultitouch:h=!1,grid:f,position:g,cancel:p,handle:m,defaultClass:k=Ee.MAIN,defaultClassDragging:_=Ee.DRAGGING,defaultClassDragged:v=Ee.DRAGGED,defaultPosition:D={x:0,y:0},onDragStart:E,onDrag:u,onDragEnd:I}=t;const A=new Promise(requestAnimationFrame);let W=!1,[O,$]=[0,0],[J,C]=[0,0],[te,H]=[0,0],{x:L,y:U}={x:(e=g==null?void 0:g.x)!=null?e:0,y:(l=g==null?void 0:g.y)!=null?l:0};Oe(L,U,n,i);let j,S,z="",G,Q,me,Se,wt=!!g;const Ne=()=>({offsetX:O,offsetY:$,domRect:n.getBoundingClientRect()});function yt(b){const Y=Ne();b.dispatchEvent(new CustomEvent("svelte-drag:start",{detail:Y})),E==null||E(Y)}function Et(b){const Y=Ne();b.dispatchEvent(new CustomEvent("svelte-drag:end",{detail:Y})),I==null||I(Y)}function bt(b,Y,ne){const X=Ne();b.dispatchEvent(new CustomEvent("svelte-drag",{detail:X})),u==null||u(X)}const pe=addEventListener;pe("touchstart",Ce,!1),pe("touchend",Me,!1),pe("touchmove",Pe,!1),pe("mousedown",Ce,!1),pe("mouseup",Me,!1),pe("mousemove",Pe,!1),n.style.touchAction="none";const Ue=()=>{let b=n.offsetWidth/Q.width;return isNaN(b)&&(b=1),b};function Ce(b){if(o||h&&b.type==="touchstart"&&b.touches.length>1)return;if(n.classList.add(k),me=Ft(m,n),Se=$t(p,n),j=["both","x"].includes(r),S=["both","y"].includes(r),typeof s<"u"&&(G=Yt(s,n)),Q=n.getBoundingClientRect(),qe(m)&&qe(p)&&m===p)throw new Error("`handle` selector can't be same as `cancel` selector");if(Se!=null&&Se.contains(me))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");if(me.contains(b.target)&&!(Se!=null&&Se.contains(b.target))&&(W=!0),!W)return;a&&(z=document.body.style.userSelect,document.body.style.userSelect="none"),yt(n);const{clientX:Y,clientY:ne}=Xe(b)?b.touches[0]:b,X=Ue();j&&(J=Y-L/X),S&&(C=ne-U/X),G&&(te=Y-Q.left,H=ne-Q.top)}function Me(){!W||(n.classList.remove(_),n.classList.add(v),a&&(document.body.style.userSelect=z),Et(n),j&&(J=O),j&&(C=$),W=!1)}function Pe(b){if(!W)return;n.classList.add(_),b.preventDefault(),Q=n.getBoundingClientRect();const{clientX:Y,clientY:ne}=Xe(b)?b.touches[0]:b;let[X,re]=[Y,ne];const fe=Ue();if(G){const q={left:G.left+te,top:G.top+H,right:G.right+te-Q.width,bottom:G.bottom+H-Q.height};X=je(X,q.left,q.right),re=je(re,q.top,q.bottom)}if(Array.isArray(f)){let[q,ve]=f;if(isNaN(+q)||q<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+ve)||ve<0)throw new Error("2nd argument of `grid` must be a valid positive number");let[_e,we]=[X-J,re-C];[_e,we]=Kt([Math.floor(q/fe),Math.floor(ve/fe)],_e,we),[X,re]=[J+_e,C+we]}j&&(O=(X-J)*fe),S&&($=(re-C)*fe),[L,U]=[O,$],bt(n),A.then(()=>Oe(O,$,n,i))}return{destroy:()=>{const b=removeEventListener;b("touchstart",Ce,!1),b("touchend",Me,!1),b("touchmove",Pe,!1),b("mousedown",Ce,!1),b("mouseup",Me,!1),b("mousemove",Pe,!1)},update:b=>{var Y,ne,X,re,fe,q,ve,_e,we,Be,Ge;r=b.axis||"both",o=(Y=b.disabled)!=null?Y:!1,h=(ne=b.ignoreMultitouch)!=null?ne:!1,m=b.handle,s=b.bounds,p=b.cancel,a=(X=b.applyUserSelectHack)!=null?X:!0,f=b.grid,i=(re=b.gpuAcceleration)!=null?re:!0;const kt=n.classList.contains(v);n.classList.remove(k,v),k=(fe=b.defaultClass)!=null?fe:Ee.MAIN,_=(q=b.defaultClassDragging)!=null?q:Ee.DRAGGING,v=(ve=b.defaultClassDragged)!=null?ve:Ee.DRAGGED,n.classList.add(k),kt&&n.classList.add(v),wt&&(L=O=(we=(_e=b.position)==null?void 0:_e.x)!=null?we:O,U=$=(Ge=(Be=b.position)==null?void 0:Be.y)!=null?Ge:$,A.then(()=>Oe(O,$,n,i)))}}};function Xe(n){return Boolean(n.touches&&n.touches.length)}function je(n,t,e){return Math.min(Math.max(n,t),e)}function qe(n){return typeof n=="string"}var Kt=Bt(([n,t],e,l)=>{const s=Math.round(e/n)*n,r=Math.round(l/t)*t;return[s,r]});function Ft(n,t){if(!n)return t;const e=t.querySelector(n);if(e===null)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return e}function $t(n,t){if(!n)return;const e=t.querySelector(n);if(e===null)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return e}function Yt(n,t){if(typeof n=="object"){const[s,r]=[window.innerWidth,window.innerHeight],{top:i=0,left:a=0,right:o=0,bottom:h=0}=n,f=s-o,g=r-h;return{top:i,right:f,bottom:g,left:a}}if(n==="parent")return t.parentNode.getBoundingClientRect();const e=document.querySelector(n);if(e===null)throw new Error("The selector provided for bound doesn't exists in the document.");return e.getBoundingClientRect()}function Oe(n,t,e,l){e.style.transform=l?`translate3d(${+n}px, ${+t}px, 0)`:`translate(${+n}px, ${+t}px)`}function Xt(n){let t,e,l,s,r,i,a,o,h,f,g,p,m;return{c(){t=M("div"),e=N("svg"),l=N("defs"),s=N("defs"),r=N("path"),i=N("path"),a=N("path"),o=N("radialGradient"),h=N("stop"),f=N("stop"),g=N("use"),p=N("use"),m=N("use"),this.h()},l(k){t=P(k,"DIV",{});var _=y(t);e=V(_,"svg",{xmlns:!0,"xmlns:xlink":!0,viewBox:!0,width:!0,height:!0,class:!0});var v=y(e);l=V(v,"defs",{}),y(l).forEach(d),s=V(v,"defs",{});var D=y(s);r=V(D,"path",{id:!0,d:!0}),y(r).forEach(d),i=V(D,"path",{id:!0,d:!0}),y(i).forEach(d),a=V(D,"path",{id:!0,d:!0}),y(a).forEach(d),o=V(D,"radialGradient",{id:!0,cx:!0,cy:!0,r:!0,gradientUnits:!0});var E=y(o);h=V(E,"stop",{offset:!0,"stop-color":!0}),y(h).forEach(d),f=V(E,"stop",{offset:!0,"stop-color":!0}),y(f).forEach(d),E.forEach(d),D.forEach(d),g=V(v,"use",{fill:!0,"xlink:href":!0}),y(g).forEach(d),p=V(v,"use",{fill:!0,"xlink:href":!0}),y(p).forEach(d),m=V(v,"use",{fill:!0,"xlink:href":!0}),y(m).forEach(d),v.forEach(d),_.forEach(d),this.h()},h(){c(r,"id","a"),c(r,"d","M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z"),c(i,"id","c"),c(i,"d","M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z"),c(a,"id","d"),c(a,"d","M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z"),c(h,"offset","0%"),c(h,"stop-color","#69ed66"),c(f,"offset","100%"),c(f,"stop-color","#279c19"),c(o,"id","b"),c(o,"cx","992.3"),c(o,"cy","174.2"),c(o,"r","1312.8"),c(o,"gradientUnits","userSpaceOnUse"),c(g,"fill","url(#b)"),Ve(g,"xlink:href","#a"),c(p,"fill","#fff"),Ve(p,"xlink:href","#c"),c(m,"fill","#fff"),Ve(m,"xlink:href","#d"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),c(e,"viewBox","0 0 1440 1440"),c(e,"width","100"),c(e,"height","100"),c(e,"class","svelte-189qcdl")},m(k,_){B(k,t,_),w(t,e),w(e,l),w(e,s),w(s,r),w(s,i),w(s,a),w(s,o),w(o,h),w(o,f),w(e,g),w(e,p),w(e,m)},p:Te,i:Te,o:Te,d(k){k&&d(t)}}}class gt extends ke{constructor(t){super(),Ie(this,t,null,Xt,De,{})}}const jt=n=>({openNav:n&1,hideNav:n&1}),Je=n=>({openNav:n[5],hideNav:n[6]});function qt(n){let t,e,l,s,r,i,a,o,h,f,g,p,m,k,_,v;e=new gt({});const D=n[4].default,E=it(D,n,n[3],Je);return{c(){t=M("div"),se(e.$$.fragment),l=K(),s=M("div"),r=M("div"),i=K(),a=M("div"),o=K(),h=M("div"),f=K(),g=M("div"),p=K(),m=M("div"),E&&E.c(),this.h()},l(u){t=P(u,"DIV",{class:!0});var I=y(t);ie(e.$$.fragment,I),l=F(I),s=P(I,"DIV",{class:!0});var A=y(s);r=P(A,"DIV",{class:!0}),y(r).forEach(d),i=F(A),a=P(A,"DIV",{class:!0}),y(a).forEach(d),o=F(A),h=P(A,"DIV",{class:!0}),y(h).forEach(d),A.forEach(d),I.forEach(d),f=F(u),g=P(u,"DIV",{class:!0}),y(g).forEach(d),p=F(u),m=P(u,"DIV",{class:!0});var W=y(m);E&&E.l(W),W.forEach(d),this.h()},h(){c(r,"class","bar1 svelte-17gml3n"),c(a,"class","bar2 svelte-17gml3n"),c(h,"class","bar3 svelte-17gml3n"),c(s,"class","menu-icon svelte-17gml3n"),c(t,"class","container svelte-17gml3n"),ye(t,"change",n[0]),c(g,"class","svelte-17gml3n"),ye(g,"mask",n[0]),c(m,"class","sidenav svelte-17gml3n"),ye(m,"open",n[0])},m(u,I){B(u,t,I),ae(e,t,null),w(t,l),w(t,s),w(s,r),w(s,i),w(s,a),w(s,o),w(s,h),B(u,f,I),B(u,g,I),B(u,p,I),B(u,m,I),E&&E.m(m,null),k=!0,_||(v=[le(t,"click",n[1]),It(Gt.call(null,t)),le(g,"click",n[2])],_=!0)},p(u,[I]){(!k||I&1)&&ye(t,"change",u[0]),(!k||I&1)&&ye(g,"mask",u[0]),E&&E.p&&(!k||I&9)&&at(E,D,u,u[3],k?ct(D,u[3],I,jt):ot(u[3]),Je),(!k||I&1)&&ye(m,"open",u[0])},i(u){k||(R(e.$$.fragment,u),R(E,u),k=!0)},o(u){T(e.$$.fragment,u),T(E,u),k=!1},d(u){u&&d(t),oe(e),u&&d(f),u&&d(g),u&&d(p),u&&d(m),E&&E.d(u),_=!1,ft(v)}}}function Jt(n,t,e){let{$$slots:l={},$$scope:s}=t,r=!1;function i(){e(0,r=!r)}function a(f){e(0,r=!1)}const o=()=>e(0,r=!0),h=()=>e(0,r=!1);return n.$$set=f=>{"$$scope"in f&&e(3,s=f.$$scope)},[r,i,a,s,l,o,h]}class Qt extends ke{constructor(t){super(),Ie(this,t,Jt,qt,De,{})}}var Z;(function(n){n.Call="call",n.Reply="reply",n.Syn="syn",n.SynAck="synAck",n.Ack="ack"})(Z||(Z={}));var he;(function(n){n.Fulfilled="fulfilled",n.Rejected="rejected"})(he||(he={}));var Re;(function(n){n.ConnectionDestroyed="ConnectionDestroyed",n.ConnectionTimeout="ConnectionTimeout",n.NoIframeSrc="NoIframeSrc"})(Re||(Re={}));var He;(function(n){n.DataCloneError="DataCloneError"})(He||(He={}));var ce;(function(n){n.Message="message"})(ce||(ce={}));const Zt=(n,t)=>{const e=[];let l=!1;return{destroy(s){l||(l=!0,t(`${n}: Destroying connection`),e.forEach(r=>{r(s)}))},onDestroy(s){l?s():e.push(s)}}},xt=n=>(...t)=>{n&&console.log("[Penpal]",...t)},en={"http:":"80","https:":"443"},tn=/^(https?:)?\/\/([^/:]+)?(:(\d+))?/,nn=["file:","data:"],rn=n=>{if(n&&nn.find(a=>n.startsWith(a)))return"null";const t=document.location,e=tn.exec(n);let l,s,r;e?(l=e[1]?e[1]:t.protocol,s=e[2],r=e[4]):(l=t.protocol,s=t.hostname,r=t.port);const i=r&&r!==en[l]?`:${r}`:"";return`${l}//${s}${i}`},Qe=({name:n,message:t,stack:e})=>({name:n,message:t,stack:e}),ln=n=>{const t=new Error;return Object.keys(n).forEach(e=>t[e]=n[e]),t},sn=(n,t,e)=>{const{localName:l,local:s,remote:r,originForSending:i,originForReceiving:a}=n;let o=!1;const h=f=>{if(f.source!==r||f.data.penpal!==Z.Call)return;if(a!=="*"&&f.origin!==a){e(`${l} received message from origin ${f.origin} which did not match expected origin ${a}`);return}const g=f.data,{methodName:p,args:m,id:k}=g;e(`${l}: Received ${p}() call`);const _=v=>D=>{if(e(`${l}: Sending ${p}() reply`),o){e(`${l}: Unable to send ${p}() reply due to destroyed connection`);return}const E={penpal:Z.Reply,id:k,resolution:v,returnValue:D};v===he.Rejected&&D instanceof Error&&(E.returnValue=Qe(D),E.returnValueIsError=!0);try{r.postMessage(E,i)}catch(u){if(u.name===He.DataCloneError){const I={penpal:Z.Reply,id:k,resolution:he.Rejected,returnValue:Qe(u),returnValueIsError:!0};r.postMessage(I,i)}throw u}};new Promise(v=>v(t[p].apply(t,m))).then(_(he.Fulfilled),_(he.Rejected))};return s.addEventListener(ce.Message,h),()=>{o=!0,s.removeEventListener(ce.Message,h)}};let an=0;const on=()=>++an,mt=".",pt=n=>n?n.split(mt):[],cn=n=>n.join(mt),fn=(n,t)=>{const e=pt(t||"");return e.push(n),cn(e)},un=(n,t,e)=>{const l=pt(t);return l.reduce((s,r,i)=>(typeof s[r]>"u"&&(s[r]={}),i===l.length-1&&(s[r]=e),s[r]),n),n},vt=(n,t)=>{const e={};return Object.keys(n).forEach(l=>{const s=n[l],r=fn(l,t);typeof s=="object"&&Object.assign(e,vt(s,r)),typeof s=="function"&&(e[r]=s)}),e},dn=n=>{const t={};for(const e in n)un(t,e,n[e]);return t},hn=(n,t,e,l,s)=>{const{localName:r,local:i,remote:a,originForSending:o,originForReceiving:h}=t;let f=!1;s(`${r}: Connecting call sender`);const g=m=>(...k)=>{s(`${r}: Sending ${m}() call`);let _;try{a.closed&&(_=!0)}catch{_=!0}if(_&&l(),f){const v=new Error(`Unable to send ${m}() call due to destroyed connection`);throw v.code=Re.ConnectionDestroyed,v}return new Promise((v,D)=>{const E=on(),u=A=>{if(A.source!==a||A.data.penpal!==Z.Reply||A.data.id!==E)return;if(h!=="*"&&A.origin!==h){s(`${r} received message from origin ${A.origin} which did not match expected origin ${h}`);return}const W=A.data;s(`${r}: Received ${m}() reply`),i.removeEventListener(ce.Message,u);let O=W.returnValue;W.returnValueIsError&&(O=ln(O)),(W.resolution===he.Fulfilled?v:D)(O)};i.addEventListener(ce.Message,u);const I={penpal:Z.Call,id:E,methodName:m,args:k};a.postMessage(I,o)})},p=e.reduce((m,k)=>(m[k]=g(k),m),{});return Object.assign(n,dn(p)),()=>{f=!0}},gn=(n,t,e,l,s)=>{const{destroy:r,onDestroy:i}=l;let a,o;const h={};return f=>{if(t!=="*"&&f.origin!==t){s(`Parent: Handshake - Received ACK message from origin ${f.origin} which did not match expected origin ${t}`);return}s("Parent: Handshake - Received ACK");const g={localName:"Parent",local:window,remote:f.source,originForSending:e,originForReceiving:t};a&&a(),a=sn(g,n,s),i(a),o&&o.forEach(m=>{delete h[m]}),o=f.data.methodNames;const p=hn(h,g,o,r,s);return i(p),h}},mn=(n,t,e,l)=>s=>{if(!s.source)return;if(e!=="*"&&s.origin!==e){n(`Parent: Handshake - Received SYN message from origin ${s.origin} which did not match expected origin ${e}`);return}n("Parent: Handshake - Received SYN, responding with SYN-ACK");const r={penpal:Z.SynAck,methodNames:Object.keys(t)};s.source.postMessage(r,l)},pn=6e4,vn=(n,t)=>{const{destroy:e,onDestroy:l}=t,s=setInterval(()=>{n.isConnected||(clearInterval(s),e())},pn);l(()=>{clearInterval(s)})},_n=(n,t)=>{let e;return n!==void 0&&(e=window.setTimeout(()=>{const l=new Error(`Connection timed out after ${n}ms`);l.code=Re.ConnectionTimeout,t(l)},n)),()=>{clearTimeout(e)}},wn=n=>{if(!n.src&&!n.srcdoc){const t=new Error("Iframe must have src or srcdoc property defined.");throw t.code=Re.NoIframeSrc,t}},yn=n=>{let{iframe:t,methods:e={},childOrigin:l,timeout:s,debug:r=!1}=n;const i=xt(r),a=Zt("Parent",i),{onDestroy:o,destroy:h}=a;l||(wn(t),l=rn(t.src));const f=l==="null"?"*":l,g=vt(e),p=mn(i,g,l,f),m=gn(g,l,f,a,i);return{promise:new Promise((_,v)=>{const D=_n(s,h),E=u=>{if(!(u.source!==t.contentWindow||!u.data)){if(u.data.penpal===Z.Syn){p(u);return}if(u.data.penpal===Z.Ack){const I=m(u);I&&(D(),_(I));return}}};window.addEventListener(ce.Message,E),i("Parent: Awaiting handshake"),vn(t,a),o(u=>{window.removeEventListener(ce.Message,E),u&&v(u)})}),destroy(){h()}}};function Ze(n){let t,e,l,s,r,i;return{c(){t=M("div"),e=N("svg"),l=N("rect"),s=N("path"),this.h()},l(a){t=P(a,"DIV",{});var o=y(t);e=V(o,"svg",{"v-if":!0,xmlns:!0,"enable-background":!0,viewBox:!0,fill:!0,class:!0});var h=y(e);l=V(h,"rect",{fill:!0,height:!0,width:!0}),y(l).forEach(d),s=V(h,"path",{d:!0}),y(s).forEach(d),h.forEach(d),o.forEach(d),this.h()},h(){c(l,"fill","none"),c(l,"height","24"),c(l,"width","24"),c(s,"d","M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"),c(e,"v-if","icon === 'close'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"enable-background","new 0 0 24 24"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(a,o){B(a,t,o),w(t,e),w(e,l),w(e,s),i=!0},i(a){i||(ge(()=>{r||(r=x(t,ee,{delay:100,duration:100},!0)),r.run(1)}),i=!0)},o(a){r||(r=x(t,ee,{delay:100,duration:100},!1)),r.run(0),i=!1},d(a){a&&d(t),a&&r&&r.end()}}}function xe(n){let t,e,l,s,r,i;return{c(){t=M("div"),e=N("svg"),l=N("path"),s=N("path"),this.h()},l(a){t=P(a,"DIV",{});var o=y(t);e=V(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var h=y(e);l=V(h,"path",{d:!0,fill:!0}),y(l).forEach(d),s=V(h,"path",{d:!0}),y(s).forEach(d),h.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0z"),c(l,"fill","none"),c(s,"d","M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"),c(e,"v-else-if","icon === 'launch'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(a,o){B(a,t,o),w(t,e),w(e,l),w(e,s),i=!0},i(a){i||(ge(()=>{r||(r=x(t,ee,{delay:100,duration:100},!0)),r.run(1)}),i=!0)},o(a){r||(r=x(t,ee,{delay:100,duration:100},!1)),r.run(0),i=!1},d(a){a&&d(t),a&&r&&r.end()}}}function et(n){let t,e,l,s,r,i;return{c(){t=M("div"),e=N("svg"),l=N("path"),s=N("path"),this.h()},l(a){t=P(a,"DIV",{});var o=y(t);e=V(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var h=y(e);l=V(h,"path",{d:!0,fill:!0}),y(l).forEach(d),s=V(h,"path",{d:!0}),y(s).forEach(d),h.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0z"),c(l,"fill","none"),c(s,"d","M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"),c(e,"v-else-if","icon === 'plug'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(a,o){B(a,t,o),w(t,e),w(e,l),w(e,s),i=!0},i(a){i||(ge(()=>{r||(r=x(t,ee,{delay:100,duration:100},!0)),r.run(1)}),i=!0)},o(a){r||(r=x(t,ee,{delay:100,duration:100},!1)),r.run(0),i=!1},d(a){a&&d(t),a&&r&&r.end()}}}function tt(n){let t,e,l,s,r,i;return{c(){t=M("div"),e=N("svg"),l=N("path"),s=N("path"),this.h()},l(a){t=P(a,"DIV",{});var o=y(t);e=V(o,"svg",{"v-else-if":!0,xmlns:!0,viewBox:!0,fill:!0,class:!0});var h=y(e);l=V(h,"path",{d:!0,fill:!0}),y(l).forEach(d),s=V(h,"path",{d:!0}),y(s).forEach(d),h.forEach(d),o.forEach(d),this.h()},h(){c(l,"d","M0 0h24v24H0V0z"),c(l,"fill","none"),c(s,"d","M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z"),c(e,"v-else-if","icon === 'unplug'"),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox","0 0 24 24"),c(e,"fill","currentColor"),c(e,"class","svelte-1c05l0n")},m(a,o){B(a,t,o),w(t,e),w(e,l),w(e,s),i=!0},i(a){i||(ge(()=>{r||(r=x(t,ee,{delay:100,duration:100},!0)),r.run(1)}),i=!0)},o(a){r||(r=x(t,ee,{delay:100,duration:100},!1)),r.run(0),i=!1},d(a){a&&d(t),a&&r&&r.end()}}}function En(n){let t,e,l,s,r,i,a,o,h,f=n[0]==="close"&&Ze(),g=n[0]==="launch"&&xe(),p=n[0]==="plug"&&et(),m=n[0]==="unplug"&&tt();const k=n[3].default,_=it(k,n,n[2],null);return{c(){t=M("button"),e=M("div"),f&&f.c(),l=K(),g&&g.c(),s=K(),p&&p.c(),r=K(),m&&m.c(),i=K(),_&&_.c(),this.h()},l(v){t=P(v,"BUTTON",{class:!0});var D=y(t);e=P(D,"DIV",{class:!0});var E=y(e);f&&f.l(E),l=F(E),g&&g.l(E),s=F(E),p&&p.l(E),r=F(E),m&&m.l(E),E.forEach(d),i=F(D),_&&_.l(D),D.forEach(d),this.h()},h(){c(e,"class","img-container svelte-1c05l0n"),c(t,"class","svelte-1c05l0n")},m(v,D){B(v,t,D),w(t,e),f&&f.m(e,null),w(e,l),g&&g.m(e,null),w(e,s),p&&p.m(e,null),w(e,r),m&&m.m(e,null),w(t,i),_&&_.m(t,null),a=!0,o||(h=le(t,"click",n[4]),o=!0)},p(v,[D]){v[0]==="close"?f?D&1&&R(f,1):(f=Ze(),f.c(),R(f,1),f.m(e,l)):f&&(ue(),T(f,1,1,()=>{f=null}),de()),v[0]==="launch"?g?D&1&&R(g,1):(g=xe(),g.c(),R(g,1),g.m(e,s)):g&&(ue(),T(g,1,1,()=>{g=null}),de()),v[0]==="plug"?p?D&1&&R(p,1):(p=et(),p.c(),R(p,1),p.m(e,r)):p&&(ue(),T(p,1,1,()=>{p=null}),de()),v[0]==="unplug"?m?D&1&&R(m,1):(m=tt(),m.c(),R(m,1),m.m(e,null)):m&&(ue(),T(m,1,1,()=>{m=null}),de()),_&&_.p&&(!a||D&4)&&at(_,k,v,v[2],a?ct(k,v[2],D,null):ot(v[2]),null)},i(v){a||(R(f),R(g),R(p),R(m),R(_,v),a=!0)},o(v){T(f),T(g),T(p),T(m),T(_,v),a=!1},d(v){v&&d(t),f&&f.d(),g&&g.d(),p&&p.d(),m&&m.d(),_&&_.d(v),o=!1,h()}}}function bn(n,t,e){let{$$slots:l={},$$scope:s}=t,{icon:r}=t;const i=ut(),a=()=>i("click","detail value");return n.$$set=o=>{"icon"in o&&e(0,r=o.icon),"$$scope"in o&&e(2,s=o.$$scope)},[r,i,s,l,a]}class _t extends ke{constructor(t){super(),Ie(this,t,bn,En,De,{icon:0})}}const{window:kn}=Dt;function nt(n){let t,e,l,s,r;return e=new _t({props:{icon:n[12]}}),e.$on("click",n[15]),{c(){t=M("div"),se(e.$$.fragment),this.h()},l(i){t=P(i,"DIV",{class:!0});var a=y(t);ie(e.$$.fragment,a),a.forEach(d),this.h()},h(){var i;c(t,"class",l=be((i=n[0])!=null&&i.keepPopup?"action":"action dim")+" svelte-fpee2k")},m(i,a){B(i,t,a),ae(e,t,null),r=!0},p(i,a){var h;const o={};a&4096&&(o.icon=i[12]),e.$set(o),(!r||a&1&&l!==(l=be((h=i[0])!=null&&h.keepPopup?"action":"action dim")+" svelte-fpee2k"))&&c(t,"class",l)},i(i){r||(R(e.$$.fragment,i),ge(()=>{s||(s=x(t,ee,{delay:100,duration:100},!0)),s.run(1)}),r=!0)},o(i){T(e.$$.fragment,i),s||(s=x(t,ee,{delay:100,duration:100},!1)),s.run(0),r=!1},d(i){i&&d(t),oe(e),i&&s&&s.end()}}}function In(n){let t,e=n[10].loading||!n[6]?"Loading...":"Load",l,s;return{c(){t=M("span"),l=St(e),this.h()},l(r){t=P(r,"SPAN",{class:!0});var i=y(t);l=Rt(i,e),i.forEach(d),this.h()},h(){var r;c(t,"class",s=be((r=n[0])!=null&&r.address?" connected ":" disconnected ")+" svelte-fpee2k")},m(r,i){B(r,t,i),w(t,l)},p(r,i){var a;i&1088&&e!==(e=r[10].loading||!r[6]?"Loading...":"Load")&&Ct(l,e),i&1&&s!==(s=be((a=r[0])!=null&&a.address?" connected ":" disconnected ")+" svelte-fpee2k")&&c(t,"class",s)},d(r){r&&d(t)}}}function Dn(n){var te;let t,e,l,s,r,i,a,o,h,f,g,p,m,k,_,v,D,E,u,I,A,W,O,$,J;r=new gt({});let C=(((te=n[0])==null?void 0:te.address)||n[1])&&nt(n);return _=new _t({props:{icon:n[11],$$slots:{default:[In]},$$scope:{ctx:n}}}),_.$on("click",n[23]),{c(){t=M("div"),e=M("div"),l=M("a"),s=M("div"),se(r.$$.fragment),i=K(),a=M("div"),o=M("input"),h=K(),f=M("span"),g=K(),p=M("div"),C&&C.c(),m=K(),k=M("div"),se(_.$$.fragment),E=K(),u=M("div"),I=M("iframe"),this.h()},l(H){t=P(H,"DIV",{class:!0});var L=y(t);e=P(L,"DIV",{class:!0,style:!0});var U=y(e);l=P(U,"A",{href:!0,target:!0,rel:!0});var j=y(l);s=P(j,"DIV",{class:!0});var S=y(s);ie(r.$$.fragment,S),S.forEach(d),j.forEach(d),i=F(U),a=P(U,"DIV",{class:!0});var z=y(a);o=P(z,"INPUT",{class:!0,placeholder:!0}),h=F(z),f=P(z,"SPAN",{class:!0}),y(f).forEach(d),z.forEach(d),g=F(U),p=P(U,"DIV",{class:!0});var G=y(p);C&&C.l(G),m=F(G),k=P(G,"DIV",{class:!0});var Q=y(k);ie(_.$$.fragment,Q),Q.forEach(d),G.forEach(d),U.forEach(d),E=F(L),u=P(L,"DIV",{class:!0,style:!0});var me=y(u);I=P(me,"IFRAME",{title:!0,src:!0,allow:!0,class:!0}),y(I).forEach(d),me.forEach(d),L.forEach(d),this.h()},h(){var H,L;c(s,"class","actions logo svelte-fpee2k"),c(l,"href","https://PeerPiper.io"),c(l,"target","_blank"),c(l,"rel","noreferrer"),c(o,"class","url svelte-fpee2k"),c(o,"placeholder",Sn),c(f,"class","green-line svelte-fpee2k"),c(a,"class","url-input-container svelte-fpee2k"),c(k,"class",v=be((H=n[10])!=null&&H.loading?"action dim":(L=n[0])!=null&&L.address?" connected ":" disconnected ")+" svelte-fpee2k"),c(p,"class","actions svelte-fpee2k"),c(e,"class","top svelte-fpee2k"),Le(e,"--topOffsetHeight",n[2]),ge(()=>n[24].call(e)),c(I,"title","Web Wallet"),Ke(I.src,A=n[6])||c(I,"src",A),c(I,"allow","clipboard-read 'self' 'src'; clipboard-write 'self' 'src';"),c(I,"class","svelte-fpee2k"),c(u,"class","iframe svelte-fpee2k"),Le(u,"height","calc("+n[4]+"px + 18px)"),ge(()=>n[26].call(u)),c(t,"class","connector-container svelte-fpee2k")},m(H,L){B(H,t,L),w(t,e),w(e,l),w(l,s),ae(r,s,null),w(e,i),w(e,a),w(a,o),Fe(o,n[1]),w(a,h),w(a,f),w(e,g),w(e,p),C&&C.m(p,null),w(p,m),w(p,k),ae(_,k,null),D=$e(e,n[24].bind(e)),w(t,E),w(t,u),w(u,I),n[25](I),W=$e(u,n[26].bind(u)),O=!0,$||(J=[le(kn,"keydown",n[16]),le(o,"focus",n[20]),le(o,"blur",n[21]),le(o,"input",n[22]),le(o,"input",function(){Mt(n[8])&&n[8].apply(this,arguments)})],$=!0)},p(H,[L]){var j,S,z;n=H,L&2&&o.value!==n[1]&&Fe(o,n[1]),((j=n[0])==null?void 0:j.address)||n[1]?C?(C.p(n,L),L&3&&R(C,1)):(C=nt(n),C.c(),R(C,1),C.m(p,m)):C&&(ue(),T(C,1,1,()=>{C=null}),de());const U={};L&2048&&(U.icon=n[11]),L&1073742913&&(U.$$scope={dirty:L,ctx:n}),_.$set(U),(!O||L&1025&&v!==(v=be((S=n[10])!=null&&S.loading?"action dim":(z=n[0])!=null&&z.address?" connected ":" disconnected ")+" svelte-fpee2k"))&&c(k,"class",v),(!O||L&4)&&Le(e,"--topOffsetHeight",n[2]),(!O||L&64&&!Ke(I.src,A=n[6]))&&c(I,"src",A),(!O||L&16)&&Le(u,"height","calc("+n[4]+"px + 18px)")},i(H){O||(R(r.$$.fragment,H),R(C),R(_.$$.fragment,H),O=!0)},o(H){T(r.$$.fragment,H),T(C),T(_.$$.fragment,H),O=!1},d(H){H&&d(t),oe(r),C&&C.d(),oe(_),D(),n[25](null),W(),$=!1,ft(J)}}}let Sn="Enter Wallet Url";const rt="INPUT_URL";function Rn(n,t,e){let l,s,{wallet:r=null}=t,{inputUrl:i="https://peerpiper.github.io/iframe-wallet-sdk/"}=t,{topOffsetHeight:a=0}=t,{topOffsetWidth:o=0}=t,{iframeParentHeight:h=0}=t,{iframeParentWidth:f=0}=t,g,{show:p}=t,{hide:m}=t;const k=ut();let _,v,D,E;const u={loading:!0};We(async()=>{const{ImmortalDB:S}=await At(()=>import("../../chunks/index-f3824ee7.js"),[],import.meta.url);e(8,E=async()=>{try{await S.set(rt,_)}catch(z){console.warn("Did not save",_,z)}});try{const z=await S.get(rt,null);z&&e(1,i=z)}catch(z){console.warn("Did not get",z)}A()});async function I(){e(10,u.loading=!1,u);let S;S=await yn({iframe:v,methods:{setIframeParentHeight(G){e(4,h=G)},setIframeParentWidth(G){e(17,f=G)},show(){p()},hide(){m()},walletReady(){return e(0,r=S),k("walletReady",{wallet:r}),window.arweaveWallet=r.arweaveWalletAPI,!0}}}).promise,p()}const A=()=>{_!==i&&(e(6,_=""),e(6,_=i),e(10,u.loading=!0,u))},W=()=>r.disconnect(),O=()=>window.open(i);function $(S){S.key==="Enter"&&D&&A()}const J=()=>e(9,D=!0),C=()=>e(9,D=!1);function te(){i=this.value,e(1,i)}const H=()=>{r!=null&&r.address?W():A()};function L(){a=this.offsetHeight,o=this.offsetWidth,e(2,a),e(3,o)}function U(S){ze[S?"unshift":"push"](()=>{v=S,e(7,v)})}function j(){g=this.offsetWidth,e(5,g)}return n.$$set=S=>{"wallet"in S&&e(0,r=S.wallet),"inputUrl"in S&&e(1,i=S.inputUrl),"topOffsetHeight"in S&&e(2,a=S.topOffsetHeight),"topOffsetWidth"in S&&e(3,o=S.topOffsetWidth),"iframeParentHeight"in S&&e(4,h=S.iframeParentHeight),"iframeParentWidth"in S&&e(17,f=S.iframeParentWidth),"show"in S&&e(18,p=S.show),"hide"in S&&e(19,m=S.hide)},n.$$.update=()=>{n.$$.dirty&320&&_&&E&&E(),n.$$.dirty&128&&v&&v.addEventListener("load",I),n.$$.dirty&1&&e(12,l=r!=null&&r.keepPopup?"close":"launch"),n.$$.dirty&1&&e(11,s=r!=null&&r.address?"unplug":"plug"),n.$$.dirty&33&&g&&r&&(r==null||r.setWidth(g))},[r,i,a,o,h,g,_,v,E,D,u,s,l,A,W,O,$,f,p,m,J,C,te,H,L,U,j]}class Cn extends ke{constructor(t){super(),Ie(this,t,Rn,Dn,De,{wallet:0,inputUrl:1,topOffsetHeight:2,topOffsetWidth:3,iframeParentHeight:4,iframeParentWidth:17,show:18,hide:19})}}function lt(n){let t,e;return t=new Qt({props:{$$slots:{default:[Mn,({openNav:l,hideNav:s})=>({5:l,6:s}),({openNav:l,hideNav:s})=>(l?32:0)|(s?64:0)]},$$scope:{ctx:n}}}),{c(){se(t.$$.fragment)},l(l){ie(t.$$.fragment,l)},m(l,s){ae(t,l,s),e=!0},p(l,s){const r={};s&227&&(r.$$scope={dirty:s,ctx:l}),t.$set(r)},i(l){e||(R(t.$$.fragment,l),e=!0)},o(l){T(t.$$.fragment,l),e=!1},d(l){oe(t,l)}}}function Mn(n){let t,e,l;function s(i){n[3](i)}let r={inputUrl:n[1],show:n[5],hide:n[6]};return n[0]!==void 0&&(r.wallet=n[0]),t=new Cn({props:r}),ze.push(()=>dt(t,"wallet",s)),t.$on("walletReady",n[4]),{c(){se(t.$$.fragment)},l(i){ie(t.$$.fragment,i)},m(i,a){ae(t,i,a),l=!0},p(i,a){const o={};a&2&&(o.inputUrl=i[1]),a&32&&(o.show=i[5]),a&64&&(o.hide=i[6]),!e&&a&1&&(e=!0,o.wallet=i[0],ht(()=>e=!1)),t.$set(o)},i(i){l||(R(t.$$.fragment,i),l=!0)},o(i){T(t.$$.fragment,i),l=!1},d(i){oe(t,i)}}}function Pn(n){let t,e,l=n[2]&&lt(n);return{c(){l&&l.c(),t=Ye()},l(s){l&&l.l(s),t=Ye()},m(s,r){l&&l.m(s,r),B(s,t,r),e=!0},p(s,[r]){s[2]?l?(l.p(s,r),r&4&&R(l,1)):(l=lt(s),l.c(),R(l,1),l.m(t.parentNode,t)):l&&(ue(),T(l,1,1,()=>{l=null}),de())},i(s){e||(R(l),e=!0)},o(s){T(l),e=!1},d(s){l&&l.d(s),s&&d(t)}}}function Ln(n,t,e){let{inputUrl:l}=t,{wallet:s=null}=t,r;We(()=>{e(2,r=!0)});function i(o){s=o,e(0,s)}function a(o){Pt.call(this,n,o)}return n.$$set=o=>{"inputUrl"in o&&e(1,l=o.inputUrl),"wallet"in o&&e(0,s=o.wallet)},[s,l,r,i,a]}class An extends ke{constructor(t){super(),Ie(this,t,Ln,Pn,De,{inputUrl:1,wallet:0})}}function st(n){let t,e,l;function s(i){n[6](i)}let r={wallet:n[1],RSAPublicKey:n[2],Ed25519PublicKey:n[3]};return n[0]!==void 0&&(r.srcTx=n[0]),t=new Lt({props:r}),ze.push(()=>dt(t,"srcTx",s)),{c(){se(t.$$.fragment)},l(i){ie(t.$$.fragment,i)},m(i,a){ae(t,i,a),l=!0},p(i,a){const o={};a&2&&(o.wallet=i[1]),a&4&&(o.RSAPublicKey=i[2]),a&8&&(o.Ed25519PublicKey=i[3]),!e&&a&1&&(e=!0,o.srcTx=i[0],ht(()=>e=!1)),t.$set(o)},i(i){l||(R(t.$$.fragment,i),l=!0)},o(i){T(t.$$.fragment,i),l=!1},d(i){oe(t,i)}}}function Nn(n){let t,e,l,s;t=new An({}),t.$on("walletReady",n[5]);let r=n[4]&&st(n);return{c(){se(t.$$.fragment),e=K(),l=M("div"),r&&r.c(),this.h()},l(i){ie(t.$$.fragment,i),e=F(i),l=P(i,"DIV",{class:!0});var a=y(l);r&&r.l(a),a.forEach(d),this.h()},h(){c(l,"class","flex flex-col items-center m-2 p-2")},m(i,a){ae(t,i,a),B(i,e,a),B(i,l,a),r&&r.m(l,null),s=!0},p(i,[a]){i[4]?r?(r.p(i,a),a&16&&R(r,1)):(r=st(i),r.c(),R(r,1),r.m(l,null)):r&&(ue(),T(r,1,1,()=>{r=null}),de())},i(i){s||(R(t.$$.fragment,i),R(r),s=!0)},o(i){T(t.$$.fragment,i),T(r),s=!1},d(i){oe(t,i),i&&d(e),i&&d(l),r&&r.d()}}}function Vn(n,t,e){let l,s,r,i,a;const o=async f=>{e(1,l=f.detail.wallet),e(2,s=await l.arweaveWalletAPI.getActivePublicKey()),e(3,r=await l.proxcryptor.getPublicKey())};We(async()=>{e(0,i=localStorage.getItem("srcTx")),e(4,a=!0)});function h(f){i=f,e(0,i)}return n.$$.update=()=>{n.$$.dirty&1&&i&&localStorage.setItem("srcTx",i)},[i,l,s,r,a,o,h]}class zn extends ke{constructor(t){super(),Ie(this,t,Vn,Nn,De,{})}}export{zn as default};
//# sourceMappingURL=_page.svelte-7d75bc3f.js.map
