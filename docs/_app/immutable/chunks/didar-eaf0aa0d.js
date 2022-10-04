import{_ as y}from"./preload-helper-aa6bc0ce.js";import{b as w}from"./_page-7924874d.js";const f=null,h=[],v=["#key-0","#key-1"],p=[],A=[],m=[],M=[],g=[],s={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:f,verificationMethod:h,authentication:v,assertionMethod:p,keyAgreement:A,capabilityInvocation:m,capabilityDelegation:M,service:g},b=`export async function handle(state, action) {\r
	const input = action.input;\r
	const caller = action.caller;\r
\r
	if (caller !== SmartWeave.contract.owner) {\r
		return { state };\r
	}\r
\r
	if (input.function === 'create' && !state.id) {\r
		if (!input.id.startsWith('did:ar')) {\r
			throw new ContractError('Invalid ID');\r
		}\r
		state.id = input.id;\r
	}\r
\r
	if (input.function === 'update') {\r
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
`;async function E({RSAPublicKey:t,Ed25519PublicKey:e,options:n={arweaveWallet,walletAddress}}){const i=await d({walletAddress:n==null?void 0:n.walletAddress}),{did:a,didDoc:c,contractTxId:r}=await k({warp:i,wallet:(n==null?void 0:n.arweaveWallet)||"use_wallet",RSAPublicKey:t,Ed25519PublicKey:e});return a}async function d({walletAddress:t=null}){const{WarpFactory:e}=await y(()=>import("./index-dc4e2dfe.js").then(i=>i.i),[],import.meta.url);let n=e.forMainnet();return n.environment=="local"&&t&&await n.arweave.api.get(`/mint/${t}/1000000000000000`),n}async function J({didDoc:t,options:e={arweaveWallet,walletAddress}}){const n=await d({walletAddress:e==null?void 0:e.walletAddress}),i=(e==null?void 0:e.arweaveWallet)||"use_wallet",a=n.contract(t.id);a.connect(i),await a.writeInteraction({function:"update",...t})}async function k({warp:t,wallet:e,RSAPublicKey:n,Ed25519PublicKey:i}){let a,c,r,o;const{srcTxId:l}=await t.createContract.deploy({wallet:e,initState:JSON.stringify(s),src:b});({contractTxId:o}=await t.createContract.deployFromSourceTx({wallet:e,initState:JSON.stringify(s),srcTxId:l})),c=t.environment=="mainnet"?`did:ar:${o}`:`did:arlocal:${o}`,r=t.contract(o),r.connect(e),await r.writeInteraction({function:"create",id:c}),a=(await t.contract(o).readState()).cachedValue.state;const u=await I({didDoc:a,publicKeys:[n,i]});return await r.writeInteraction({function:"update",verificationMethod:u}),a=(await r.readState()).cachedValue.state,{did:c,didDoc:a,contractTxId:o}}async function I({didDoc:t,publicKeys:e}){const n=[];for(let i=0;i<e.length;i++){const a=e[i],c=`${t.id}#key-${i}`,r=W(a)?await S({didDoc:t,id:c,key:a}):await D({didDoc:t,id:c,key:a});n.push(r)}return n}async function S({didDoc:t,id:e,key:n}){return{id:e,type:"JsonWebKey2020",controller:t.id,publicKeyJwk:{kty:"RSA",e:"AQAB",n:n.n}}}async function D({didDoc:t,id:e,key:n}){return{id:e,type:"JsonWebKey2020",controller:t.id,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:w.encode(new Uint8Array(n))}}}function W(t){return t.kty==="RSA"}export{E as createDid,k as createDidAr,D as generateEd25519VerificationMethod,I as generateVerificationMethods,J as updateDidDoc};
