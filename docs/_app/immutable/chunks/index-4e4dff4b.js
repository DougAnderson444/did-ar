import{D as f}from"./DIDAr-1e9468f1.js";import{create as R,init as w,update as y}from"./didar-53656908.js";import{b as M,a as T}from"./arnsResolver-6028f13d.js";import{_ as r}from"./preload-helper-aa6bc0ce.js";function p(){async function i(n,t,c,l){const{WarpFactory:e}=await r(()=>import("./index-22257785.js").then(o=>o.i),["index-22257785.js","base64-2f165bce.js","..\\assets\\base64-947b612f.css","preload-helper-aa6bc0ce.js","index-a9922c5c.js","index-40d6f499.js","index-07ab447c.js"],import.meta.url),a=(await e.forMainnet().contract(t.id).readState()).cachedValue.state;return{didResolutionMetadata:{contentType:"application/did+ld+json"},didDocument:a,didDocumentMetadata:{}}}async function d(n,t,c,l){const{WarpFactory:e}=await r(()=>import("./index-22257785.js").then(o=>o.i),["index-22257785.js","base64-2f165bce.js","..\\assets\\base64-947b612f.css","preload-helper-aa6bc0ce.js","index-a9922c5c.js","index-40d6f499.js","index-07ab447c.js"],import.meta.url),a=(await e.forLocal().contract(t.id).readState()).cachedValue.state;return{didResolutionMetadata:{contentType:"application/did+ld+json"},didDocument:a,didDocumentMetadata:{}}}return{ar:i,arlocal:d}}const _=Object.freeze(Object.defineProperty({__proto__:null,getResolver:p},Symbol.toStringTag,{value:"Module"}));export{f as DIDAr,M as arns,T as arnsResolver,R as create,_ as didArResolver,w as init,y as update};
//# sourceMappingURL=index-4e4dff4b.js.map