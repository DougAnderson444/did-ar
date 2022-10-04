# DID:AR Component

Enables users to create a smart contract on Arweave to store their Decentralized Identity Document (DID Doc).

# Forking The Smart Contract

With Arweave, using Warp Contract's `deployFromSourceTx` you can use an existing deployed contract and add your own initial state to make a new DID Doc.

# DIF compatible Universal DID Resolver

This library exports a DID Resolver compliant with the [DIF](https://github.com/decentralized-identity/did-resolver).

```js
import { didArResolver } from '@peerpiper/did-ar';
import { Resolver } from 'did-resolver';

const arResolver = didArResolver.getResolver();
const resolver = new DIDResolver(arResolver);
const didDocument = (await resolver.resolve(did)).didDocument;

const jwk = didDoc.verificationMethod[1].publicKeyJwk;
// etc.
```

# References

[DID Core](https://w3c.github.io/did-core/)
[JOSE RFC](https://www.rfc-editor.org/rfc/rfc8037.html#section-2)
