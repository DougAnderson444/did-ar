import { init } from '$lib';

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
