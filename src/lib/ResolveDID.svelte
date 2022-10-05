<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Resolver } from 'did-resolver';
	import { didArResolver } from '.';
	import JsonTree from 'svelte-json-tree';

	export let did;

	let resolver;
	let didDocument;

	onMount(async () => {
		const arResolver = didArResolver.getResolver();
		resolver = new Resolver(arResolver);
	});

	$: if (resolver && did) resolve();

	async function resolve() {
		console.log('resolving ', did);
		didDocument = (await resolver.resolve(did)).didDocument;
		return didDocument;
	}
</script>

{#if didDocument && didDocument?.verificationMethod?.length}
	<div class="m-4 p-4 border rounded-xl shadow-lg font-semibold">
		<div class="flex flex-row m-4 p-4 bg-[#42b983] text-white font-normal rounded-lg">
			<div class="flex-1 pr-4">
				<slot name="id" />
			</div>
			<div class="flex-0 pr-4">
				<slot name="timestamp" />
			</div>
		</div>
		<JsonTree
			value={didDocument}
			defaultExpandedLevel={1}
			--json-tree-font-size=".8em"
			--json-tree-string-color="#42b983"
			--json-tree-label-color="#cfcfcf"
		/>
	</div>
{/if}
