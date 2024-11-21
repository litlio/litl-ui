<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	type propsT = {
		class?: string;
		children: Snippet | undefined;
	};

	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		sticky: boolean;
	}>('modal');

	let footerClass = $derived.by(() => {
		if (rootState.sticky) {
			return ``;
		} else {
			return '';
		}
	});
</script>

{#if children}
	<footer
		aria-labelledby="modal-actions"
		class="sticky lg:absolute inset-x-0 bottom-0 p-4 box-border border-t border-neutral-200 dark:border-neutral-800 flex
	items-center justify-between bg-neutral-50 dark:bg-neutral-900 rounded-b-[12px] drop-shadow-sm {footerClass} {klass}"
	>
		{@render children()}
	</footer>
{/if}