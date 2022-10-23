import{_ as l}from"./preload-helper-aa6bc0ce.js";import{e as d}from"./base64-2f165bce.js";const p=null,u=[],h=["#key-0","#key-1"],w=[],y=[],f=[],v=[],m=[],c={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:p,verificationMethod:u,authentication:h,assertionMethod:w,keyAgreement:y,capabilityInvocation:f,capabilityDelegation:v,service:m},g=`export async function handle(state, action) {\r
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
`;async function E({local:t,wallet:n="use_wallet"}={local:!1,wallet:"use_wallet"}){const{WarpFactory:e}=await l(()=>import("./index-22257785.js").then(a=>a.i),["index-22257785.js","base64-2f165bce.js","..\\assets\\base64-947b612f.css","preload-helper-aa6bc0ce.js","index-a9922c5c.js","index-40d6f499.js","index-07ab447c.js"],import.meta.url),i=t?e.forLocal():e.forMainnet();return console.log("warp.environment",i.environment),{warp:i,wallet:n,create:M,read:A,update:b}}async function M({RSAPublicKey:t,Ed25519PublicKey:n,srcTx:e=null}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const i=[{name:"DID-AR",value:"true"}],{contractTxId:a,srcTxId:o}=e?await this.warp.createContract.deployFromSourceTx({wallet:this.wallet,initState:JSON.stringify(c),srcTxId:e,tags:i}):await this.warp.createContract.deploy({wallet:this.wallet,initState:JSON.stringify(c),src:g,tags:i}),r=this.warp.environment=="mainnet"?`did:ar:${a}`:`did:arlocal:${a}`,s=await I({did:r,publicKeys:[t,n]});return await this.update({id:r,verificationMethod:s}),r}async function b({id:t,...n}){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const e=t.replace(/^did:ar(.*?):/,""),i=this.warp.contract(e);i.connect(this.wallet),await i.writeInteraction({...n,id:t,function:"update"})}async function A(t){if(!this.warp||!this.wallet)throw new Error("warp and wallet required in parent object");const n=t.replace(/^did:ar(.*?):/,"");return(await this.warp.contract(n).readState()).cachedValue.state}async function I({did:t,publicKeys:n}){const e=[];for(let i=0;i<n.length;i++){const a=n[i],o=`${t}#key-${i}`,r=D(a)?k({did:t,id:o,key:a}):S({did:t,id:o,key:a});e.push(r)}return e}function k({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"RSA",e:"AQAB",n:e.n}}}function S({did:t,id:n,key:e}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:d(new Uint8Array(e))}}}function D(t){return t.kty==="RSA"}export{M as create,S as generateEd25519VerificationMethod,I as generateVerificationMethods,E as init,A as read,b as update};
//# sourceMappingURL=didar-53656908.js.map
