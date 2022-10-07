import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { WarpFactory, Contract } from 'warp-contracts';
import ArLocal from 'arlocal';

import { init, createDid, create, update, didArResolver } from '$lib';

import { generateEd25519VerificationMethod } from '$lib/didar.ts';
import { Resolver } from 'did-resolver';

// import { base58btc as multibase58btc } from 'multiformats/bases/base58';
import {
	encodeURLSafe as base64URLfromBytes
	// decodeURLSafe as base64URLtoBytes
} from '@stablelib/base64';

describe('Testing did:ar:*', () => {
	let didar;
	let wallet;
	let address: string;

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

		Ed25519PublicKey = new Uint8Array([
			215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243,
			218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26
		]);
		Ed25519PublicKey2 = new Uint8Array([
			215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243,
			218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26
		]);

		didar = await init({ local: true }); // if no wallet set, will use_wallet
		({ jwk: wallet, address } = await didar.warp.testing.generateWallet());
		didar.wallet = wallet; // override 'use_wallet' and set to funded wallet for testing

		did = await didar.create({
			RSAPublicKey: wallet,
			Ed25519PublicKey
		});

		// TODO: didar.getDidDoc(did) should return the did doc
		didDoc = await didar.read(did);
		// contract = didar.warp.contract(contractTxId);
		// didDoc = (await contract.readState()).cachedValue.state;

		// should update too
		didDoc = {
			...didDoc,
			id: did,
			verificationMethod: [
				...didDoc.verificationMethod,
				generateEd25519VerificationMethod({
					did,
					id: `${did}#key-2`,
					key: Ed25519PublicKey2
				})
			],
			service: [
				...didDoc.service, // keep existing service listings
				{
					id: `${did}#linked-domain`,
					type: 'LinkedDomains',
					serviceEndpoint: 'https://douganderson444.arweave.dev'
				}
			]
		};

		await didar.update(didDoc);

		// try DID resolver too
		const arResolver = didArResolver.getResolver();
		resolver = new Resolver(arResolver);

		didDoc = await didar.read(did);
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
		expect(didDoc.verificationMethod[1].publicKeyJwk.x).toEqual(
			base64URLfromBytes(Ed25519PublicKey)
		);
		expect(didDoc.verificationMethod[1].publicKeyJwk.x).toEqual(
			'11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo='
		);
		// type should be Ed25519VerificationKey2020
		expect(didDoc.verificationMethod[1].type).toEqual('JsonWebKey2020');
		// id should be ${did}#key-1
		expect(didDoc.verificationMethod[1].id).toEqual(`${did}#key-1`);
		// controller should be ${did}
		expect(didDoc.verificationMethod[1].controller).toEqual(did);
	});

	it('should have a second verificationMethod with publicKey Ed25519PublicKey', async () => {
		expect(didDoc.verificationMethod[2].publicKeyJwk.kty).toEqual('OKP');
		expect(didDoc.verificationMethod[2].publicKeyJwk.crv).toEqual('Ed25519');
		expect(didDoc.verificationMethod[2].publicKeyJwk.x).toEqual(
			base64URLfromBytes(Ed25519PublicKey)
		);
		expect(didDoc.verificationMethod[2].publicKeyJwk.x).toEqual(
			'11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo='
		);
		// type should be Ed25519VerificationKey2020
		expect(didDoc.verificationMethod[2].type).toEqual('JsonWebKey2020');
		// id should be ${did}#key-2
		expect(didDoc.verificationMethod[2].id).toEqual(`${did}#key-2`);
		// controller should be ${did}
		expect(didDoc.verificationMethod[2].controller).toEqual(did);

		// should have a LinkedDomains service too
		expect(didDoc.service[0].id).toEqual(`${did}#linked-domain`);
		expect(didDoc.service[0].type).toEqual('LinkedDomains');
		expect(didDoc.service[0].serviceEndpoint).toEqual('https://douganderson444.arweave.dev');
	});

	it('should resolve via resolver', async () => {
		// expect resolver(did) to return didDoc
		expect((await resolver.resolve(did)).didDocument).toEqual(didDoc);
	});
});
