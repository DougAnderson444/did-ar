import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { WarpFactory, Contract } from 'warp-contracts';
import ArLocal from 'arlocal';

import { createDidAr } from '$lib/index';
import { base58btc } from 'multiformats/bases/base58';

interface ExampleContractState {
	counter: number;
}

describe('Testing did:ar:*', () => {
	let wallet;
	let walletAddress: string;

	let arweave: Arweave;
	let arlocal: ArLocal;
	let warp: Warp;
	let pst: PstContract;

	let contract: Contract;

	let did, contractTxId;
	let Ed25519PublicKey, encoded;

	beforeAll(async () => {
		// arlocal = new ArLocal(1810, false);
		// await arlocal.start();

		Ed25519PublicKey = new Uint8Array([0, 1, 2]);
		encoded = base58btc.encode(Ed25519PublicKey);

		warp = WarpFactory.forLocal();
		({ jwk: wallet } = await warp.testing.generateWallet());

		({ did, contractTxId } = await createDidAr({
			warp,
			wallet,
			RSAPublicKey: wallet,
			Ed25519PublicKey
		}));

		contract = warp.contract(contractTxId);
	});

	afterAll(async () => {
		// await arlocal.stop();
	});

	it('should properly deploy contract with initial state', async () => {
		expect((await contract.readState()).cachedValue.state.id).toEqual(did);
		expect(encoded).toEqual('z15T');
	});

	it('verificationMethod should have id, type, controller, and publicKeyJwk types', async () => {
		expect((await contract.readState()).cachedValue.state.verificationMethod[0].id).toEqual(
			`${did}#key-0`
		);
		expect((await contract.readState()).cachedValue.state.verificationMethod[0].type).toEqual(
			'JsonWebKey2020'
		);
		expect((await contract.readState()).cachedValue.state.verificationMethod[0].controller).toEqual(
			did
		);
		expect(
			(await contract.readState()).cachedValue.state.verificationMethod[0].publicKeyJwk.kty
		).toEqual('RSA');
		expect(
			(await contract.readState()).cachedValue.state.verificationMethod[0].publicKeyJwk.e
		).toEqual('AQAB');
		expect(
			(await contract.readState()).cachedValue.state.verificationMethod[0].publicKeyJwk.n
		).toEqual(wallet.n);
	});

	it('should have a second verificationMethod with publicKeyMultibase matching base58btc.baseEncode(Ed25519PublicKey)', async () => {
		expect(
			(await contract.readState()).cachedValue.state.verificationMethod[1].publicKeyMultibase
		).toEqual('z15T');
		// type should be Ed25519VerificationKey2020
		expect((await contract.readState()).cachedValue.state.verificationMethod[1].type).toEqual(
			'Ed25519VerificationKey2020'
		);
		// id should be ${did}#key-1
		expect((await contract.readState()).cachedValue.state.verificationMethod[1].id).toEqual(
			`${did}#key-1`
		);
		// controller should be ${did}
		expect((await contract.readState()).cachedValue.state.verificationMethod[1].controller).toEqual(
			did
		);
	});
});
