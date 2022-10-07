import{_ as l}from"./preload-helper-aa6bc0ce.js";import{e as d}from"./_page-6f92f730.js";const p=null,u=[],h=["#key-0","#key-1"],w=[],y=[],f=[],v=[],g=[],c={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:p,verificationMethod:u,authentication:h,assertionMethod:w,keyAgreement:y,capabilityInvocation:f,capabilityDelegation:v,service:g},m=`export async function handle(state, action) {\r
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
`;async function x({local:t,wallet:n="use_wallet"}={local:!1,wallet:"use_wallet"}){const{WarpFactory:e}=await l(()=>import("./index-93556636.js").then(a=>a.i),["index-93556636.js","_page-6f92f730.js","..\\assets\\_page-0de5b181.css","index-9cbae278.js","preload-helper-aa6bc0ce.js","index-299ccbcc.js","index-67c5ef46.js"],import.meta.url),i=t?e.forLocal():e.forMainnet();return console.log("warp.environment",i.environment),{warp:i,wallet:n,create:M,read:A,update:b}}async function M({RSAPublicKey:t,Ed25519PublicKey:n,srcTx:e=null}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");if(e)try{const{data:s}=await this.warp.arweave.transactions.get(e)}catch{e=null}const i=e||(await this.warp.createContract.deploy({wallet:this.wallet,initState:JSON.stringify(c),src:m})).srcTxId,{contractTxId:a}=await this.warp.createContract.deployFromSourceTx({wallet:this.wallet,initState:JSON.stringify(c),srcTxId:i}),r=this.warp.environment=="mainnet"?`did:ar:${a}`:`did:arlocal:${a}`,o=await k({did:r,publicKeys:[t,n]});return await this.update({id:r,verificationMethod:o}),r}async function b({id:t,...n}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const e=t.replace(/^did:ar(.*?):/,""),i=this.warp.contract(e);i.connect(this.wallet),await i.writeInteraction({...n,id:t,function:"update"})}async function A(t){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const n=t.replace(/^did:ar(.*?):/,"");return(await this.warp.contract(n).readState()).cachedValue.state}async function k({did:t,publicKeys:n}){const e=[];for(let i=0;i<n.length;i++){const a=n[i],r=`${t}#key-${i}`,o=_(a)?I({did:t,id:r,key:a}):S({did:t,id:r,key:a});e.push(o)}return e}function I({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"RSA",e:"AQAB",n:e.n}}}function S({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:d(new Uint8Array(e))}}}function _(t){return t.kty==="RSA"}export{M as create,S as generateEd25519VerificationMethod,k as generateVerificationMethods,x as init,A as read,b as update};
//# sourceMappingURL=didar-877d3126.js.map
