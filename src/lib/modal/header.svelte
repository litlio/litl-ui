<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	type propsT = {
		children: Snippet | undefined;
	};

	let { children }: propsT = $props();

	const rootState = getContext<{
		sticky: boolean;
	}>('modal');

	let headerClass = $derived.by(() => {
		if (rootState.sticky) {
			return `absolute inset-x-0 top-0 w-full px-[24px] py-[20px] bg-neutral-50 dark:bg-neutral-950 
			rounded-t-[12px] border-b border-neutral-200 dark:border-neutral-700 drop-shadow-sm`;
		} else {
			return 'mb-6';
		}
	});
</script>

{#if children}
	<header aria-labelledby="modal-title" class={headerClass}>
		{@render children()}
	</header>
{/if}