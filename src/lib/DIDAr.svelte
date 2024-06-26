<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';
	import { init } from './didar';

	import ListDIDs from './ListDIDs.svelte';
	import Spinner from './Spinner.svelte';
	import type { DIDAr } from './didar';

	export let RSAPublicKey: { kty: string; n: string; e: string; kid?: string } | null;
	export let Ed25519PublicKey: Uint8Array | null;
	export let wallet: handlers;
	export let srcTx: string | null = 'SoPGF6d-5oLy6-uKpJD2J2tT0ytM9LsXWbP5YQnVT6Q'; // https://sonar.warp.cc/#/app/source/SoPGF6d-5oLy6-uKpJD2J2tT0ytM9LsXWbP5YQnVT6Q#code

	let didar: DIDAr;
	let did: string;
	let local: boolean = false;
	let existing: boolean = false;
	let creating: boolean = false;
	let ownerAddress: string;

	let handleCreateDID: () => Promise<void>;

	onMount(async () => {
		// get location params, check to see if local is set to true
		const urlParams = new URLSearchParams(window.location.search);
		local = urlParams.get('local') === 'true';

		// const { init } = await import('./didar.ts'); // need extension to vite build component only
		didar = await init({ local });

		if (local) {
			const { jwk, address } = await didar.warp.testing.generateWallet();
			didar.wallet = jwk; // override 'use_wallet' and set to funded wallet for testing
			ownerAddress = address;
			console.log('test address', address);
		}

		handleCreateDID = async function () {
			creating = true;

			if (!RSAPublicKey) RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey();
			if (!Ed25519PublicKey) Ed25519PublicKey = await wallet.proxcryptor.getPublicKey();

			did = await didar.create({
				RSAPublicKey,
				Ed25519PublicKey,
				srcTx
			});
			// refresh did variable every second until searchComplete is non null
			const interval = setInterval(async () => {
				ownerAddress = ownerAddress; // refresh ListDIDs
				if (existing) {
					clearInterval(interval);
					creating = false;
				}
			}, 400);
		};
	});

	$: if (wallet)
		(async () => {
			ownerAddress = await wallet.arweaveWalletAPI.getActiveAddress();
			if (!RSAPublicKey) RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey();
			if (!Ed25519PublicKey) Ed25519PublicKey = await wallet.proxcryptor.getPublicKey();
		})();

	async function searchComplete(e: CustomEvent) {
		console.log('searchComplete', e.detail);
		existing = e.detail.length;
	}
</script>

{#if wallet && didar && ownerAddress}
	{#key wallet}
		{#key did}
			<ListDIDs {ownerAddress} on:searchComplete={searchComplete} />
		{/key}

		{#if !creating && !existing && handleCreateDID}
			<div class="m-4">
				{#if srcTx}
					Using existing contract
					<a
						href="https://sonar.warp.cc/#/app/source/{srcTx}#code"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="font-mono m-2 p-2 rounded"> {srcTx}🔗↗️</span></a
					>
				{:else}
					We will deploy a new Smart Contract to manage your DID.
				{/if}
			</div>

			<div
				class="bg-blue-600 hover:bg-blue-500 shadow rounded-lg m-4 p-4 w-fit text-white cursor-pointer"
				on:click={handleCreateDID}
				on:keypress={handleCreateDID}
			>
				Create Decentralized Identity (DID) with Wallet Keys
			</div>
		{:else if creating}
			<Spinner>Creating DID...</Spinner>
		{/if}
	{/key}
{:else}
	Connect with Wallet to create a Decentralized Identity
{/if}

<style lang="postcss"></style>
