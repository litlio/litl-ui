<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import X from 'lucide-svelte/icons/x';

	type propsT = {
		'aria-labelledby'?: string | undefined;
		value?: string | undefined;
		size?: 'small' | 'medium' | 'large';
		error?: string | undefined;
		disabled?: boolean | undefined;
		placeholder?: string | undefined;
		autocomplete?: 'on' | 'off';
		borderless?: boolean;
		showIcon?: boolean;
		clearable?: boolean;
	};
	let {
		'aria-labelledby': ariaLabelledBy = undefined,
		value = $bindable(''),
		size = 'medium',
		error = undefined,
		disabled = false,
		placeholder = undefined,
		autocomplete = 'on',
		borderless = false,
		showIcon = true,
		clearable = true,
	}: propsT = $props();

	const sizeObj = {
		small: 'h-[32px] text-sm',
		medium: 'h-[40px] text-sm',
		large: 'h-[48px] text-base',
	};
	let sizeClass = $derived.by(() => sizeObj[size]);

	let borderClass = $derived.by(() => {
		if (borderless) return 'border-0';
		if (disabled) {
			return `cursor-not-allowed border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900`;
		}
		if (error) {
			return `border border-destructive dark:border-destructive`;
		}
		return `border border-input dark:border-neutral-800`;
	});

	let textClass = $derived.by(() => {
		if (disabled) {
			return `text-neutral-400 dark:text-neutral-600 placeholder:text-neutral-400 dark:placeholder:text-neutral-600`;
		}
		return `text-gray-900 dark:text-white placeholder:text-neutral-600 dark:placeholder:text-neutral-600`;
	});

	function clearInput() {
		value = '';
	}
</script>

{#snippet iconSnippet()}
	{#if showIcon}
		<span
			class={`h-full flex items-center px-3 ${disabled ? 'text-neutral-400 dark:text-neutral-600' : 'text-neutral-700 dark:text-neutral-700'}`}
		>
			<Search size={16} />
		</span>
	{/if}
{/snippet}

{#snippet inputSnippet()}
	<input
		type="text"
		aria-labelledby={ariaLabelledBy}
		bind:value
		{placeholder}
		{disabled}
		autocomplete={autocomplete}
		class={`w-full h-full outline-none bg-transparent text-sm ${textClass} ${!showIcon ? 'pl-3' : ''}`}
	/>
{/snippet}

{#snippet clearButtonSnippet()}
	<button
		type="button"
		class="flex-shrink-0 w-8 h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400"
		onclick={clearInput}
		style="visibility: {clearable && value && !disabled ? 'visible' : 'hidden'};"
		disabled={disabled}
	>
		<X size={16} />
	</button>
{/snippet}

<div class="flex flex-col items-center space-y-2">
<div
	class={`flex items-center ${sizeClass} transition-all ${borderClass} rounded-[6px]`}
	style="width: 100%;"
>
	{@render iconSnippet()}
	<div class="flex-grow flex items-center">
		{@render inputSnippet()}
		{@render clearButtonSnippet()}
	</div>
</div>
{#if error}
<p class="text-destructive dark:text-destructive text-sm">{error}</p>
{/if}
</div>