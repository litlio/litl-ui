<script lang="ts">
	import Button from '../button/button.svelte';
	import { getContext, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type propsT = {
		class?: string;
		children: Snippet;
	};
	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		size: 'tiny' | 'small' | 'medium' | 'large';
		getIsMobile: () => boolean;
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
		getContentPosition: () => string;
		getTransY: () => number;
	}>('select');
</script>

{#snippet mobileSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly|local={{ y: '100vh', duration: 500, opacity: 1 }}
			out:fly|local={{ y: '100vh', duration: 500, opacity: 1 }}
			class="fixed bottom-0 left-0 w-full rounded-t-[15px] bg-white dark:bg-neutral-800 lg:bg-transparent z-[1001]"
		>
			<div
				class="hide-scrollbar bg-white dark:bg-neutral-800 px-3 py-3 rounded-t-[15px] border-y 
				border-neutral-200 dark:border-neutral-700 scroll-smooth overflow-y-auto"
			>
				{@render children()}
			</div>
			<footer class="p-4">
				<Button
					onclick={() => {
						rootState.setIsActive(false);
					}}
					type="secondary"
					class="w-full">done</Button
				>
			</footer>
		</div>
	{/if}
{/snippet}

{#snippet desktopSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly={{ y: rootState.getTransY() }}
			out:fly={{ y: rootState.getTransY() }}
			class="absolute w-full {rootState.getContentPosition()} z-[1000] {klass}"
		>
			<div
				class="hide-scrollbar bg-white dark:bg-neutral-800 p-1 rounded-[6px] border border-neutral-200 dark:border-neutral-700 shadow-sm scroll-smooth overflow-y-auto {klass}"
			>
				{@render children()}
			</div>
		</div>
	{/if}
{/snippet}

{#if rootState.getIsMobile()}
	{@render mobileSnip()}
{:else}
	{@render desktopSnip()}
{/if}