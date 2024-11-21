<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { createCollapseState } from './root.svelte.js';

	type propsT = {
		children: Snippet | undefined;
	};
	let { children }: propsT = $props();

	const collapseState = createCollapseState({ item: '' });

	setContext('collapse', collapseState);
</script>

<div
	class="w-full *:border-t *:border-neutral-200 *:dark:border-neutral-800
 last:border-b last:border-neutral-200 last:dark:border-neutral-800"
>
	{#if children}
		{@render children()}
	{/if}
</div>