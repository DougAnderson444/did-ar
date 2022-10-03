import { describe, it, assert, expect, test, beforeAll, afterAll } from 'vitest';
import { WarpFactory, Contract } from 'warp-contracts';
import ArLocal from 'arlocal';

import { createDidAr } from '$lib/index';
import initialDidDoc from '$lib/contract/initial-state.json';

import contractSrc from '$lib/contract/example-contract.js?raw';
import initialState from '$lib/contract/example-contract-state.json';

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
			RSAPublicKey,
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
	});
});
