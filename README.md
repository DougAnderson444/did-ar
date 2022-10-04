# DID:AR

Enables users to create a [smartweave contract](https://arweave.medium.com/introducing-smartweave-building-smart-contracts-with-arweave-1fc85cb3b632) on [Arweave](https://www.arweave.org/) to store their [Decentralized Identity Document](https://www.w3.org/TR/did-core/) (DID Doc).

## Create DID

Using an Arweave enabled wallet or passed in JWK, pass an RSA JWK and/or Ed25519PublicKey bytes (Uint8Array) to `createDid`, which will create a did and did document saved as the Arweave Smartweave contract state:

```js
import { createDid } from '@peerpiper/did-ar';

const did = await createDid({ RSAPublicKey: JWK, Ed25519PublicKey: Uint8Array });
console.log(did); // did:ar:abc123zyx-ELEMENOPee
// or when running in `vite dev` mode:
console.log(did); // did:arlocal:abc123zyx-ELEMENOPee
```

## Read DID (Resolve)

This library exports a DID Resolver compliant with the [DIF](https://github.com/decentralized-identity/did-resolver).

```js
import { didArResolver } from '@peerpiper/did-ar';
import { Resolver } from 'did-resolver'; // Decentralized Identity Foundation

const did = `did:ar:abc123zyx-ELEMENOPee`;
// or when running in `vite dev` mode:
// did:arlocal

const arResolver = didArResolver.getResolver();
resolver = new Resolver(arResolver);
const didDoc = (await resolver.resolve(did)).didDocument;

console.log(didDoc.verificationMethod[0].publicKeyJwk); // this did's public key
```

## Update DID Document

To update, just pass the new DID Doc to `did-ar`. Then `did:ar` takes the Arweave wallet or JWK in order for the Smart Contract to verify that the wallet owner owns the contract (and by extention the did:ar). If anyone other than the owner of the contract tries to update the did document, the contract will throw a Contract error and not update the contract.

The contract then replaces the old DID Document with the new one.

```js
import { updateDidDoc } from '@peerpiper/did-ar';

// using a arweave wallet like `ArConnect` or [`@peerpiper/web3-wallet-connector`](https://www.npmjs.com/package/@peerpiper/web3-wallet-connector):
updateDidDoc({ didDoc });

// or, old school passing in a private key JWK / for testing:
updateDidDoc({ didDoc, options: { arweaveWallet } });
```

## Forking The Smart Contract

With Arweave, using Warp Contract's `deployFromSourceTx` you can use an existing deployed contract and add your own initial state to make a new DID Doc.

# References

[DID Core](https://w3c.github.io/did-core/)

[JOSE RFC](https://www.rfc-editor.org/rfc/rfc8037.html#section-2)
