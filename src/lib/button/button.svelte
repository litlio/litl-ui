<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import type { IconProps } from '$lib/types/ui.js';
	import type { Component, Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type propsT = {
		onclick?: (evt: Event) => void;
		class?: string;
		'aria-label'?: string;
		shape?: 'circle' | 'square' | undefined;
		size?: 'tiny' | 'small' | 'medium' | 'large';
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'error' | 'warning';
		prefix?: Component | IconProps;
		suffix?: Component | IconProps;
		rounded?: boolean;
		full?: boolean;
		loading?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		children: Snippet;
	};

	let {
		onclick = undefined,
		class: klass = '',
		'aria-label': ariaLabel = undefined,
		shape = undefined,
		size = 'medium',
		variant = 'primary',
		prefix = undefined,
		suffix = undefined,
		rounded = false,
		full = false,
		loading = false,
		disabled = false,
		type = 'button',
		children
	}: propsT = $props();

	const sizeObj = {
		tiny: 'h-[28px] px-[2px] text-xs leading-3',
		small: 'h-[32px] px-[6px] text-sm leading-4',
		medium: 'h-[36px] px-[10px] text-sm leading-[20px]',
		large: 'h-[40px] px-[14px] text-base leading-[24px]'
	};
	const shapeSizeObj = {
		tiny: `w-[28px] ${sizeObj.tiny} `,
		small: `w-[32px] ${sizeObj.small} `,
		medium: `w-[36px] ${sizeObj.medium} `,
		large: `w-[40px] ${sizeObj.large} `
	};
	let sizeClass = $derived.by(() => {
		if (shape) {
			return shapeSizeObj[size];
		} else {
			return sizeObj[size];
		}
	});

	let fullWidthClass = $derived.by(() => {
        return full ? 'w-full' : '';
    });

	const prefixSuffixSpinnerObj = {
		tiny: 'w-[14px] h-[14px]',
		small: 'w-[16px] h-[16px]',
		medium: 'w-[16px] h-[16px]',
		large: 'w-[24px] h-[24px]'
	};
	let iconSize = $derived.by(() => {
		return prefixSuffixSpinnerObj[size];
	});

	const typeObj = {
		primary: `text-white dark:text-neutral-950 bg-neutral-800 dark:bg-neutral-100 
		hover:brightness-140 dark:hover:brightness-85`,

		secondary: `text-neutral-950 dark:text-white bg-neutral-200 dark:bg-neutral-800 border 
		border-neutral-200 dark:border-neutral-800 hover:brightness-103 hover:dark:bg-neutral-700`,

		outline: `text-neutral-950 dark:text-white bg-transparent dark:bg-transparent border 
		border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 hover:dark:bg-neutral-700`,

		ghost: `text-neutral-950 dark:text-white hover:bg-neutral-100 
		hover:dark:bg-neutral-700`,

		link: `text-neutral-950 dark:text-white hover:underline 
		hover:underline`,

		error: `text-destructive-foreground bg-destructive dark:bg-destructive
		hover:brightness-120`,

		warning: `text-neutral-950 bg-amber-500 dark:bg-amber-600 
		hover:brightness-120`
	};

	let typeClass = $derived.by(() => {
		return typeObj[variant];
	});

	let roundedStyle = $derived.by(() => {
		if (rounded) {
			return 'rounded-full';
		}
		return 'rounded-[8px]';
	});

	const radiusObj = {
		tiny: 'rounded-[6px]',
		small: 'rounded-[7px]',
		medium: 'rounded-[8px]',
		large: 'rounded-[9px]'
	};
	let roundedWithShapeStyle = $derived.by(() => {
		if (shape == 'circle') {
			return 'rounded-full';
		}
		return radiusObj[size];
	});

	let radiusStyle = $derived.by(() => {
		if (shape) {
			return roundedWithShapeStyle;
		}
		return roundedStyle;
	});

	let loadingDisabledClass = $derived.by(() => {
		if (disabled || loading) {
			return 'cursor-not-allowed text-neutral-500 dark:text-neutral-700  bg-neutral-200 dark:bg-neutral-500 border border-neutral-300 dark:border-neutral-500';
		}
		return '';
	});

	// The final styles for the button
	let buttonClass = $derived.by(() => {
		if (disabled || loading) {
			return `${sizeClass} ${radiusStyle} ${loadingDisabledClass} ${fullWidthClass} ${klass}`;
		}
		return `${sizeClass} ${typeClass} ${radiusStyle} ${fullWidthClass} ${klass}`;
	});
</script>

{#snippet spinner()}
	{#if loading}
		<div class="relative {iconSize} animate-spin flex items-center justify-center">
			<div transition:fade class="absolute w-full h-full">
				<LoaderCircle size={16}/>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet prefixSnip()}
    {#if typeof prefix === 'object' && prefix.component}
        {@const IconComponent = prefix.component}
        <div class="{iconSize} flex items-center justify-center">
            <IconComponent {...prefix.props} />
        </div>
    {:else if typeof prefix === 'function'}
        {@const Prefix = prefix}
        <div class="{iconSize} flex items-center justify-center">
            <Prefix />
        </div>
    {:else if loading}
        {@render spinner()}
    {/if}
{/snippet}

{#snippet suffixSnip()}
    {#if typeof suffix === 'object' && suffix.component}
        {@const IconComponent = suffix.component}
        <div class="{iconSize} flex items-center justify-center">
            <IconComponent {...suffix.props} />
        </div>
    {:else if typeof suffix === 'function'}
        {@const Suffix = suffix}
        <div class="{iconSize} flex items-center justify-center">
            <Suffix />
        </div>
    {/if}
{/snippet}

{#snippet mainButton()}
	<button aria-label={ariaLabel} {onclick} type={type} {disabled} class="{buttonClass} ">
		<div class="w-full h-full px-[6px] flex items-center justify-center gap-[8px]">
			{@render prefixSnip()}
			<span class="font-normal first-letter:capitalize">
				{@render children()}
			</span>
			{@render suffixSnip()}
		</div>
	</button>
{/snippet}

{#snippet withShape()}
	<button aria-label={ariaLabel} {onclick} type={type} {disabled} class="{buttonClass} ">
		<div class="w-full h-full flex items-center justify-center">
			<span class="font-normal first-letter:capitalize">
				{@render children()}
			</span>
		</div>
	</button>
{/snippet}

{#if shape}
	{@render withShape()}
{:else}
	{@render mainButton()}
{/if}