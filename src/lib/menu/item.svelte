<script lang="ts">
	import { getContext, type Component, type Snippet } from 'svelte';

	type IconProps = {
		component: any;
		props?: Record<string, any>;
	};

	type propsT = {
		onClick?: () => void | undefined;
		prefix?: Component | IconProps | undefined;
		suffix?: Component | IconProps | undefined;
		type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'warning';
		children: Snippet;
	};
	let {
		onClick = undefined,
		type = 'outline',
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
		outline: 'text-neutral-950 dark:text-neutral-200',
		ghost: 'text-neutral-950 dark:text-neutral-200',
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
	{#if typeof prefix === 'object' && prefix?.component}
		{@const IconComponent = prefix.component}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<IconComponent {...prefix.props} />
		</div>
	{:else if typeof prefix === 'function'}
		{@const Prefix = prefix}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<Prefix />
		</div>
	{/if}
{/snippet}

{#snippet suffixSnip()}
	{#if typeof suffix === 'object' && suffix?.component}
		{@const IconComponent = suffix.component}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<IconComponent {...suffix.props} />
		</div>
	{:else if typeof suffix === 'function'}
		{@const Suffix = suffix}
		<div class="w-[16px] h-[16px] flex items-center justify-center">
			<Suffix />
		</div>
	{/if}
{/snippet}


<button
	onclick={() => {
		if (onClick) {
			onClick();
		}
		rootState.setIsActive(false);
	}}
	class="relative w-full cursor-pointer bg-transparent transition-colors text-sm flex items-center gap-2 {isSuffixClass} rounded-md 
	py-3.5 lg:py-2.5 px-2 hover:bg-neutral-100 hover:dark:bg-neutral-800 {typeClass}"
>
	{@render prefixSnip()}
	<span class="first-letter:capitalize ">
		{@render children()}
	</span>
	{@render suffixSnip()}
</button>