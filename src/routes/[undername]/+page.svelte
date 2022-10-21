<script>
	// @ts-nocheck

	/**
	 * Resolve the DID document for the given undername record in ARNS
	 */
	import { onMount } from 'svelte';
	import Spinner from '$lib/Spinner.svelte';
	import { arnsResolver } from '@peerpiper/did-ar';

	// let arnsResolver;
	let directDidDoc;
	const CacheOptions = { inMemory: true };

	onMount(async () => {
		// ({ arnsResolver } = await import('@peerpiper/did-ar'));
	});

	$: if (arnsResolver && arnsName) resolve(arnsName);

	async function resolve(arnsName) {
		directDidDoc = await arnsResolver(arnsName, { CacheOptions });
	}

	/** @type {import('./$types').PageData} */
	export let data;

	// http://localhost:5173/did-ar/did-ar_douganderson444.arweave.dev
	let arnsName = data.params.undername;
</script>

{#if directDidDoc}
	{JSON.stringify(directDidDoc, null, 2)}
{:else}
	<Spinner>Loading DID Doc...</Spinner>
{/if}
