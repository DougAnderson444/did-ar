import{D as f}from"./_page-38e943aa.js";import{create as R,init as w,update as y}from"./didar-37105828.js";import{b as M,a as T}from"./arnsResolver-0ec1328b.js";import{_ as r}from"./preload-helper-aa6bc0ce.js";function p(){async function i(n,t,c,l){const{WarpFactory:e}=await r(()=>import("./index-10303705.js").then(o=>o.i),["index-10303705.js","base64-ab7bc4eb.js","..\\assets\\base64-947b612f.css","index-a4477ac1.js","index-e956cdd8.js"],import.meta.url),a=(await e.forMainnet().contract(t.id).readState()).cachedValue.state;return{didResolutionMetadata:{contentType:"application/did+ld+json"},didDocument:a,didDocumentMetadata:{}}}async function d(n,t,c,l){const{WarpFactory:e}=await r(()=>import("./index-10303705.js").then(o=>o.i),["index-10303705.js","base64-ab7bc4eb.js","..\\assets\\base64-947b612f.css","index-a4477ac1.js","index-e956cdd8.js"],import.meta.url),a=(await e.forLocal().contract(t.id).readState()).cachedValue.state;return{didResolutionMetadata:{contentType:"application/did+ld+json"},didDocument:a,didDocumentMetadata:{}}}return{ar:i,arlocal:d}}const _=Object.freeze(Object.defineProperty({__proto__:null,getResolver:p},Symbol.toStringTag,{value:"Module"}));export{f as DIDAr,M as arns,T as arnsResolver,R as create,_ as didArResolver,w as init,y as update};
//# sourceMappingURL=index-c36cdfad.js.map