import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { WarpFactory, Contract } from 'warp-contracts';
import ArLocal from 'arlocal';

import { createDid, createDidAr, updateDidDoc, didArResolver } from '$lib';
import { Resolver } from 'did-resolver';

import { base58btc } from 'multiformats/bases/base58';
import { base64url } from 'multiformats/bases/base64';

describe('Testing did:ar:*', () => {
	let wallet;
	let walletAddress: string;

	let arweave: Arweave;
	let arlocal: ArLocal;
	let warp: Warp;
	let pst: PstContract;

	let contract: Contract;

	let did, contractTxId, didDoc;
	let Ed25519PublicKey, encoded;
	let Ed25519PublicKey2;
	let resolver;

	beforeAll(async () => {
		arlocal = new ArLocal();
		await arlocal.start();

		Ed25519PublicKey = new Uint8Array([0, 1, 2]);
		Ed25519PublicKey2 = new Uint8Array([3, 4, 5]);

		warp = WarpFactory.forLocal();
		({ jwk: wallet } = await warp.testing.generateWallet());

		({ did, contractTxId } = await createDidAr({
			warp,
			wallet,
			RSAPublicKey: wallet,
			Ed25519PublicKey
		}));

		contract = warp.contract(contractTxId);
		didDoc = (await contract.readState()).cachedValue.state;

		// shoudl update too
		didDoc = {
			...didDoc,
			verificationMethod: [
				...didDoc.verificationMethod,
				{
					id: `${did}#key-2`,
					type: 'Ed25519VerificationKey2018',
					controller: did,
					publicKeyBase58: base58btc.encode(Ed25519PublicKey2)
				}
			]
		};

		await updateDidDoc({ didDoc, options: { arweaveWallet: wallet } });

		// try DID resolver too
		const arResolver = didArResolver.getResolver();
		resolver = new Resolver(arResolver);

		didDoc = (await contract.readState()).cachedValue.state;
	});

	afterAll(async () => {
		await arlocal.stop();
	});

	it('should properly deploy contract with initial state', async () => {
		expect(didDoc.id).toEqual(did);
	});

	it('verificationMethod should have id, type, controller, and publicKeyJwk types', async () => {
		expect(didDoc.verificationMethod[0].id).toEqual(`${did}#key-0`);
		expect(didDoc.verificationMethod[0].type).toEqual('JsonWebKey2020');
		expect(didDoc.verificationMethod[0].controller).toEqual(did);
		expect(didDoc.verificationMethod[0].publicKeyJwk.kty).toEqual('RSA');
		expect(didDoc.verificationMethod[0].publicKeyJwk.e).toEqual('AQAB');
		expect(didDoc.verificationMethod[0].publicKeyJwk.n).toEqual(wallet.n);
	});

	it('should have a second verificationMethod with publicKey Ed25519PublicKey', async () => {
		expect(didDoc.verificationMethod[1].publicKeyJwk.kty).toEqual('OKP');
		expect(didDoc.verificationMethod[1].publicKeyJwk.crv).toEqual('Ed25519');
		expect(didDoc.verificationMethod[1].publicKeyJwk.x).toEqual(base64url.encode(Ed25519PublicKey));
		// type should be Ed25519VerificationKey2020
		expect(didDoc.verificationMethod[1].type).toEqual('JsonWebKey2020');
		// id should be ${did}#key-1
		expect(didDoc.verificationMethod[1].id).toEqual(`${did}#key-1`);
		// controller should be ${did}
		expect(didDoc.verificationMethod[1].controller).toEqual(did);
	});

	it('should resolve via resolver', async () => {
		// expect resolver(did) to return didDoc
		expect((await resolver.resolve(did)).didDocument).toEqual(didDoc);
	});
});
