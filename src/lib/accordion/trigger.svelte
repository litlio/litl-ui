<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { getContext, type Snippet } from 'svelte';

	type propsT = {
		children: Snippet | undefined;
	};
	let { children }: propsT = $props();

	let { size, value, defaultExpanded } = getContext<{
		size: 'small' | 'medium' | 'large';
		value: string;
		defaultExpanded: boolean;
	}>('collapseItem');

	let collapseItem = getContext<{ get: () => string; set: (value: string) => void }>('collapse');

	let rotate = $derived.by(() => {
		if (value == collapseItem.get()) {
			return '-rotate-180';
		}
		return '';
	});

	const paddingObj = {
		small: `py-[12px]`,
		medium: `py-[16px]`,
		large: `py-4 lg:py-6`
	};
	let paddingClass = $derived.by(() => {
		return paddingObj[size];
	});

	const textObj = {
		small: 'text-4',
		medium: 'text-md md:text-[16px]',
		large: 'text-lg lg:text-[24px]'
	};
	let textClass = $derived.by(() => {
		return textObj[size];
	});

	$effect(() => {
		if (defaultExpanded) {
			collapseItem.set(value);
		}
	});

	const onclick = () => {
		if (collapseItem.get() != '' && value != '') {
			if (collapseItem.get() === value) {
				collapseItem.set('');
			} else {
				collapseItem.set(value);
			}
		} else {
			collapseItem.set(value);
		}
	};
</script>

<button {onclick} class="w-full flex items-center justify-between text-left bg-transparent {paddingClass} ">
	{#if children}
		<span class="{textClass} text-neutral-950 dark:text-white font-semibold"
			>{@render children()}</span
		>
	{/if}
	<div class="">
		<div class="w-[16px] h-[16px] {rotate} transform-gpu duration-200 text-neutral-950 dark:text-white">
			<ChevronDown size={16} />
		</div>
	</div>
</button>