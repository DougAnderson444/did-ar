<script>
	// @ts-nocheck
	import { fade } from 'svelte/transition';

	export let value = null;

	let clip;
	let copied;
	let duration = 2000;

	async function copy() {
		var promise = navigator.clipboard.writeText(clip.innerHTML);
		await promise;
		value = promise;
		copied = true;
		setTimeout(() => (copied = false), 1);
	}
</script>

<!-- Clipboard  -->
<div class="Clipboard-Container" on:click={copy}>
	<div class="Clipboard" bind:this={clip}>
		<slot {copy} />
	</div>
	{#if copied}
		<div out:fade={{ duration }}>✔️Copied</div>
	{:else}
		<span class="text-xl" title="Copy to clipboard">📋</span>
		<!-- <div in:fade={{ duration: 0, delay: duration }}>
			<svg
				on:click={copy}
				class="octicon octicon-clippy"
				viewBox="0 0 14 16"
				version="1.1"
				width="14"
				height="16"
				aria-hidden="true"
				stroke="currentColor"
			>
				<title>Copy to clipboard</title>
				<path
					fill-rule="evenodd"
					d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
				/>
			</svg>
		</div> -->
	{/if}
</div>

<style>
	.Clipboard {
		margin: 0 0.5em;
		word-break: break-all;
	}
	.Clipboard-Container {
		display: flex;
	}
	.Clipboard-Container {
		cursor: pointer;
	}
</style>
