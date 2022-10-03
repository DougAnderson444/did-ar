// import * as WarpSdk from 'warp-contracts';
import type { JWKInterface } from 'arweave/node/lib/wallet';

import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';

export async function createDidAr({ warp, wallet, RSAPublicKey, Ed25519PublicKey }) {
	let didoc, did, contractTxId;

	async function generateVerificationMethod(key: JWKInterface) {
		// get length of current verificationMethod array
		didoc = (await warp.contract(contractTxId).readState()).cachedValue.state;

		const length = didoc.verificationMethod.length;

		return {
			id: `${did}#key-${length}`,
			type: 'JsonWebKey2020',
			controller: did,
			publicKeyJwk: {
				kty: 'RSA',
				e: 'AQAB',
				n: key.n
			}
		};
	}

	let contract;

	// save the DID Doc CRUD program to Arweave as a smart contract
	// get srcTxId
	const { srcTxId } = await warp.createContract.deploy({
		wallet,
		initState: JSON.stringify(initialState),
		src: contractSrc
	});

	({ contractTxId } = await warp.createContract.deployFromSourceTx({
		wallet,
		initState: JSON.stringify(initialState),
		srcTxId
	}));

	did = `did:ar:${contractTxId}`;

	// use warp-contract to update the contract state
	contract = warp.contract(contractTxId);
	contract.connect(wallet);

	await contract.writeInteraction({ function: 'create', id: contractTxId });

	const rsaMethod = await generateVerificationMethod(RSAPublicKey);
	const verificationMethod = [rsaMethod];
	// console.log({ verificationMethod });
	//  [rsaMethod];
	await contract.writeInteraction({ function: 'update', verificationMethod });

	return { did, contractTxId };
}
