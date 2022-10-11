<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResolveDID from './ResolveDID.svelte';
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

		arweave
			.arql({
				op: 'and',
				expr1: {
					op: 'equals',
					expr1: 'App-Name',
					expr2: 'SmartWeaveContract'
				},
				expr2: {
					op: 'equals',
					expr1: 'Uploader-Contract-Owner',
					expr2: ownerAddress
				},
				expr3: {
					op: 'equals',
					expr1: 'Content-Type',
					expr2: 'application/json'
				},
				expr4: {
					op: 'equals',
					expr1: 'DID-AR',
					expr2: 'true'
				}
			})
			.then(async (txIds) => {
				console.log('txIds', txIds);
				// given a tx id, get the tags for the tx
				// make a query that looks up this txId
				// get the contract id from the tags
				const query = `query {
								transactions(ids: ["${txIds.join('","')}"]) {
									edges {
										node {
											block {
												timestamp
											}
											tags {
												name
												value
											}
										}
									}
								}
							}`;

				const res = await arweave.api.post(
					'graphql',
					{ query },
					{ headers: { 'content-type': 'application/json' } }
				);

				// for each of the edges, get the values of the array element with the name 'Contract' and return block timestamp toLocaleString
				allContracts = res.data.data.transactions.edges.map(
					(edge: { node: { tags: any[]; block: { timestamp: number } } }) => {
						const contractId = edge.node.tags.find((tag) => tag.name === 'Uploader-Tx-Id').value;
						return {
							id: contractId,
							timestamp: new Date(edge.node?.block?.timestamp * 1000).toLocaleString() || null
						};
					}
				);

				dispatch('searchComplete', allContracts);
			});
	});
</script>

{#if allContracts}
	{#each allContracts as contract}
		<!-- && contract?.verificationMethod?.length -->
		{#if makeDid && contract.id}
			<ResolveDID did={makeDid(contract.id)}>
				{makeDid(contract.id)}
				<div slot="timestamp">{new Date(contract.timestamp * 1000).toLocaleString()}</div>
			</ResolveDID>
		{/if}
	{/each}
{/if}
