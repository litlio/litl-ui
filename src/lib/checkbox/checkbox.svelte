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

	$effect(() => {
		const inputElement = document.getElementById(unique) as HTMLInputElement;
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	const onchange = () => {
		// Сбрасываем indeterminate в checked
		if (indeterminate) {
			indeterminate = false;
			checked = true;
		} else {
			checked = !checked;
		}

		// Обновляем items, если они есть
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
			return `bg-neutral-800 dark:bg-neutral-300 border-neutral-800 dark:border-neutral-300`;
		}
		if (checked) {
			return `bg-neutral-950 dark:bg-white border-neutral-200 dark:border-neutral-800`;
		}
		return `bg-transparent border-neutral-400 dark:border-neutral-600`;
	});

	let checkboxClass = $derived.by(() => {
		if (disabled) {
			return `text-neutral-800 dark:text-neutral-400`;
		}
		if (checked) {
			return `text-white dark:text-black`;
		}
		if (indeterminate) {
			return `text-white dark:text-black`; // Контрастный цвет для indeterminate
		}
		return `text-transparent`;
	});

	let textClass = $derived.by(() => {
		return disabled
			? `text-neutral-500 dark:text-neutral-700`
			: `text-neutral-900 dark:text-white`;
	});
</script>

<section class="flex {customClass}">
	<label for={unique} class="flex items-center gap-2 {disabled ? 'cursor-not-allowed' : 'cursor-pointer'}">
		<div
			class="w-[18px] h-[18px] rounded-[4px] p-[2px] box-border transition-colors ease-in flex items-center justify-center border {checkboxContClass}"
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
				<span class="w-[16px] h-[16px] {checkboxClass}">
					<Minus size={16} />
				</span>
			{:else if checked}
				<span class="w-[16px] h-[16px] {checkboxClass}">
					<Check size={16} />
				</span>
			{/if}
		</div>
		{#if children}
			<div class="text-sm select-none {textClass}">{@render children()}</div>
		{/if}
	</label>
</section>