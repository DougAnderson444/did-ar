# DID:AR

I just wrote this, so there will be some changes, improvements and bugs. But feel free to play around with it.

Enables users to create a [smartweave contract](https://arweave.medium.com/introducing-smartweave-building-smart-contracts-with-arweave-1fc85cb3b632) on [Arweave](https://www.arweave.org/) to store their [Decentralized Identity Document](https://www.w3.org/TR/did-core/) (DID Doc).

✔️📇 Your Own Permanent Identity on Web3

✔️🗃️ [Resolve DID](https://douganderson444.github.io/did-ar/search?name=douganderson444) from `.ar` name, so `douganderson444.ar` -> `did:ar:....`

✔️💰 No Tokens / cryptocurrency (under 100kb), thanks to [Bundlr](https://bundlr.network/)!

✔️♾️ Lasts forever, thanks to [Arweave](https://www.arweave.org/)!

✔️💻 Saves to your OWN device, thanks to [PeerPiper](https://peerpiper.github.io/iframe-wallet-sdk/)!

✔️🗃️ Conveniently Control Your Data

## Install

Package [deployed to npm](https://www.npmjs.com/package/@peerpiper/did-ar) `@peerpiper/did-ar`

```sh
npm i @peerpiper/did-ar
```

## Initialize

```ts
import { init } from 'did-ar';

const didar: DIDAr = await init({
	// local: true, // default is false, uses local Arweave instance
	// wallet: JWKInterface, // default is 'use_wallet' if no wallet is set
});

// which gives you a DIDAr instance:
interface DIDAr {
	warp: WarpFactory;
	wallet: JWKInterface | 'use_wallet';
	create: Function;
	read: Function;
	update: Function;
}
```

## Create DID

Pass an RSA Public Key JWK and Ed25519PublicKey bytes (Uint8Array) to `create`, which will create a did and did document saved as the Arweave Smartweave contract state.

The [Demo](https://github.com/DougAnderson444/did-ar/blob/master/src/routes/%2Bpage.svelte) uses the keys from a [PeerPiper/web3-wallet-connector](https://github.com/PeerPiper/web3-wallet-connector) to create the DID.

```js
const did = await didar.create({ RSAPublicKey: JWK, Ed25519PublicKey: Uint8Array });
console.log(did); // did:ar:abc123zyx-ELEMENOPee
// or when running in `vite dev` mode:
console.log(did); // did:arlocal:abc123zyx-ELEMENOPee
```

## Read DID (Resolve)

If you have a `didar` instance, you can simply `read` from it:

```js
const didDoc = await didar.read(did);
```

If you are using DID from an external source, read using the resolver, as this library exports a standalone DID Resolver compliant with the [DIF](https://github.com/decentralized-identity/did-resolver).

```js
import { didArResolver } from '@peerpiper/did-ar';
import { Resolver } from 'did-resolver'; // Decentralized Identity Foundation

const did = `did:ar:abc123zyx-ELEMENOPeeeeeeeeeeeeeeee`;
// or when running in `vite dev` mode:
// did:arlocal

const arResolver = didArResolver.getResolver();
resolver = new Resolver(arResolver);
const didDoc = (await resolver.resolve(did)).didDocument;

console.log(didDoc.verificationMethod[0].publicKeyJwk); // one of the did's public keys
```

## Read from `.ar` name (Resolve DID from Arweave Name Service / Name Token)

```js
import { arnsResolver } from '@peerpiper/did-ar';

const arnsName = 'douganderson444'; // From: douganderson444.ar or 'douganderson444.arweave.dev' || 'douganderson444.ar.page';
const did = await arnsResolver(arnsName);

console.log(did); // did:ar:UGnqpxdraMbkmG-4F6jU7xkFhErNgaXLQf39tW7yYck
```

## Update DID Document

To update, just pass the new DID Doc properties you wish to update. Then, `did-ar` verifies that the caller is the wallet owner (and by extention the `did:ar` owner). If anyone other than the owner of the contract tries to update the did document, the contract will only return the current DID Doc state.

The contract then replaces the old DID Document properties with the new properties.

```js
const id = did;
let didDoc; // exsiting DID Doc

const replaceProperties = {
	service: [
		...didDoc.service, // keep existing service listings
		{
			id: `${did}#linked-domain`,
			type: 'LinkedDomains',
			serviceEndpoint: 'https://douganderson444.arweave.dev'
		}
	]
};

await didar.update({ id, ...replaceProperties }); // will change service property of DID Doc
```

## Transfer

You can add or transfer controller of this DID by [adding/changing the array of controllers](https://w3c.github.io/did-core/#independent-control).

Be careful! Only the controller can update the DID Doc. Make sure you know what you are doing here.

<a href='https://w3c.github.io/did-core/#independent-control' target="_blank">

![Controllers](./static/figure-c.1-independent-did-controllers.svg 'Controllers')

</a>

Transfer is just an update where the controller is updated. Send an `update` command with the added/changed controller property:

```js
const id = did;
let didDoc; // exsiting DID Doc

const replaceProperties = {
	...didDoc,
	controller: ['did:ar:newControllerDID']
};

await didar.update({ id, ...replaceProperties }); // will change service property of DID Doc
```

## Delete

TODO: Implement [ANS-106 Do Not Store Request](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-106.md)

## What can you do with a DeID?

You can grab the keys out of the document. From the RSA key, you can get an Arweave address and look up their Arweave data. You can grab their DAG from ArDAG and interact with that data and apps too.

## Forking The Smart Contract

With Arweave, using Warp Contract's `deployFromSourceTx` you can use an existing deployed contract and add your own initial state to make a new DID Doc.

TODO: List published version so others can deploy from source.

# References

[DID Core W3C Reccomendation](https://w3c.github.io/did-core/)

[JOSE JWK RFC](https://www.rfc-editor.org/rfc/rfc8037.html#section-2)
