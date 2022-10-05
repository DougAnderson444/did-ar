// import * as WarpSdk from 'warp-contracts';
// import type { JWKInterface } from 'arweave/node/lib/wallet';

import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';
import { base58btc as multibase58btc } from 'multiformats/bases/base58';
import {
	encodeURLSafe as base64URLfromBytes
	// decodeURLSafe as base64URLtoBytes
} from '@stablelib/base64';

export async function createDid({
	RSAPublicKey,
	Ed25519PublicKey,
	options = { arweaveWallet, walletAddress, srcTx, local }
}) {
	const warp = await setUpWarp({ walletAddress: options?.walletAddress, local: options?.local });

	const { did, srcTx, contractTxId } = await createDidAr({
		srcTx: options?.srcTx,
		warp,
		wallet: options?.arweaveWallet || 'use_wallet',
		RSAPublicKey,
		Ed25519PublicKey
	});
	return { did, srcTx };
}

export async function setUpWarp({ local }: { local: boolean } = {}) {
	// const { WarpFactory } = await import('warp-contracts/web');

	const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

	const { WarpFactory } = await import('warp-contracts'); // build process needs node version

	let warp =
		local || process.env.NODE_ENV == 'development'
			? WarpFactory.forLocal()
			: WarpFactory.forMainnet();

	if (warp.environment == 'local') {
		const walletAddress = await warp.arweave.wallets.getAddress();
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

export async function deploySrcContract({ warp, wallet = 'use_wallet' }) {
	if (!warp) throw new Error('warp instance is required');

	const { srcTxId } = await warp.createContract.deploy({
		wallet,
		initState: JSON.stringify(initialState),
		src: contractSrc
	});
	console.log({ srcTxId });
	return srcTxId;
}

export async function createDidAr({ warp, wallet, RSAPublicKey, Ed25519PublicKey, srcTx = null }) {
	if (!warp) throw new Error('warp instance is required');

	// validate srcTx is actually a valid arweave transaction on this network
	if (srcTx) {
		try {
			const { data } = await warp.arweave.transactions.get(srcTx);
		} catch (error) {
			srcTx = null;
		}
	}

	const srcTxId = srcTx || (await deploySrcContract({ warp, wallet }));

	const { contractTxId } = await warp.createContract.deployFromSourceTx({
		wallet,
		initState: JSON.stringify(initialState),
		srcTxId
	});

	const did =
		warp.environment == 'mainnet' ? `did:ar:${contractTxId}` : `did:arlocal:${contractTxId}`;

	// use warp-contract to update the contract state
	const contract = warp.contract(contractTxId);
	contract.connect(wallet);

	const verificationMethods = await generateVerificationMethods({
		did,
		publicKeys: [RSAPublicKey, Ed25519PublicKey]
	});

	await contract.writeInteraction({
		function: 'update',
		id: did,
		verificationMethod: verificationMethods
	});

	return { did, srcTx: srcTxId, contractTxId };
}

export async function generateVerificationMethods({ did, publicKeys }) {
	const verificationMethods = [];

	for (let i = 0; i < publicKeys.length; i++) {
		const key = publicKeys[i];
		const id = `${did}#key-${i}`;

		const method = isRSAKey(key)
			? await generateRSAVerificationMethod({ did, id, key })
			: await generateEd25519VerificationMethod({ did, id, key });
		verificationMethods.push(method);
	}

	return verificationMethods;
}

async function generateRSAVerificationMethod({
	did,
	id,
	key
}: {
	did: string;
	id: string;
	key: JWKInterface;
}) {
	return {
		id,
		type: 'JsonWebKey2020',
		controller: did,
		publicKeyJwk: {
			kty: 'RSA',
			e: 'AQAB',
			n: key.n
		}
	};
}

export async function generateEd25519VerificationMethod({
	did,
	id,
	key
}: {
	did: string;
	id: string;
	key: Uint8Array;
}) {
	return {
		id,
		type: 'JsonWebKey2020',
		controller: did,
		publicKeyJwk: {
			kty: 'OKP',
			crv: 'Ed25519',
			x: base64URLfromBytes(new Uint8Array(key))
		}
	};
}

async function generateEd25519MultibaseVerificationMethod({
	did,
	id,
	key
}: {
	did: string;
	id: string;
	key: Uint8Array;
}) {
	return {
		id,
		type: 'Ed25519VerificationKey2020',
		controller: did,
		publicKeyMultibase: multibase58btc.encode(key)
	};
}

function isRSAKey(key: any): boolean {
	return key.kty === 'RSA';
}
