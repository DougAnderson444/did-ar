import{_ as w}from"./preload-helper-aa6bc0ce.js";import{e as f}from"./_page-74ff3e12.js";const h=null,v=[],p=["#key-0","#key-1"],g=[],A=[],m=[],M=[],b=[],l={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:h,verificationMethod:v,authentication:p,assertionMethod:g,keyAgreement:A,capabilityInvocation:m,capabilityDelegation:M,service:b},k=`export async function handle(state, action) {\r
	const input = action.input;\r
	const caller = action.caller;\r
\r
	if (caller !== SmartWeave.contract.owner) {\r
		return { state };\r
	}\r
\r
	if (input.function === 'update') {\r
		// prevent people from accidentally updating their id\r
		if (!state.id) {\r
			if (!input.id.startsWith('did:ar')) {\r
				throw new ContractError('Invalid ID');\r
			}\r
			state.id = input.id;\r
		}\r
\r
		if (action.input.verificationMethod) {\r
			// verify that action.input.verificationMethod is an array\r
			if (\r
				!Array.isArray(action.input.verificationMethod) ||\r
				action.input.verificationMethod.length == 0\r
			) {\r
				throw new ContractError('verificationMethod must be an array with at least one method');\r
			}\r
			state.verificationMethod = action.input.verificationMethod;\r
		}\r
		state.authentication = action.input?.authentication || state.authentication;\r
		state.assertionMethod = action.input?.assertionMethod || state.assertionMethod;\r
		state.keyAgreement = action.input?.keyAgreement || state.keyAgreement;\r
		state.capabilityInvocation = action.input?.capabilityInvocation || state.capabilityInvocation;\r
		state.capabilityDelegation = action.input?.capabilityDelegation || state.capabilityDelegation;\r
		state.service = action.input?.service || state.service;\r
	}\r
\r
	return { state };\r
}\r
`;async function J({RSAPublicKey:e,Ed25519PublicKey:n,options:t={arweaveWallet,walletAddress,srcTx,local}}){const a=await d({walletAddress:t==null?void 0:t.walletAddress,local:t==null?void 0:t.local}),{did:r,srcTx:i,contractTxId:c}=await I({srcTx:t==null?void 0:t.srcTx,warp:a,wallet:(t==null?void 0:t.arweaveWallet)||"use_wallet",RSAPublicKey:e,Ed25519PublicKey:n});return{did:r,srcTx:i}}async function d({local:e}={}){const{WarpFactory:n}=await w(()=>import("./index-ee1c93f6.js").then(a=>a.i),["index-ee1c93f6.js","_page-74ff3e12.js","..\\assets\\_page-0de5b181.css","index-9cbae278.js","preload-helper-aa6bc0ce.js","index-299ccbcc.js"],import.meta.url);let t=e?n.forLocal():n.forMainnet();if(t.environment=="local"){const a=await t.arweave.wallets.getAddress();await t.arweave.api.get(`/mint/${a}/1000000000000000`)}return t}async function K({didDoc:e,options:n={arweaveWallet,walletAddress}}){const t=await d({walletAddress:n==null?void 0:n.walletAddress}),a=(n==null?void 0:n.arweaveWallet)||"use_wallet",r=t.contract(e.id);r.connect(a),await r.writeInteraction({function:"update",...e})}async function x({warp:e,wallet:n="use_wallet"}){if(!e)throw new Error("warp instance is required");const{srcTxId:t}=await e.createContract.deploy({wallet:n,initState:JSON.stringify(l),src:k});return console.log({srcTxId:t}),t}async function I({warp:e,wallet:n,RSAPublicKey:t,Ed25519PublicKey:a,srcTx:r=null}){if(!e)throw new Error("warp instance is required");if(r)try{const{data:y}=await e.arweave.transactions.get(r)}catch{r=null}const i=r||await x({warp:e,wallet:n}),{contractTxId:c}=await e.createContract.deployFromSourceTx({wallet:n,initState:JSON.stringify(l),srcTxId:i}),o=e.environment=="mainnet"?`did:ar:${c}`:`did:arlocal:${c}`,s=e.contract(c);s.connect(n);const u=await S({did:o,publicKeys:[t,a]});return await s.writeInteraction({function:"update",id:o,verificationMethod:u}),{did:o,srcTx:i,contractTxId:c}}async function S({did:e,publicKeys:n}){const t=[];for(let a=0;a<n.length;a++){const r=n[a],i=`${e}#key-${a}`,c=D(r)?_({did:e,id:i,key:r}):T({did:e,id:i,key:r});t.push(c)}return t}function _({did:e,id:n,key:t}){return{id:n,type:"JsonWebKey2020",controller:e,publicKeyJwk:{kty:"RSA",e:"AQAB",n:t.n}}}function T({did:e,id:n,key:t}){return{id:n,type:"JsonWebKey2020",controller:e,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:f(new Uint8Array(t))}}}function D(e){return e.kty==="RSA"}export{J as createDid,I as createDidAr,x as deploySrcContract,T as generateEd25519VerificationMethod,S as generateVerificationMethods,d as setUpWarp,K as updateDidDoc};
//# sourceMappingURL=didar-31853a51.js.map
