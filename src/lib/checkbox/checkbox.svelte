<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import Minus from 'lucide-svelte/icons/minus';
	import { randomString } from '../utils/random.js';
	import type { Snippet } from 'svelte';

	type propT = {
		checked?: boolean;
		value?: string;
		items?: Array<string>;
		indeterminate?: boolean;
		disabled?: boolean;
		children?: Snippet;
		class?: string;
	};

	let {
		checked = $bindable(false),
		value,
		items = $bindable(undefined),
		indeterminate = false,
		disabled = false,
		children,
		class: customClass = '',
	}: propT = $props();

	const unique = `${randomString(4)}_${value}`;

	// Устанавливаем состояние indeterminate через JS
	$effect(() => {
		const inputElement = document.getElementById(unique) as HTMLInputElement;
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	// Обновление состояния checked
	const onchange = () => {
		checked = !checked;
		if (items && value) {
			if (checked) {
				items = [...items, value];
			} else {
				items = items.filter((item) => item !== value);
			}
		}
	};

	let checkboxContClass = $derived.by(() => {
		if (disabled) {
			return `bg-neutral-300 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-500`;
		}
		if (indeterminate) {
			return `bg-neutral-100 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-900`;
		}
		if (checked) {
			return `bg-neutral-900 dark:bg-neutral-900 border-neutral-900 dark:border-neutral-900`;
		}
		return `bg-transparent border-neutral-500 dark:border-neutral-500`;
	});

	let checkboxClass = $derived.by(() => {
		if (checked || indeterminate) {
			return `text-white dark:text-white`;
		}
		return `text-transparent`;
	});

	let textClass = $derived.by(() => {
		return disabled ? `text-neutral-700 dark:text-neutral-700` : `text-neutral-950 dark:text-white`;
	});
</script>

<section class="flex {customClass}">
	<label for={unique} class="flex items-center gap-2 {disabled ? 'cursor-not-allowed' : 'cursor-pointer'}">
		<div
			class="w-[16px] h-[16px] rounded-[4px] p-[2px] box-border transition-colors ease-in flex items-center justify-center border {checkboxContClass}"
		>
			<input
				type="checkbox"
				id={unique}
				{checked}
				{value}
				{disabled}
				class="hidden"
				{onchange}
			/>
			{#if indeterminate}
				<span class="w-[16px] h-[16px] font-bold {checkboxClass}">
					<Minus size={16} />
				</span>
			{:else}
				<span class="w-[16px] h-[16px] font-bold {checkboxClass}">
					<Check size={16} />
				</span>
			{/if}
		</div>
		{#if children}
			<div class="text-sm select-none {textClass}">{@render children()}</div>
		{/if}
	</label>
</section>


