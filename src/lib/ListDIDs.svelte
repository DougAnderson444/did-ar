<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResolveDID from './ResolveDID.svelte';
	import type { ArdbTransaction } from 'ardb/lib/types';
	// import Arweave from 'arweave';
	// import ArDB from 'ardb';

	export let ownerAddress: string;
	export let local: boolean = false;

	const dispatch = createEventDispatcher();

	let allContracts: ArdbTransaction[];
	let makeDid: Function | null;

	onMount(async () => {
		makeDid = (contractTxId: string) =>
			local ? `did:arlocal:${contractTxId}` : `did:ar:${contractTxId}`;

		// import ardb
		let ArDB = await import('ardb');
		if (ArDB?.default) ArDB = ArDB.default;
		if (ArDB?.default) ArDB = ArDB.default;

		let Arweave = await import('arweave');
		if (Arweave?.default) Arweave = Arweave.default;
		if (Arweave?.default) Arweave = Arweave.default;

		let arweave = Arweave.init({
			host: 'arweave.net',
			port: 443,
			protocol: 'https',
			timeout: 20000,
			logging: false
		});

		// instantiate ardb
		const ardb = new ArDB(arweave);

		console.log('ownerAddress', ownerAddress);

		const searchTags = [
			{ name: 'App-Name', values: ['SmartWeaveAction'] },
			{ name: 'Sequencer-Owner', values: [ownerAddress] }
			// { name: 'Uploader-Contract-Owner', values: [ownerAddress] } // contract source uploader
		];

		// get all contracts owned by the wallet address
		try {
			allContracts = await ardb.search('transactions').tags(searchTags).findAll();

			// log transactions
			console.log({ allContracts });

			// go through all contracts and get the Tag named "Contract" and block timestamp
			allContracts = allContracts.map((tx) => {
				const contractTag = tx.tags.find((tag) => tag.name === 'Contract');
				if (contractTag) {
					return { id: contractTag.value, timestamp: tx.block.timestamp };
				}
			});

			dispatch('searchComplete', allContracts);
		} catch (error) {
			console.error(error);
		}
	});
</script>

{#if allContracts}
	{#each allContracts as contract}
		<!-- && contract?.verificationMethod?.length -->
		{#if makeDid && contract.id}
			<ResolveDID did={makeDid(contract.id)}>
				{makeDid(contract.id)}
				<div slot="timestamp">{new Date(contract.timestamp).toLocaleString()}</div>
			</ResolveDID>
		{/if}
	{/each}
{/if}
