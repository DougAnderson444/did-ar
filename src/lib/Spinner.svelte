<div class="flex flex-row items-center">
	<div class="spinner select-none" />
	<div class="flex-1">
		<slot />
	</div>
</div>

<style>
	.flex-row {
		flex-direction: row;
	}
	.flex {
		display: flex;
	}
	.flex-1 {
		flex: 1 1 0%;
	}
	.items-center {
		align-items: center;
	}
	.select-none {
		user-select: none;
	}
	.spinner {
		aspect-ratio: 1;
		height: 1em;
		width: 1em;
		border: 0.3em dotted rgba(250, 204, 21);
		border-radius: 9999px;
		animation: spin 1s linear infinite;
		background: #fcff23;
		margin: 0.25em;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
