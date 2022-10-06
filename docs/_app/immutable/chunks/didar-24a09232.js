import{_ as y}from"./preload-helper-aa6bc0ce.js";import{e as f}from"./_page-1f748e3b.js";const w=null,h=[],v=["#key-0","#key-1"],p=[],g=[],m=[],A=[],M=[],l={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:w,verificationMethod:h,authentication:v,assertionMethod:p,keyAgreement:g,capabilityInvocation:m,capabilityDelegation:A,service:M},b=`export async function handle(state, action) {\r
	const input = action.input;\r
	const caller = action.caller;\r
\r
	if (caller !== SmartWeave.contract.owner) {\r
		return { state };\r
	}\r
\r
	if (input.function === 'update') {\r
		if (!state.id) {\r
			if (!input.id.startsWith('did:ar')) {\r
				throw new ContractError('Invalid ID');\r
			}\r
			state.id = input.id;\r
		}\r
\r
		if (input.verificationMethod) {\r
			if (!Array.isArray(input.verificationMethod) || input.verificationMethod.length === 0) {\r
				throw new ContractError('verificationMethod must be an array with at least one method');\r
			}\r
			state.verificationMethod = input.verificationMethod;\r
		}\r
		state.authentication = input?.authentication || state.authentication;\r
		state.assertionMethod = input?.assertionMethod || state.assertionMethod;\r
		state.keyAgreement = input?.keyAgreement || state.keyAgreement;\r
		state.capabilityInvocation = input?.capabilityInvocation || state.capabilityInvocation;\r
		state.capabilityDelegation = input?.capabilityDelegation || state.capabilityDelegation;\r
		state.service = input?.service || state.service;\r
	}\r
\r
	return { state };\r
}\r
`;async function J({RSAPublicKey:e,Ed25519PublicKey:n,options:t={arweaveWallet,walletAddress,srcTx,local}}){const a=await x({walletAddress:t==null?void 0:t.walletAddress,local:t==null?void 0:t.local}),{did:r,srcTx:i,contractTxId:c}=await k({srcTx:t==null?void 0:t.srcTx,warp:a,wallet:(t==null?void 0:t.arweaveWallet)||"use_wallet",RSAPublicKey:e,Ed25519PublicKey:n});return{did:r,srcTx:i}}async function x({local:e}={}){const{WarpFactory:n}=await y(()=>import("./index-1374be88.js").then(a=>a.i),["index-1374be88.js","_page-1f748e3b.js","..\\assets\\_page-0de5b181.css","index-9cbae278.js","preload-helper-aa6bc0ce.js","index-299ccbcc.js"],import.meta.url);let t=e?n.forLocal():n.forMainnet();if(t.environment=="local"){const a=await t.arweave.wallets.getAddress();await t.arweave.api.get(`/mint/${a}/1000000000000000`)}return t}async function K({didDoc:e,warp:n,options:t={arweaveWallet,walletAddress,local}}){const a=e.id.replace(/^did:ar(.*?):/,""),r=n.contract(a);r.connect(t.arweaveWallet),await r.writeInteraction({function:"update",...e})}async function I({warp:e,wallet:n="use_wallet"}){if(!e)throw new Error("warp instance is required");const{srcTxId:t}=await e.createContract.deploy({wallet:n,initState:JSON.stringify(l),src:b});return console.log({srcTxId:t}),t}async function k({warp:e,wallet:n,RSAPublicKey:t,Ed25519PublicKey:a,srcTx:r=null}){if(!e)throw new Error("warp instance is required");if(r)try{const{data:u}=await e.arweave.transactions.get(r)}catch{r=null}const i=r||await I({warp:e,wallet:n}),{contractTxId:c}=await e.createContract.deployFromSourceTx({wallet:n,initState:JSON.stringify(l),srcTxId:i}),o=e.environment=="mainnet"?`did:ar:${c}`:`did:arlocal:${c}`,s=e.contract(c);s.connect(n);const d=await S({did:o,publicKeys:[t,a]});return await s.writeInteraction({function:"update",id:o,verificationMethod:d}),{did:o,srcTx:i,contractTxId:c}}async function S({did:e,publicKeys:n}){const t=[];for(let a=0;a<n.length;a++){const r=n[a],i=`${e}#key-${a}`,c=D(r)?T({did:e,id:i,key:r}):_({did:e,id:i,key:r});t.push(c)}return t}function T({did:e,id:n,key:t}){return{id:n,type:"JsonWebKey2020",controller:e,publicKeyJwk:{kty:"RSA",e:"AQAB",n:t.n}}}function _({did:e,id:n,key:t}){return{id:n,type:"JsonWebKey2020",controller:e,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:f(new Uint8Array(t))}}}function D(e){return e.kty==="RSA"}export{J as createDid,k as createDidAr,I as deploySrcContract,_ as generateEd25519VerificationMethod,S as generateVerificationMethods,x as setUpWarp,K as updateDidDoc};
//# sourceMappingURL=didar-24a09232.js.map
