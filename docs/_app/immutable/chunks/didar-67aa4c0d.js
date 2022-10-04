import{_ as y}from"./preload-helper-aa6bc0ce.js";import{b as f}from"./_page-d50b9f06.js";const w=null,h=[],p=["#key-0","#key-1"],v=[],A=[],m=[],M=[],g=[],s={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:w,verificationMethod:h,authentication:p,assertionMethod:v,keyAgreement:A,capabilityInvocation:m,capabilityDelegation:M,service:g},b=`export async function handle(state, action) {\r
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
`;async function E({RSAPublicKey:t,Ed25519PublicKey:e,options:n={arweaveWallet,walletAddress}}){const a=await d({walletAddress:n==null?void 0:n.walletAddress}),{did:i,contractTxId:r}=await k({warp:a,wallet:(option==null?void 0:option.arweaveWallet)||"use_wallet",RSAPublicKey:t,Ed25519PublicKey:e});return i}async function d({walletAddress:t=null}){const{WarpFactory:e}=await y(()=>import("./index-dc4e2dfe.js").then(a=>a.i),[],import.meta.url);let n=e.forMainnet();return n.environment=="local"&&t&&await n.arweave.api.get(`/mint/${t}/1000000000000000`),n}async function J({didDoc:t,options:e={arweaveWallet,walletAddress}}){const n=await d({walletAddress:e==null?void 0:e.walletAddress}),a=(e==null?void 0:e.arweaveWallet)||"use_wallet",i=n.contract(t.id);i.connect(a),await i.writeInteraction({function:"update",...t})}async function k({warp:t,wallet:e,RSAPublicKey:n,Ed25519PublicKey:a}){let i,r,c,o;const{srcTxId:l}=await t.createContract.deploy({wallet:e,initState:JSON.stringify(s),src:b});({contractTxId:o}=await t.createContract.deployFromSourceTx({wallet:e,initState:JSON.stringify(s),srcTxId:l})),r=t.environment=="mainnet"?`did:ar:${o}`:`did:arlocal:${o}`,c=t.contract(o),c.connect(e),await c.writeInteraction({function:"create",id:r}),i=(await t.contract(o).readState()).cachedValue.state;const u=await I({didDoc:i,publicKeys:[n,a]});return await c.writeInteraction({function:"update",verificationMethod:u}),{did:r,contractTxId:o}}async function I({didDoc:t,publicKeys:e}){const n=[];for(let a=0;a<e.length;a++){const i=e[a],r=`${t.id}#key-${a}`,c=_(i)?await S({didDoc:t,id:r,key:i}):await W({didDoc:t,id:r,key:i});n.push(c)}return n}async function S({didDoc:t,id:e,key:n}){return{id:e,type:"JsonWebKey2020",controller:t.id,publicKeyJwk:{kty:"RSA",e:"AQAB",n:n.n}}}async function W({didDoc:t,id:e,key:n}){return{id:e,type:"JsonWebKey2020",controller:t.id,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:f.encode(new Uint8Array(n))}}}function _(t){return t.kty==="RSA"}export{E as createDid,k as createDidAr,W as generateEd25519VerificationMethod,I as generateVerificationMethods,J as updateDidDoc};
