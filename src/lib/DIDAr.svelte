<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';

	import ListDiDs from './ListDIDs.svelte';

	export let RSAPublicKey: { kty: string; n: string; e: string; kid?: string };
	export let Ed25519PublicKey: Uint8Array;
	export let wallet: handlers;
	export let srcTx: string | null;

	let createDid: Function;
	let did: string;
	// fund arlocal for this RSA key address
	let walletAddress;
	let local: boolean = false;
	let existing: boolean = false;
	let complete: boolean = false;

	let handleCreateDID: () => Promise<void>;

	onMount(async () => {
		({ createDid } = await import('./didar'));

		// get location params, check to see if local is set to true
		const urlParams = new URLSearchParams(window.location.search);
		local = urlParams.get('local') === 'true';

		handleCreateDID = async function () {
			walletAddress = await wallet.arweaveWalletAPI.getActiveAddress();

			({ did, srcTx } = await createDid({
				RSAPublicKey,
				Ed25519PublicKey,
				options: { walletAddress, srcTx, local }
			}));
		};
	});

	async function searchComplete(e: CustomEvent) {
		console.log('searchComplete', e.detail);
		complete = true;
		existing = e.detail.length;
	}
</script>

{#if wallet}
	{#key wallet}
		{#key did}
			<ListDiDs on:searchComplete={searchComplete} />
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
