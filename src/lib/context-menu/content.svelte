<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type propsT = {
		class?: string;
		children: Snippet;
	};
	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		getIsActive: () => boolean;
		getContentPosition: () => { x: number; y: number };
	}>('contextMenu');

	let style = $derived.by(() => {
		const { x, y } = rootState.getContentPosition();
		return `position: fixed; top: ${y}px; left: ${x}px;`;
	});
</script>

{#if rootState.getIsActive()}
	<div
		in:fly={{ y: 5, duration: 150 }}
		out:fly={{ y: 5, duration: 150 }}
		style={style}
		class="z-[1000] {klass}"
	>
		<div class="bg-white dark:bg-neutral-800 p-2 rounded-md shadow-lg {klass}">
			{@render children()}
		</div>
	</div>
{/if}
