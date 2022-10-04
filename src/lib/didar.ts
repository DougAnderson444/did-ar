// import * as WarpSdk from 'warp-contracts';
// import type { JWKInterface } from 'arweave/node/lib/wallet';

import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';
import { base58btc } from 'multiformats/bases/base58';
import { base64url } from 'multiformats/bases/base64';

export async function createDid({
	RSAPublicKey,
	Ed25519PublicKey,
	options = { arweaveWallet, walletAddress }
}) {
	const warp = await setUpWarp({ walletAddress: options?.walletAddress });

	const { did, contractTxId } = await createDidAr({
		warp,
		wallet: option?.arweaveWallet || 'use_wallet',
		RSAPublicKey,
		Ed25519PublicKey
	});
	return did;
}

async function setUpWarp({ walletAddress = null }) {
	const { WarpFactory } = await import('warp-contracts');
	let warp =
		process.env.NODE_ENV == 'development' ? WarpFactory.forLocal() : WarpFactory.forMainnet();

	if (warp.environment == 'local' && walletAddress) {
		await warp.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
	}
	return warp;
}

export async function updateDidDoc({ didDoc, options = { arweaveWallet, walletAddress } }) {
	const warp = await setUpWarp({ walletAddress: options?.walletAddress });
	const wallet = options?.arweaveWallet || 'use_wallet';
	const contract = warp.contract(didDoc.id);
	contract.connect(wallet);
	await contract.writeInteraction({
		function: 'update',
		...didDoc
	});
}

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

	did = warp.environment == 'mainnet' ? `did:ar:${contractTxId}` : `did:arlocal:${contractTxId}`;

	// use warp-contract to update the contract state
	contract = warp.contract(contractTxId);
	contract.connect(wallet);

	await contract.writeInteraction({ function: 'create', id: did });

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

export async function generateEd25519VerificationMethod({
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
			x: base64url.encode(new Uint8Array(key))
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
