import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';
import {
	encodeURLSafe as base64URLfromBytes
	// decodeURLSafe as base64URLtoBytes
} from '@stablelib/base64';

// import { base58btc as multibase58btc } from 'multiformats/bases/base58';

const SRC_TX = 'SoPGF6d-5oLy6-uKpJD2J2tT0ytM9LsXWbP5YQnVT6Q';

export interface DIDAr {
	warp: WarpFactory;
	wallet: JWKInterface | 'use_wallet';
	create: Function;
	read: Function;
	update: Function;
}

// supply your own warp instance:
export function DidArFactory({ warp, wallet }): DIDAr {
	return {
		warp,
		wallet,
		create,
		read,
		update
	};
}

export async function init(
	{
		local = false,
		wallet = 'use_wallet',
		warp = null
	}: {
		local?: boolean;
		wallet?: 'use_wallet';
		warp?: WarpFactory;
	} = {
		local: false,
		wallet: 'use_wallet',
		warp: null
	}
): Promise<DIDAr> {
	const { WarpFactory } = await import('warp-contracts');
	warp = warp || (local ? WarpFactory.forLocal() : WarpFactory.forMainnet());

	return DidArFactory({ warp, wallet }) as DIDAr;
}

export async function create({
	RSAPublicKey,
	Ed25519PublicKey,
	srcTx = SRC_TX
}: {
	RSAPublicKey?: JWKInterface;
	Ed25519PublicKey?: Uint8Array;
	srcTx?: string;
} = {}): Promise<string> {
	if (!this.warp || !this.wallet) throw new Error('warp and wallet required in parent object');
	if (!RSAPublicKey || !isRSAKey(RSAPublicKey)) throw new Error('RSAPublicKey required');
	if (!Ed25519PublicKey) throw new Error('Ed25519PublicKey required');

	// validate srcTx is actually a valid arweave transaction on this network
	// can't use with warp contracts, need get search for it using arql/ardb tags
	// if (srcTx) {
	// 	try {
	// 		const { data } = await this.warp.arweave.transactions.get(srcTx);
	// 	} catch (error) {
	// 		srcTx = null;
	// 	}
	// }

	const tags = [{ name: 'DID-AR', value: 'true' }];

	const { contractTxId, srcTxId } = srcTx
		? await this.warp.createContract.deployFromSourceTx({
				wallet: this.wallet,
				initState: JSON.stringify(initialState),
				srcTxId: srcTx,
				tags
		  })
		: await this.warp.createContract.deploy({
				wallet: this.wallet,
				initState: JSON.stringify(initialState),
				src: contractSrc,
				tags
		  });

	const did =
		this.warp.environment == 'mainnet' ? `did:ar:${contractTxId}` : `did:arlocal:${contractTxId}`;

	const verificationMethods = await generateVerificationMethods({
		did,
		publicKeys: [RSAPublicKey, Ed25519PublicKey]
	});

	await this.update({
		id: did,
		controller: [did],
		verificationMethod: verificationMethods
	});

	return did; // { did, srcTx: srcTxId };
}

/**
 * Pass in a Partial DID Doc with at least an id to get the contractTxId
 */
export async function update({ id, ...rest }) {
	if (!this.warp || !this.wallet) throw new Error('warp and wallet required in parent object');

	const contractTxId = id.replace(/^did:ar(.*?):/, '');
	const contract = this.warp.contract(contractTxId);
	contract.connect(this.wallet);
	try {
		await contract.writeInteraction({
			...rest,
			id,
			function: 'update'
		});
	} catch (error) {
		console.error(error);
	}
}

export async function read(did) {
	if (!this.warp || !this.wallet) throw new Error('warp and wallet required in parent object');

	const contractTxId = did.replace(/^did:ar(.*?):/, '');
	const contract = this.warp.contract(contractTxId);
	const didDoc = (await contract.readState()).cachedValue.state;
	return didDoc;
}

export async function generateVerificationMethods({ did, publicKeys }) {
	const verificationMethods = [];

	for (let i = 0; i < publicKeys.length; i++) {
		const key = publicKeys[i];
		const id = `${did}#key-${i}`;

		const method = isRSAKey(key)
			? generateRSAVerificationMethod({ did, id, key })
			: generateEd25519VerificationMethod({ did, id, key });
		verificationMethods.push(method);
	}

	return verificationMethods;
}

function generateRSAVerificationMethod({
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
			n: key.n,
			kid: key?.kid || id
		}
	};
}

export function generateEd25519VerificationMethod({
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

// async function generateEd25519MultibaseVerificationMethod({
// 	did,
// 	id,
// 	key
// }: {
// 	did: string;
// 	id: string;
// 	key: Uint8Array;
// }) {
// 	return {
// 		id,
// 		type: 'Ed25519VerificationKey2020',
// 		controller: did,
// 		publicKeyMultibase: multibase58btc.encode(key)
// 	};
// }

function isRSAKey(key: any): boolean {
	return key.kty === 'RSA';
}
