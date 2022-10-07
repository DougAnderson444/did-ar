<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';

	import ListDiDs from './ListDIDs.svelte';

	export let RSAPublicKey: { kty: string; n: string; e: string; kid?: string };
	export let Ed25519PublicKey: Uint8Array;
	export let wallet: handlers;
	export let srcTx: string | null;

	let didar: DIDAr;
	let did: string;
	let local: boolean = false;
	let existing: boolean = false;
	let complete: boolean = false;
	let ownerAddress: string;

	let handleCreateDID: () => Promise<void>;

	onMount(async () => {
		// get location params, check to see if local is set to true
		const urlParams = new URLSearchParams(window.location.search);
		local = urlParams.get('local') === 'true';

		const { init } = await import('./didar');
		didar = await init({ local });

		if (local) {
			const { jwk, address } = await didar.warp.testing.generateWallet();
			didar.wallet = jwk; // override 'use_wallet' and set to funded wallet for testing
			ownerAddress = address;
			console.log('test address', address);
		}

		handleCreateDID = async function () {
			did = await didar.create({
				RSAPublicKey,
				Ed25519PublicKey
			});
		};
	});

	$: if (wallet) (async () => (ownerAddress = await wallet.arweaveWalletAPI.getActiveAddress()))();

	async function searchComplete(e: CustomEvent) {
		console.log('searchComplete', e.detail);
		complete = true;
		existing = e.detail.length;
	}
</script>

{#if wallet && didar && ownerAddress}
	{#key wallet}
		{#key did}
			<ListDiDs {ownerAddress} on:searchComplete={searchComplete} />
		{/key}

		{#if complete && !existing && handleCreateDID}
			<div class="m-4 p-4">
				{#if srcTx}
					Using existing contract <span class="font-mono bg-gray-50 m-2 p-2 rounded">{srcTx}</span>
				{:else}
					We will deploy a new Smart Contract to manage your DID.
				{/if}
			</div>

			<div
				class="bg-blue-600 hover:bg-blue-500 shadow rounded-lg m-4 p-4 w-fit text-white cursor-pointer"
				on:click={handleCreateDID}
			>
				Use wallet keys to Create new Decentralized Identity, deployed on {local
					? 'local'
					: process.env.NODE_ENV}
			</div>
		{/if}
	{/key}
{:else}
	Connect with Wallet to create a Decentralized Identity
{/if}

<!-- <style lang="postcss"></style> -->
