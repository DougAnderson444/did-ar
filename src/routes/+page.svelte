<script lang="ts">
	import { onMount } from 'svelte';
	import { DIDAr } from '@peerpiper/did-ar';
	import { Web3WalletMenu } from '@peerpiper/web3-wallet-connector';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';

	let wallet: handlers;
	let RSAPublicKey: { kty: string; n: string; e: string; kid?: string };
	let Ed25519PublicKey: Uint8Array;
	let srcTx: string | null;
	let ready: boolean;

	const walletReady = async (e: CustomEvent) => {
		wallet = e.detail.wallet;
		RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey();
		Ed25519PublicKey = await wallet.proxcryptor.getPublicKey();
	};

	onMount(async () => {
		// check if localStorage has  srcTx, else leave as null
		srcTx = localStorage.getItem('srcTx') || null;
		ready = true;
	});

	$: if (srcTx) {
		// svae to localstorage
		localStorage.setItem('srcTx', srcTx);
	}
</script>

<Web3WalletMenu on:walletReady={walletReady} />

<div class="m-4 p-4">
	{#if srcTx}
		Using existing contract <span class="font-mono bg-gray-50 m-2 p-2 rounded">{srcTx}</span>
	{:else}
		We will deploy a new Smart Contract to manage your DID.
	{/if}
</div>

{#if wallet && RSAPublicKey && Ed25519PublicKey && ready}
	<DIDAr {wallet} {RSAPublicKey} {Ed25519PublicKey} bind:srcTx />
{/if}
