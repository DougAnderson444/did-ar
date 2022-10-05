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
</script>

{#key wallet}
	{#key did}
		<ListDiDs />
	{/key}

	{#if handleCreateDID}
		<div
			class="bg-blue-600 hover:bg-blue-500 shadow rounded-lg m-4 p-4 w-fit text-white cursor-pointer"
			on:click={handleCreateDID}
		>
			Use wallet keys to Create new DID Identity, deployed on {local
				? 'local'
				: process.env.NODE_ENV}
		</div>
	{/if}
{/key}

<!-- <style lang="postcss"></style> -->
