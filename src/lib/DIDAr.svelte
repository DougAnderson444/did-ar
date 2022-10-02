<script>
	import { onMount } from 'svelte';
	import { DIDAr } from 'didar';
	import { DIDArConfig } from './DIDArConfig.js';

	export let config = DIDArConfig;
	export let didar = null;

	onMount(async () => {
		didar = new DIDAr(config);
		await didar.init();
	});
</script>

DIDAr.svelte

<style lang="postcss"></style>
