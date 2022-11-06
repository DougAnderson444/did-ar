<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Resolver } from 'did-resolver';
	import * as didArResolver from './resolver';
	import JsonTree from 'svelte-json-tree';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Clipboard from './Clipboard.svelte';

	export let did;

	let resolver;
	let didDocument;
	let isOpen = false;

	onMount(async () => {
		// const didArResolver = await import('./resolver');

		const arResolver = didArResolver.getResolver();
		resolver = new Resolver(arResolver);
	});

	$: if (resolver && did) resolve();

	async function resolve() {
		console.log('resolving ', did);
		didDocument = (await resolver.resolve(did)).didDocument;

		// if no Document after 5 secodns, try again for 2 minutes
		if (!didDocument) {
			setTimeout(() => {
				resolve();
			}, 5000);
		}

		return didDocument;
	}
</script>

<div class="m-4 p-4 border rounded-xl shadow-lg font-semibold">
	<div class="flex flex-row m-4 p-4 bg-[#42b983] text-white font-normal rounded-lg">
		<div class="flex-1 pr-4">
			<Clipboard><slot /></Clipboard>
		</div>
		<div class="flex-0 pr-4">
			<slot name="timestamp" />
		</div>
	</div>
	{#if didDocument && didDocument?.verificationMethod?.length}
		<details class="cursor-pointer overflow-hidden" bind:open={isOpen}>
			<summary
				>Full DID Document
				{#if !did.startsWith('did:arlocal')}
					<a
						class="text-blue-700"
						target="_blank"
						rel="noopener noreferrer"
						href="https://sonar.warp.cc/#/app/contract/{did.replace(/.*?:/g, '')}"
					>
						🔗 View Blockchain Explorer</a
					>
				{/if}
			</summary>
			{#if isOpen}
				<div
					transition:fly={{
						delay: 0,
						duration: 300,
						x: 0,
						y: -100,
						opacity: 0.25,
						easing: quintOut
					}}
				>
					<JsonTree
						value={didDocument}
						defaultExpandedLevel={1}
						--json-tree-font-size=".8em"
						--json-tree-string-color="#42b983"
						--json-tree-label-color="#cfcfcf"
					/>
				</div>
			{/if}
		</details>
	{/if}
</div>

<style lang="postcss"></style>
