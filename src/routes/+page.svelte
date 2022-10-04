<script lang="ts">
	import { DIDAr } from '@peerpiper/did-ar';
	import { Web3WalletMenu } from '@peerpiper/web3-wallet-connector';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';

	let wallet: handlers;
	let RSAPublicKey: { kty: string; n: string; e: string; kid?: string };
	let Ed25519PublicKey: Uint8Array;

	const walletReady = async (e: CustomEvent) => {
		wallet = e.detail.wallet;
		RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey();
		Ed25519PublicKey = await wallet.proxcryptor.getPublicKey();
	};
</script>

<Web3WalletMenu on:walletReady={walletReady} />

{#if wallet && RSAPublicKey && Ed25519PublicKey}
	<DIDAr {wallet} {RSAPublicKey} {Ed25519PublicKey} />
{/if}
