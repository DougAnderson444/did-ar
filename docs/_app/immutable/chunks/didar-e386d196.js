import{A as w,e as y}from"./_page-3c06b5ff.js";const v=null,T=[],S=["#key-0","#key-1"],m=[],A=[],M=[],b=[],x=[],I={"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2018/v1"],id:v,verificationMethod:T,authentication:S,assertionMethod:m,keyAgreement:A,capabilityInvocation:M,capabilityDelegation:b,service:x},h=`export async function handle(state, action) {\r
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
`;async function C(t,n,a=[],o="",e="0",r){const i={data:Math.random().toString().slice(-4),reward:r};o&&o.length&&(i.target=o.toString(),e&&+e>0&&(i.quantity=e.toString()));const c=await this.arweave.createTransaction(i,this.wallet);if(!n)throw new Error(`Input should be a truthy value: ${JSON.stringify(n)}`);if(a&&a.length)for(const s of a)c.addTag(s.name.toString(),s.value.toString());c.addTag("App-Name","SmartWeaveAction"),c.addTag("App-Version","0.3.0"),c.addTag("Contract",t),c.addTag("Input",JSON.stringify(n));try{return await this.post(c),c}catch(s){return console.error(s),!1}}async function k(t,n,a,o,e){var c;const r=await t.createTransaction({data:a,reward:e},n);r.addTag("App-Name","SmartWeaveContractSource"),r.addTag("App-Version","0.3.0"),r.addTag("Content-Type","application/javascript");const i=await this.post(r);if(i.status===200||i.status===208)return{contractTxId:await this.createContractFromTx(t,n,r.id,o),srcTxId:r.id};throw new Error(`Unable to write Contract Source: ${JSON.stringify((c=i==null?void 0:i.statusText)!=null?c:"")}`)}async function W(t,n,a,o,e=[],r="",i="",c){let s=await t.createTransaction({data:o,reward:c},n);if(r&&i&&r.length&&+i>0&&(s=await t.createTransaction({data:o,target:r.toString(),quantity:i.toString(),reward:c},n)),e&&e.length)for(const u of e)s.addTag(u.name.toString(),u.value.toString());s.addTag("App-Name","SmartWeaveContract"),s.addTag("App-Version","0.3.0"),s.addTag("Contract-Src",a),s.addTag("Content-Type","application/json");const l=await this.post(s);if(l.status===200||l.status===208)return s.id;throw new Error("Unable to write Contract Initial State")}let d;async function f(t){await d.api.get(`/mint/${t}/1000000000000`),await p()}async function p(){await d.api.get("mine")}async function D({local:t,wallet:n,serverUrl:a=null}={}){let o;t&&!a&&(a="http://localhost:1984"),!t&&!a&&(a="https://arweave.net:443");let{host:e,port:r,protocol:i}=new URL(a);if(e=e.replace(`:${r}`,"")||"localhost",r=r||443,i=i.replace(":",""),d=w.init({host:e,port:r,protocol:i,timeout:2e4,logging:!1}),console.log({local:t,serverUrl:a,arweave:d}),t){const c=await d.wallets.getAddress();await f(c);const l=d.transactions.post.bind(d.transactions);o=async u=>{await d.transactions.sign(u,n);const g=await l(u);return await p(),g}}else o=n.arweaveWalletAPI.dispatch,console.log("using Bundlr");return{arweave:d,wallet:"use_wallet",post:o,testing:{triggerFaucet:f,mine:p}}}async function P({local:t,wallet:n}){console.log({local:t});const{arweave:a,post:o,testing:e}=await D({local:t,wallet:n});return{arweave:a,post:o,testing:e,wallet:"use_wallet",local:t,createDid:E,updateDidDoc:$,updateContract:J,createTx:C,createContract:k,createContractFromTx:W}}async function E({RSAPublicKey:t,Ed25519PublicKey:n,options:{srcTx:a,local:o}}){if(a)try{const{data:l}=await this.arweave.transactions.get(a)}catch{a=null}console.log({contractSrc:h});const{contractTxId:e,srcTxId:r}=await this.createContract(this.arweave,this.wallet,h,JSON.stringify(I)),i=this.local?`did:arlocal:${e}`:`did:ar:${e}`,c=await N({did:i,publicKeys:[t,n]});if(!await this.createTx(e,{function:"update",id:i,verificationMethod:c}))throw new Error("no tx posted");return{did:i,srcTx:a}}async function J(t,n){const a=await this.createTx(t,{function:"update",...n});await this.arweave.transactions.sign(a,this.wallet),await this.post(a)}async function $({didDoc:t,warp:n,options:a={arweaveWallet,walletAddress,local}}){const o=t.id.replace(/^did:ar(.*?):/,"");return await this.updateContract(o,t)}async function N({did:t,publicKeys:n}){const a=[];for(let o=0;o<n.length;o++){const e=n[o],r=`${t}#key-${o}`,i=V(e)?K({did:t,id:r,key:e}):R({did:t,id:r,key:e});a.push(i)}return a}function K({did:t,id:n,key:a}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"RSA",e:"AQAB",n:a.n}}}function R({did:t,id:n,key:a}){return{id:n,type:"JsonWebKey2020",controller:t,publicKeyJwk:{kty:"OKP",crv:"Ed25519",x:y(new Uint8Array(a))}}}function V(t){return t.kty==="RSA"}export{E as createDid,R as generateEd25519VerificationMethod,N as generateVerificationMethods,P as init,J as updateContract,$ as updateDidDoc};
//# sourceMappingURL=didar-e386d196.js.map
