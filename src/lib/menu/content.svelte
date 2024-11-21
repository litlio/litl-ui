<script lang="ts">
	import Button from './button.svelte';
	import { getContext, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type propsT = {
		class?: string;
		children: Snippet;
	};
	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		alignment: 'left' | 'right';
		getIsMobile: () => boolean;
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
		getContentPosition: () => string;
		getTransY: () => number;
	}>('menu');

	let alightmentClass = $derived.by(() => {
		if (rootState.alignment === 'left') {
			return 'left-0';
		} else {
			return 'right-0';
		}
	});
</script>

{#snippet mobileSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly|local={{ y: '100vh', duration: 400, opacity: 1 }}
			out:fly|local={{ y: '100vh', duration: 400, opacity: 1 }}
			class="fixed bottom-0 left-0 w-full rounded-t-[15px] bg-neutral-200 dark:bg-neutral-200 lg:bg-transparent z-[1001]"
		>
			<div
				class="hide-scrollbar bg-neutral-100 dark:bg-neutral-800 px-3 rounded-t-[15px] border-t
				border-neutral-200 dark:border-neutral-200 scroll-smooth overflow-y-auto"
			>
				{@render children()}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet desktopSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly={{ y: rootState.getTransY() }}
			out:fly={{ y: rootState.getTransY() }}
			class="absolute {rootState.getContentPosition()} {alightmentClass} z-[1000] {klass}"
		>
			<div
				class="hide-scrollbar bg-white dark:bg-neutral-800 p-2 rounded-[12px] border border-neutral-200 dark:border-neutral-700 shadow-sm scroll-smooth overflow-y-auto {klass}"
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