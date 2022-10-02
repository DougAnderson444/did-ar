<script lang='ts'>
	import { onMount } from 'svelte';
	import { DIDAr } from './didar';
	import { DIDArConfig } from './DIDArConfig';

	export let config = {dev: true} 
	export let didar: DIDAr

	onMount(async () => {
		didar = new DIDAr(config);
		// await didar.init();
	});

	async function handleCreateDID(){
		// await didar.create()
	}
</script>

<div class='bg-blue-600 hover:bg-blue-500 shadow rounded-lg m-4 p-4 w-fit text-white cursor-pointer'
on:click={handleCreateDID}
>
Create Identity
</div>

<style lang="postcss"></style>
