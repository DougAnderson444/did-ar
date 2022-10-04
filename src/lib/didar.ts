// import * as WarpSdk from 'warp-contracts';
import type { JWKInterface } from 'arweave/node/lib/wallet';

import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';
import { base58btc } from 'multiformats/bases/base58';
import { base64url } from 'multiformats/bases/base64';

export async function createDidAr({ warp, wallet, RSAPublicKey, Ed25519PublicKey }) {
	let didDoc, did, contract, contractTxId;

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

	didDoc = (await warp.contract(contractTxId).readState()).cachedValue.state;

	const verificationMethods = await generateVerificationMethods({
		didDoc,
		publicKeys: [RSAPublicKey, Ed25519PublicKey]
	});

	await contract.writeInteraction({ function: 'update', verificationMethod: verificationMethods });

	return { did, contractTxId };
}

export async function generateVerificationMethods({ didDoc, publicKeys }) {
	const verificationMethods = [];

	for (let i = 0; i < publicKeys.length; i++) {
		const key = publicKeys[i];
		const id = `${didDoc.id}#key-${i}`;

		const method = isRSAKey(key)
			? await generateRSAVerificationMethod({ didDoc, id, key })
			: await generateEd25519VerificationMethod({ didDoc, id, key });
		verificationMethods.push(method);
	}

	return verificationMethods;
}

async function generateRSAVerificationMethod({
	didDoc,
	id,
	key
}: {
	didDoc: any;
	id: string;
	key: JWKInterface;
}) {
	return {
		id,
		type: 'JsonWebKey2020',
		controller: didDoc.id,
		publicKeyJwk: {
			kty: 'RSA',
			e: 'AQAB',
			n: key.n
		}
	};
}

async function generateEd25519VerificationMethod({
	didDoc,
	id,
	key
}: {
	didDoc: any;
	id: string;
	key: Uint8Array;
}) {
	return {
		id,
		type: 'JsonWebKey2020',
		controller: didDoc.id,
		publicKeyJwk: {
			kty: 'OKP',
			crv: 'Ed25519',
			x: base64url.encode(key)
		}
	};
}

async function generateEd25519MultibaseVerificationMethod({
	didDoc,
	id,
	key
}: {
	didDoc: any;
	id: string;
	key: Uint8Array;
}) {
	return {
		id,
		type: 'Ed25519VerificationKey2020',
		controller: didDoc.id,
		publicKeyMultibase: base58btc.encode(key)
	};
}

function isRSAKey(key: any): boolean {
	return key.kty === 'RSA';
}
