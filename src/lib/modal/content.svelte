<script lang="ts">
	import { clickOutside } from '../utils/event.js';
	import { getContext, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type propsT = {
		class?: string;
		children: Snippet;
	};
	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		getIsMobile: () => boolean;
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
	}>('modal');
</script>

{#snippet mobileSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly|local={{ y: '100vh', duration: 500, opacity: 1 }}
			out:fly|local={{ y: '100vh', duration: 500, opacity: 1 }}
			role="dialog"
			class="fixed bottom-0 left-0 w-full rounded-t-[15px] bg-neutral-50 dark:bg-neutral-900 lg:bg-transparent z-[1001]"
		>
			<div
				use:clickOutside={() => {
					rootState.setIsActive(false);
				}}
				class="w-full max-h-[80vh] rounded-t-[15px] rounded-[15px] bg-neutral-50 dark:bg-neutral-900
				border-t border-neutral-200 dark:border-neutral-800"
			>
				{@render children()}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet desktopSnip()}
	{#if rootState.getIsActive()}
		<div
			in:fly|local={{ y: '-10vh', duration: 500, opacity: 0 }}
			out:fly|local={{ y: '-10vh', duration: 500, opacity: 0 }}
			use:clickOutside={() => {
				rootState.setIsActive(false);
			}}
			role="dialog" 
			class="relative w-[540px] max-h-[626px] rounded-[12px] bg-white dark:bg-neutral-900 border
                border-neutral-200 dark:border-neutral-800 {klass}"
		>
			
				{@render children()}
		</div>
	{/if}
{/snippet}

{#if rootState.getIsMobile()}
	{@render mobileSnip()}
{:else}
	{@render desktopSnip()}
{/if}