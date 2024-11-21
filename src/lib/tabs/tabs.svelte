<script lang="ts">
	import Tooltip from '../tooltip/tooltip.svelte';
	import type { Component } from 'svelte';

	type propsT = {
		disabled?: boolean | undefined;
		selected?: string | undefined;
		tabs?:
			| Array<{
					title: string;
					value: string;
					icon?: Component;
					disabled?: boolean;
					tooltip?: string;
			  }>
			| undefined;
		type?: 'default' | 'secondary';
	};
	let {
		disabled = false,
		selected = $bindable(''),
		tabs = undefined,
		type = 'default'
	}: propsT = $props();

	const isSelected = (value: string) => {
		if (value === selected) {
			return true;
		}
		return false;
	};

	const tabButtonFunc = (
		isActive: boolean,
		isDisabled: boolean,
		isDisabledSpecific: boolean | undefined
	): string => {
		if (type === 'secondary') {
			// if the tab is disabled does not matter if active or not
			if (isDisabled || isDisabledSpecific) {
				return `cursor-not-allowed px-1.5 py-1 text-neutral-950 dark:text-white rounded-md bg-neutral-300 
            dark:bg-neutral-900`;
			}

			if (isActive) {
				return `px-1.5 py-1 text-white dark:text-white rounded-md bg-neutral-900
                dark:bg-neutral-700`;
			}
			return `px-1.5 py-1 text-neutral-950 dark:text-white rounded-md bg-neutral-300 
            dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800`;
		}

		if (type === 'default') {
			if (isActive) {
				if (isDisabled || isDisabledSpecific) {
					return `cursor-not-allowed px-[2px] py-3 border-b-2 border-neutral-950 dark:border-neutral-50
                text-neutral-900 dark:text-neutral-50`;
				}
				return `px-[2px] py-3 border-b-2 border-neutral-950 dark:border-neutral-50
                text-neutral-950 dark:text-neutral-50`;
			}

			if (isDisabled || isDisabledSpecific) {
				return `cursor-not-allowed px-[2px] py-3 border-b-2 border-transparent text-neutral-900 
                dark:text-neutral-500`;
			}
			return `px-[2px] py-3 border-b-2 border-transparent text-neutral-900 dark:text-neutral-500 
            hover:text-neutral-950 dark:hover:text-neutral-50`;
		}

		return '';
	};

	let contClass = $derived.by(() => {
		if (type === 'secondary') {
			return 'gap-3';
		}
		return 'gap-6 border-b border-neutral-200 dark:border-neutral-800';
	});
</script>

{#snippet tabButton(
	isActive: boolean,
	tab: {
		title: string;
		value: string;
		icon?: Component;
		disabled?: boolean;
		tooltip?: string;
	}
)}
	<button
		disabled={disabled || tab.disabled}
		onclick={() => (selected = tab.value)}
		class="flex items-center justify-center gap-x-[6px] transition-all text-xs {tabButtonFunc(
			isActive,
			disabled,
			tab.disabled
		)} "
	>
		{#if tab.icon}
			{@const Icon = tab.icon}
			<div class="w-[16px] h-[16px] flex items-center justify-center">
				<div class="w-[16px] h-[16px]">
					<Icon />
				</div>
			</div>
		{/if}
		{tab.title}
	</button>
{/snippet}

<div class="w-full flex items-center {contClass}">
	{#if tabs}
		{#each tabs as tab}
			<div class="mb-[-1px]">
				{#if tab.disabled}
					<Tooltip text={tab.tooltip}>
						{@render tabButton(isSelected(tab.value), tab)}
					</Tooltip>
				{:else}
					{@render tabButton(isSelected(tab.value), tab)}
				{/if}
			</div>
		{/each}
	{/if}
</div>