import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { WarpFactory, Contract } from 'warp-contracts';
import ArLocal from 'arlocal';

import { createDidAr } from '$lib/index';

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

	beforeAll(async () => {
		// arlocal = new ArLocal(1810, false);
		// await arlocal.start();

		warp = WarpFactory.forLocal();
		({ jwk: wallet } = await warp.testing.generateWallet());

		let RSAPublicKey, Ed25519PublicKey;
		({ did, contractTxId } = await createDidAr({
			warp,
			wallet,
			RSAPublicKey: wallet,
			Ed25519PublicKey
		}));

		contract = warp.contract(contractTxId);

		contract.connect(wallet);
	});

	afterAll(async () => {
		// await arlocal.stop();
	});

	it('should properly deploy contract with initial state', async () => {
		expect((await contract.readState()).cachedValue.state.id).toEqual(did);

		// console.log((await contract.readState()).cachedValue.state);
		// verificationMethod should have 1 item
		expect((await contract.readState()).cachedValue.state.verificationMethod.length).toEqual(1);
		// verificationMethod should have id, type, controller, and publicKeyJwk types
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
});
