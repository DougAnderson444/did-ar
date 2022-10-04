<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';

	export let RSAPublicKey: { kty: string; n: string; e: string; kid?: string };
	export let Ed25519PublicKey: Uint8Array;
	export let wallet: handlers;

	let createDid: Function;
	let did: string;
	// fund arlocal for this RSA key address
	let walletAddress;

	onMount(async () => {
		({ createDid } = await import('./didar'));
	});

	async function handleCreateDID() {
		walletAddress = await wallet.arweaveWalletAPI.getActiveAddress();

		did = await createDid({
			RSAPublicKey,
			Ed25519PublicKey,
			options: { walletAddress }
		});
	}
</script>

<div
	class="bg-blue-600 hover:bg-blue-500 shadow rounded-lg m-4 p-4 w-fit text-white cursor-pointer"
	on:click={handleCreateDID}
>
	Create Identity on {process.env.NODE_ENV}
</div>

{#if did}
	<div class="bg-green-600 hover:bg-green-500 shadow rounded-lg m-4 p-4 w-fit text-white">
		{did}
	</div>
{/if}
<!-- <style lang="postcss"></style> -->
