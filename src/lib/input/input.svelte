<script lang="ts">
    import type { Component } from 'svelte';
	import Error from '../icons/Error.svelte';
	import { randomString } from '../utils/random.js';
	import type { FullAutoFill } from 'svelte/elements';


	type propsT = {
		type?: 'text' | 'number' | 'email' | 'password' | undefined;
		id?: string | undefined;
		name?: string | undefined;
		value?: string | undefined;
		label?: string | undefined;
		error?: string | undefined;
		'aria-labelledby'?: string | undefined;
		size?: 'small' | 'medium' | 'large';
		prefix?: string | Component | undefined;
		prefixStyling?: boolean | undefined;
		suffix?: string | Component | undefined;
		suffixStyling?: boolean | undefined;
		spellcheck?: boolean | undefined;
		placeholder?: string | undefined;
		disabled?: boolean | undefined;
		autocomplete?: FullAutoFill | null | undefined;
	};
	let {
		type = 'text',
		id = undefined,
		name = undefined,
		value = $bindable(''),
		label = undefined,
		error = undefined,
		'aria-labelledby': araiLabelledBy = undefined,
		size = 'medium',
		prefix = undefined,
		prefixStyling = true,
		suffix = undefined,
		suffixStyling = true,
		spellcheck = false,
		placeholder = undefined,
		disabled = false,
		autocomplete = undefined
	}: propsT = $props();

	let hasRing = $state(false);

	let inputID = $derived.by(() => {
		if (id) {
			return id;
		}
		return randomString(8);
	});

	const sizeObj = {
		small: 'h-[32px] text-sm',
		medium: 'h-[40px] text-sm',
		large: 'h-[48px] text-base'
	};
	let sizeClass = $derived.by(() => {
		return sizeObj[size];
	});

	let ringClass = $derived.by(() => {
	if (disabled) {
		return `cursor-not-allowed border-neutral-400 dark:border-neutral-400 
				bg-neutral-100 dark:bg-neutral-100 text-neutral-600 dark:text-neutral-600 
				placeholder-neutral-600 dark:placeholder-neutral-600`;
	}
	if (error) {
		return `border-red-700 dark:border-red-700`;
	}
  	if (hasRing) {
		return `border-neutral-700 dark:border-neutral-700 
				hover:border-neutral-700 dark:hover:border-neutral-700`;
  	}
		return `border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 
			dark:hover:border-neutral-700`;
	});


	let inputClass = $derived.by(() => {
		if (disabled) {
			return `cursor-not-allowed text-neutral-600 dark:text-neutral-600`;
		}
		return `text-neutral-950 dark:text-neutral-950`;
	});

	let inputContClass = $derived.by(() => {
		if (prefixStyling && suffixStyling) {
			return `px-3`;
		}
		if (prefixStyling) {
			return 'pl-3';
		}
		if (suffixStyling) {
			return 'pr-3';
		}
		return ``;
	});

	let prefixClass = $derived.by(() => {
		if (prefixStyling) {
			return `bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200
     dark:border-neutral-400`;
		}
		return ``;
	});

	let suffixClass = $derived.by(() => {
		if (suffixStyling) {
			return `bg-neutral-50 dark:bg-neutral-800 border-l border-neutral-200
     dark:border-neutral-400`;
		}
		return ``;
	});

	const errorTextObj = {
		tiny: 'text-[12px] leading-[16px]',
		small: 'text-[13px] leading-[20px]',
		medium: 'text-[14px] leading-[20px]',
		large: 'text-[16px] leading-[24px]'
	};
	let errorText = $derived.by(() => {
		return errorTextObj[size];
	});
</script>

{#snippet prefixSnip()}
	{#if prefix}
		<span
			class="h-full flex items-center px-3 text-neutral-700 dark:text-neutral-700 {prefixClass}"
		>
			{#if typeof prefix === 'string'}
				{prefix}
			{:else if typeof prefix === 'function'}
				{@const PrefixIcon = prefix}
				<div class="w-[16px] h-[16px]">
					<PrefixIcon />
				</div>
			{/if}
		</span>
	{/if}
{/snippet}

{#snippet suffixSnip()}
	{#if suffix}
		<span
			class="h-full flex items-center px-3 text-neutral-700 dark:text-neutral-700 {suffixClass}"
		>
			{#if typeof suffix === 'string'}
				{suffix}
			{:else if typeof suffix === 'function'}
				{@const SuffixIcon = suffix}
				<div class="w-[16px] h-[16px]">
					<SuffixIcon />
				</div>
			{/if}
		</span>
	{/if}
{/snippet}

{#snippet inputSnip()}
	<div>
		<div
			class="flex items-center {sizeClass} overflow-hidden transition-all border {ringClass} rounded-[6px] bg-kui-light-bg
			dark:bg-neutral-800"
		>
			{@render prefixSnip()}

			<div class="w-full h-full {inputContClass}">
				<input
					{type}
					bind:value
					id={inputID}
					{name}
					aria-labelledby={araiLabelledBy}
					{spellcheck}
					{placeholder}
					{disabled}
					autocomplete={autocomplete}
					onfocus={() => {
						hasRing = true;
					}}
					onblur={() => {
						hasRing = false;
					}}
					class="{inputClass} w-full h-full outline-none bg-transparent"
				/>
			</div>

			{@render suffixSnip()}
		</div>
		{#if error}
			<div class="mt-[8px]">
				<div class="flex items-center gap-[8px]">
					<div class="w-[16px] h-[16px] text-red-900 dark:text-red-900">
						<Error />
					</div>
					<div class="{errorText} text-red-900 dark:text-red-900">
						{error}
					</div>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

<div>
	{#snippet inputLabel()}
		<label for={inputID}>
			<div class="inline-block text-sm text-neutral-950 dark:text-neutral-950 mb-2">
				{label}
			</div>
			{@render inputSnip()}
		</label>
	{/snippet}

	{#if label}
		{@render inputLabel()}
	{:else}
		{@render inputSnip()}
	{/if}
</div>