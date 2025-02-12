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
		getContentPosition: () => string; // строка "top:XXXpx; left:YYYpx;"
		getTransY: () => number;
		setIsActive: (val: boolean) => void;
	}>('menu');
</script>

{#if rootState.getIsActive()}
<div
    in:fly={{ y: rootState.getTransY() }}
    out:fly={{ y: rootState.getTransY() }}
    class="fixed z-[1099] {klass}"
    style={rootState.getContentPosition()}
>
    <div
        class="hide-scrollbar bg-white dark:bg-neutral-950 p-2 rounded-[12px]
               border border-neutral-200 dark:border-neutral-800 shadow-sm
               scroll-smooth overflow-y-auto max-h-[80vh] min-w-[120px]"
        style={`max-width: ${window.innerWidth - 16}px;`}
    >
        {@render children()}
    </div>
</div>
{/if}

