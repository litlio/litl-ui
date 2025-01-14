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

	// Флаг «есть фокус» — для отображения ring при фокусе
	let hasRing = $state(false);

	// Приводим размеры к тем же, что и в вашем обычном Input
	const sizeObj = {
		small: 'h-[32px] text-sm',
		medium: 'h-[36px] text-sm',
		large: 'h-[40px] text-base',
	};
	let sizeClass = $derived.by(() => sizeObj[size]);

	// Основная логика для бордеров/ринга в разных состояниях
	let containerClass = $derived.by(() => {
		// Если borderless, то убираем границу полностью
		if (borderless) {
			return 'border-0';
		}
		// Disabled-состояние
		if (disabled) {
			return `border cursor-not-allowed border-neutral-200 dark:border-neutral-700
					bg-neutral-100 dark:bg-neutral-900
					text-neutral-600 dark:text-neutral-600
					placeholder-neutral-600 dark:placeholder-neutral-600`;
		}
		// Ошибка
		if (error) {
			return `border border-red-500 dark:border-red-600
					ring-4 ring-red-500/40 dark:ring-red-600/40
					hover:ring-red-500/40 dark:hover:ring-red-600/40`;
		}
		// Фокус
		if (hasRing) {
			return `border border-neutral-200 dark:border-neutral-700
					ring-4 ring-neutral-300/50 dark:ring-neutral-700/50`;
		}
		// Нормальное состояние
		return `border border-neutral-200 dark:border-neutral-700
				hover:border-neutral-400/80 dark:hover:border-neutral-500/80
				bg-transparent`;
	});

	// Классы самого input'а
	let inputClass = $derived.by(() => {
		if (disabled) {
			return `bg-neutral-200 dark:bg-neutral-900 cursor-not-allowed
					text-neutral-400 dark:text-neutral-600
					placeholder-neutral-400 dark:placeholder-neutral-700`;
		}
		if (error) {
			return `text-red-500 dark:text-red-500
					placeholder-neutral-400 dark:placeholder-neutral-500`;
		}
		return `text-neutral-950 dark:text-neutral-50
				placeholder-neutral-400 dark:placeholder-neutral-500`;
	});

	// Класс иконки
	let iconClass = $derived.by(() => {
		if (disabled) {
			return 'text-neutral-400 dark:text-neutral-600';
		}
		return 'text-neutral-700 dark:text-neutral-300';
	});

	function clearInput() {
		value = '';
	}
</script>

{#snippet iconSnippet()}
	{#if showIcon}
		<span class={`h-full flex items-center px-3 ${iconClass}`}>
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
		onfocus={() => (hasRing = true)}
		onblur={() => (hasRing = false)}
		class={`w-full h-full outline-none bg-transparent pl-3 pr-3 ${inputClass}`}
		style="{!showIcon ? 'padding-left: 0.75rem;' : ''}"
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
		class={`flex items-center ${sizeClass} transition-all ${containerClass} rounded-[6px]`}
		style="width: 100%;"
	>
		{@render iconSnippet()}
		<div class="flex-grow flex items-center">
			{@render inputSnippet()}
			{@render clearButtonSnippet()}
		</div>
	</div>

	{#if error}
		<p class="text-red-500 dark:text-red-500 text-sm">{error}</p>
	{/if}
</div>
