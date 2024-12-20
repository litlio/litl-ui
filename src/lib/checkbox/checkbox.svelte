<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import Minus from 'lucide-svelte/icons/minus';
	import { randomString } from '../utils/random.js';
	import type { Snippet } from 'svelte';

	type propT = {
		checked?: boolean | undefined;
		value?: string | undefined;
		items?: Array<string> | undefined;
		indeterminate?: boolean | undefined;
		disabled?: boolean | undefined;
		children?: Snippet;
	};
	let {
		checked = $bindable(false),
		value = undefined,
		items = $bindable(undefined),
		indeterminate = false,
		disabled = false,
		children
	}: propT = $props();

	const unique = `${randomString(4)}_${value}`;

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

	$effect(() => {
		if (items && value) {
			if (items.includes(value)) {
				checked = true;
			}
		}
	});

	let checkboxContClass = $derived.by(() => {
		if (disabled) {
			if (indeterminate) {
				return `border-neutral-600 dark:border-neutral600 text-white dark:text-white
				bg-neutral-100 dark:bg-neutral-100`;
			}

			if (checked) {
				return `border-neutral-600 dark:border-neutral-600 bg-neutral-600 dark:bg-neutral-600`;
			}
			return `border-neutral-500 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-100`;
		}
		if (indeterminate) {
			return `border-neutral-900 dark:border-neutral-900`;
		}

		if (checked) {
			return `border-neutral-900  dark:border-neutral-900 bg-neutral-900 dark:bg-neutral-900`;
		}
		return `border-neutral-500 dark:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-100`;
	});

	let checkboxClass = $derived.by(() => {
		if (indeterminate) {
			return `text-neutral-950 dark:text-white`;
		}
		if (checked) {
			return `text-white dark:text-white`;
		}
		return `text-transparent`;
	});

	let textClass = $derived.by(() => {
		if (disabled) {
			return `text-neutral-700 dark:text-neutral-700`;
		}
		return `neutral-950 dark:text-white`;
	});
</script>

<section class="flex">
	<label for={unique}>
		<div class="flex items-center gap-2 cursor-pointer">
			<div
				class="w-[16px] h-[16px] rounded-[4px] p-[2px] box-border transition-colors ease-in flex items-center justify-center border {checkboxContClass} "
			>
				<input
					{onchange}
					type="checkbox"
					{checked}
					id={unique}
					{value}
					{disabled}
					{indeterminate}
					class="hidden"
				/>
				<div class="w-[16px] h-[16px] font-bold transition-colors ease-in {checkboxClass}">
					{#if indeterminate}
						<Minus size={16} />
					{:else}
						<Check size={16} />
					{/if}
				</div>
			</div>

			{#if children}
				<div class="text-sm select-none first-letter:capitalize {textClass}">
					{@render children()}
				</div>
			{/if}
		</div>
	</label>
</section>