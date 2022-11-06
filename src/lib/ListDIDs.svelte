<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResolveDID from './ResolveDID.svelte';
	import { getOwnerDidArs } from './utils.ts';

	// import Arweave from 'arweave';

	export let ownerAddress: string;
	export let local: boolean = false;

	const dispatch = createEventDispatcher();

	let allContracts: any[];
	let makeDid: Function | null;

	onMount(async () => {
		console.log('Looking for DID contracts...', new Date().toLocaleTimeString());
		makeDid = (contractTxId: string) =>
			local ? `did:arlocal:${contractTxId}` : `did:ar:${contractTxId}`;

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

		let txs = null;
		try {
			txs = await getOwnerDidArs({ arweave, dagOwner: ownerAddress });
		} catch (error) {
			console.log('DIDAr get failed', error);
		}

		console.log('txs', txs);

		if (!txs || !txs.length) return;

		// for each of the edges, get the values of the array element with the name 'Contract' and return block timestamp toLocaleString
		allContracts = txs.map((node: { tags: any[]; block: { timestamp: number } }) => {
			const contractId = node.tags.find((tag) => tag.name === 'Uploader-Tx-Id').value;
			const timestamp = node?.block?.timestamp * 1000;
			return {
				id: contractId,
				timestamp
			};
		});

		dispatch('searchComplete', allContracts);
	});
</script>

{#if allContracts}
	{#each allContracts as contract}
		<!-- && contract?.verificationMethod?.length -->
		{#if makeDid && contract.id}
			<ResolveDID did={makeDid(contract.id)}
				>{makeDid(contract.id)}
				<div slot="timestamp">{new Date(contract.timestamp).toLocaleString()}</div>
			</ResolveDID>
		{/if}
	{/each}
{/if}
