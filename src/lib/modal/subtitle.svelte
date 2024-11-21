<script lang="ts">
	import type { Snippet } from 'svelte';

	type propsT = {
		class?: string;
		children: Snippet | undefined;
	};

	let { class: klass = '', children }: propsT = $props();
</script>

{#if children}
	<p aria-labelledby="modal-subtitle" class="text-sm text-neutral-600 dark:text-neutral-400 leading-[24px] {klass}">
		{@render children()}
	</p>
{/if}