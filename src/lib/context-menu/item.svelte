<script lang="ts">
	import { getContext, type Component, type Snippet } from 'svelte';

	type propsT = {
    onClick?: () => void | Promise<void>;
    prefix?: Component | undefined;
    suffix?: Component | undefined;
    type?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning';
    children: Snippet;
};

	let {
		onClick = undefined,
		type = 'tertiary',
		prefix = undefined,
		suffix = undefined,
		children
	}: propsT = $props();

	const rootState = getContext<{
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
	}>('menu');

	const typeObj = {
		primary: 'text-neutral-950 dark:text-neutral-200',
		secondary: 'text-neutral-950 dark:text-neutral-200',
		tertiary: 'text-neutral-950 dark:text-neutral-200',
		error: 'text-red-600 dark:text-red-600',
		warning: 'text-amber-600 dark:text-amber-600'
	};
	let typeClass = $derived.by(() => {
		return typeObj[type];
	});

	let isSuffixClass = $derived.by(() => {
		if (suffix) {
			return 'justify-between';
		}
		return ''
	})
</script>

{#snippet prefixSnip()}
	{#if prefix}
		{@const Prefix = prefix}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<Prefix />
		</div>
	{/if}
{/snippet}

{#snippet suffixSnip()}
	{#if suffix}
		{@const Suffix = suffix}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<Suffix />
		</div>
	{/if}
{/snippet}

<button
	onclick={async () => {
		if (onClick) {
			await onClick();
		}
		rootState.setIsActive(false);
	}}
	class="relative w-full cursor-pointer bg-transparent transition-colors text-sm flex items-center gap-2 {isSuffixClass} rounded-md 
	py-3.5 lg:py-2.5 px-2 hover:bg-neutral-100 hover:dark:bg-neutral-700 {typeClass}"
>
    {@render prefixSnip()}
    <span class="first-letter:capitalize ">
        {@render children()}
    </span>
    {@render suffixSnip()}
</button>
