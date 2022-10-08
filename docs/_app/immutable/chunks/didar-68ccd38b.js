import{_ as s}from"./preload-helper-aa6bc0ce.js";import{e as l}from"./_page-145986b2.js";const d=null,p=[],u=["#key-0","#key-1"],h=[],w=[],y=[],f=[],v=[],c={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:d,verificationMethod:p,authentication:u,assertionMethod:h,keyAgreement:w,capabilityInvocation:y,capabilityDelegation:f,service:v},m=`export async function handle(state, action) {\r
	const input = action.input;\r
	const caller = action.caller;\r
\r
	if (caller !== SmartWeave.contract.owner) {\r
		return { state };\r
	}\r
\r
	if (input.function === 'update') {\r
		if (!state.id) {\r
			if (!input?.id?.startsWith('did:ar')) {\r
				throw new ContractError('Invalid ID');\r
			}\r
			state.id = input?.id || state.id;\r
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
`;async function D({local:t,wallet:n="use_wallet"}={local:!1,wallet:"use_wallet"}){const{WarpFactory:e}=await s(()=>import("./index-21bf174b.js").then(a=>a.i),["index-21bf174b.js","_page-145986b2.js","..\\assets\\_page-0de5b181.css","index-0b5df8a5.js","preload-helper-aa6bc0ce.js","index-8a508f05.js","index-aff5f390.js"],import.meta.url),i=t?e.forLocal():e.forMainnet();return console.log("warp.environment",i.environment),{warp:i,wallet:n,create:g,read:b,update:M}}async function g({RSAPublicKey:t,Ed25519PublicKey:n,srcTx:e=null}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const{contractTxId:i,srcTxId:a}=e?await this.warp.createContract.deployFromSourceTx({wallet:this.wallet,initState:JSON.stringify(c),srcTxId:e}):await this.warp.createContract.deploy({wallet:this.wallet,initState:JSON.stringify(c),src:m}),r=this.warp.environment=="mainnet"?`did:ar:${i}`:`did:arlocal:${i}`,o=await A({did:r,publicKeys:[t,n]});return await this.update({id:r,verificationMethod:o}),r}async function M({id:t,...n}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const e=t.replace(/^did:ar(.*?):/,""),i=this.warp.contract(e);i.connect(this.wallet),await i.writeInteraction({...n,id:t,function:"update"})}async function b(t){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const n=t.replace(/^did:ar(.*?):/,"");return(await this.warp.contract(n).readState()).cachedValue.state}async function A({did:t,publicKeys:n}){const e=[];for(let i=0;i<n.length;i++){const a=n[i],r=`${t}#key-${i}`,o=S(a)?k({did:t,id:r,key:a}):I({did:t,id:r,key:a});e.push(o)}return e}function k({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"RSA",e:"AQAB",n:e.n}}}function I({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:l(new Uint8Array(e))}}}function S(t){return t.kty==="RSA"}export{g as create,I as generateEd25519VerificationMethod,A as generateVerificationMethods,D as init,b as read,M as update};
//# sourceMappingURL=didar-68ccd38b.js.map
