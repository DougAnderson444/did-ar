import { init } from './';

import * as arGQL from 'ar-gql';
const AR_DAG = 'ArDag';
const backupEndpoint = 'https://arweave-search.goldsky.com/graphql';

export async function generateTestDid(params: type) {
	const Ed25519PublicKey = new Uint8Array([
		215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218,
		166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26
	]);

	const didar = await init({ local: true }); // if no wallet set, will use_wallet
	const { jwk, address } = await didar.warp.testing.generateWallet();

	didar.wallet = jwk; // override 'use_wallet' and set to funded wallet for testing

	const did = await didar.create({
		RSAPublicKey: wallet,
		Ed25519PublicKey
	});
	return { did, wallet, address, Ed25519PublicKey };
}

export async function getOwnerDidArs({ arweave, dagOwner }) {
	// construct endpoint from arweave api config
	const { host, port, protocol } = arweave.api.config;
	const endpoint = `${protocol}://${host}:${port}/graphql`;

	// set arGQL endpoint
	arGQL.setEndpointUrl(endpoint);

	const query = `query($cursor: String) {
    transactions(
    tags: [
		{ name: "DID-AR", values: ["true"] },
		{ name: "App-Name", values: ["SmartWeaveContract"] },
		{ name: "Uploader-Contract-Owner", values: ["${dagOwner}"] },
	]
    after: $cursor
    first: 100
  ) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
			block {
				timestamp
			}
			tags {
				name
				value
			}
		}
    }
  }
}`;

	try {
		const txs = await arGQL.all(query);

		// for each txs, return an array of only tx?.data?.transactions.edges[0]?.node?.id
		return txs.map((tx) => tx.node);
	} catch (error) {
		console.log('ArGQL failed', error);

		//try backup
		arGQL.setEndpointUrl(backupEndpoint);
	}

	try {
		const txs = await arGQL.all(query);
		return txs.map((tx) => tx.node);
	} catch (error) {
		console.log('ArGQL failed, both gateways down', error);
	}
}
