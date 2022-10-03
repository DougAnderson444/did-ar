// import * as WarpSdk from 'warp-contracts';
import type { JWKInterface } from 'arweave/node/lib/wallet';

import initialState from './contract/initial-state.json';
import contractSrc from './contract/contractSrc.js?raw';

export async function createDidAr({ warp, wallet, RSAPublicKey, Ed25519PublicKey }) {
	let contract;

	// save the DID Doc CRUD program to Arweave as a smart contract
	// get srcTxId
	const { srcTxId } = await warp.createContract.deploy({
		wallet,
		initState: JSON.stringify(initialState),
		src: contractSrc
	});

	const { contractTxId } = await warp.createContract.deployFromSourceTx({
		wallet,
		initState: JSON.stringify(initialState),
		srcTxId
	});

	// use warp-contract to update the contract state
	contract = warp.contract(contractTxId);
	contract.connect(wallet);

	await contract.writeInteraction({ function: 'create', id: contractTxId });

	return { did: `did:ar:${contractTxId}`, contractTxId };
}

// export const DIDArFactory = {
// 	warp: WarpSdk.Warp,
// 	wallet: JWKInterface,

// 	constructor(config = { dev: true, wallet: null }) {
// 		// default config is mainnet
// 		if (!config?.wallet || dev) {
// 			// no wallet provided, use local
// 			this.warp = WarpSdk.WarpFactory.forLocal();
// 			const { jwk, address } = await this.warp.testing.generateWallet();
// 			this.wallet = jwk;
// 			this.address = address;
// 		} else {
// 			this.wallet = config.wallet;
// 		}
// 	}

// 	async deploy() {
// 		const { contractTxId, srcTxId } = await this.warp.createContract.deploy({
// 			wallet: this.wallet,
// 			initState: {}, // no state needed, we're just saving the source code
// 			data: {},
// 			src: contractSrc,
// 			tags
// 		});
//         return srcTxId;
// 	}

// 	async create(srcTx) {
// 		// deploy the DID contract,
// 		// then use it to set the initial state to DID Doc
// 		// with RSA and Ed25519 keys set
// 		let initState = makeDIDDoc({ RSAPublicKey, Ed25519PublicKey });

// 		// Subsequent users can use the srcTxId and save a step
// 		if (srcTx) {
// 			const { contractTxId } = await this.warp.createContract.deployFromSourceTx({
// 				wallet: this.wallet,
// 				initState: initialState,
// 				srcTxId: srcTx
// 			});
// 		}
// 	}
// }
