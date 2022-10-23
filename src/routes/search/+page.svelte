<script>
	// @ts-nocheck

	/**
	 * Resolve the DID document for the given undername record in ARNS
	 */
	import { onMount } from 'svelte';
	import Spinner from '$lib/Spinner.svelte';
	import ResolveDID from '$lib/ResolveDID.svelte';

	import { arns, arnsResolver } from '@peerpiper/did-ar';

	// let arnsResolver;
	let arnsName;
	let did;
	const CacheOptions = { inMemory: true };

	onMount(async () => {
		// ({ arnsResolver } = await import('@peerpiper/did-ar')); // gives me warp issues
		// get params from location path
		const queryString = window.location.search;
		const params = new URLSearchParams(queryString);

		// split pathname and get the last part
		arnsName = params.get('name');

		console.log({ arnsName });
	});

	$: if (arnsResolver && arnsName) resolve(arnsName);

	async function resolve(arnsName) {
		let arnsInstance = await arns.init({ CacheOptions: { inMemory: true } });
		const antContractId = await arnsInstance.resolveARNS(arnsName);
		did = await arnsInstance.resolveANT(antContractId);
	}
</script>

{#if did}
	<ResolveDID {did}>{did}</ResolveDID>
{:else}
	<Spinner>Loading DID Doc...</Spinner>
{/if}
