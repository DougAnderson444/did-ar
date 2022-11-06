<script lang="ts">
	import { onMount } from 'svelte';
	import { DIDArComponent } from '@peerpiper/did-ar';
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
		srcTx = localStorage.getItem('srcTx'); // || 'SoPGF6d-5oLy6-uKpJD2J2tT0ytM9LsXWbP5YQnVT6Q'; // https://sonar.warp.cc/#/app/source/0BkUeNAfOF6NzYmVJ__4eDdeKoFshJ5BzxOxOitJmXk#code
		ready = true;
	});

	$: if (srcTx) {
		// svae to localstorage
		localStorage.setItem('srcTx', srcTx);
		console.log({ srcTx });
	}
</script>

<Web3WalletMenu on:walletReady={walletReady} />

<div class="flex flex-col items-center m-2 p-2">
	{#if ready}
		<DIDArComponent {wallet} {RSAPublicKey} {Ed25519PublicKey} bind:srcTx />
	{/if}
</div>
