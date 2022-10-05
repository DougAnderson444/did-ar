<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResolveDID from './ResolveDID.svelte';
	import type { ArdbTransaction } from 'ardb/lib/types';

	const dispatch = createEventDispatcher();

	let allContracts: ArdbTransaction[];
	let makeDid: Function | null;
	let local;

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		local = urlParams.get('local') === 'true';

		// import setUpWarp
		const { setUpWarp } = await import('./didar');

		// call setUpWarp
		const warp = await setUpWarp({ local });
		makeDid = (contractTxId: string) =>
			warp.environment == 'mainnet' ? `did:ar:${contractTxId}` : `did:arlocal:${contractTxId}`;

		// import ardb
		let ArDB = await import('ardb');
		if (ArDB?.default) ArDB = ArDB.default;
		if (ArDB?.default) ArDB = ArDB.default;

		// instantiate ardb
		const ardb = new ArDB(warp.arweave);

		// get arweave wallet address
		const walletAddress = await warp.arweave.wallets.getAddress();
		console.log('walletAddress', walletAddress);
		// get all contracts owned by the wallet address
		allContracts = await ardb
			.search('transactions')
			.appName('SmartWeaveContract')
			.from([walletAddress])
			.findAll();

		// log transactions
		console.log({ allContracts });
		dispatch('searchComplete', allContracts);
	});
</script>

{#if allContracts}
	{#each allContracts as contract}
		<!-- && contract?.verificationMethod?.length -->
		{#if makeDid && contract.id}
			<ResolveDID did={makeDid(contract.id)}>
				{makeDid(contract.id)}
				<div slot="timestamp">{new Date(contract.block.timestamp).toLocaleString()}</div>
			</ResolveDID>
		{/if}
	{/each}
{/if}
