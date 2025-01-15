<script lang="ts">
    import type { Component } from 'svelte';
    import { randomString } from '../utils/random.js';
    import type { FullAutoFill } from 'svelte/elements';
    
    type propsT = {
        type?: 'text' | 'number' | 'email' | 'password';
        id?: string;
        name?: string;
        value?: string | number;
        label?: string;
        error?: string;
        'aria-labelledby'?: string;
        'aria-describedby'?: string;
        size?: 'small' | 'medium' | 'large';
        class?: string;
        prefix?: string | Component;
        prefixStyling?: boolean;
        suffix?: string | Component;
        suffixStyling?: boolean;
        spellcheck?: boolean;
        placeholder?: string;
        disabled?: boolean;
        autocomplete?: FullAutoFill | null;
    };

    let {
        type = 'text',
        id = undefined,
        name = undefined,
        value = $bindable<string | number>(),
        label = undefined,
        error = undefined,
        'aria-labelledby': ariaLabelledBy = undefined,
        'aria-describedby': ariaDescribedBy = undefined,
        size = 'medium',
        class: customClass = '',
        prefix = undefined,
        prefixStyling = true,
        suffix = undefined,
        suffixStyling = true,
        spellcheck = false,
        placeholder = undefined,
        disabled = false,
        autocomplete = undefined,
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
        medium: 'h-[36px] text-sm',
        large: 'h-[40px] text-base',
    };
    let sizeClass = $derived.by(() => {
        return sizeObj[size];
    });

    // Единообразный вид бордеров/ринга в светлой и темной теме
    let ringClass = $derived.by(() => {
        if (disabled) {
            return `cursor-not-allowed border border-neutral-200 dark:border-neutral-700
                    text-neutral-600 dark:text-neutral-600
                    placeholder-neutral-600 dark:placeholder-neutral-600`;
        }
        if (error) {
            return `border-red-500 dark:border-red-600
                    ring-4 ring-red-500/40 dark:ring-red-600/40
                    hover:ring-red-500/40 dark:hover:ring-red-600/40`;
        }
        if (hasRing) {
            return `border-neutral-200 dark:border-neutral-700
                    ring-4 ring-neutral-300/50 dark:ring-neutral-700/50`;
        }
        return `border-neutral-200 dark:border-neutral-700
                hover:border-neutral-400/80 dark:hover:border-neutral-500/80
                bg-transparent`;
    });

    // Текст и placeholder в разных состояниях
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

    // Бордер префикса/суффикса в темной теме чуть светлее
    let prefixClass = $derived.by(() => {
        if (prefixStyling) {
            return `bg-transparent border-r border-neutral-200 dark:border-neutral-700`;
        }
        return ``;
    });

    let suffixClass = $derived.by(() => {
        if (suffixStyling) {
            return `bg-transparent border-l border-neutral-200 dark:border-neutral-700`;
        }
        return ``;
    });

    const errorTextObj = {
        tiny: 'text-[11px] leading-[16px]',
        small: 'text-[12px] leading-[20px]',
        medium: 'text-[13px] leading-[20px]',
        large: 'text-[14px] leading-[24px]',
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
        class="flex items-center {sizeClass} overflow-hidden transition-all border {ringClass} rounded-[6px] bg-transparent"
    >
        {@render prefixSnip()}
        <div class="w-full h-full relative">
            <input
                {type}
                bind:value
                id={inputID}
                {name}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
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
                class="{inputClass} w-full h-full outline-none bg-transparent pl-3 pr-3"
                style="padding-left: {prefix ? 'calc(1rem + 16px)' : '1rem'};
                       padding-right: {suffix ? 'calc(1rem + 16px)' : '1rem'};"
            />
        </div>
        {@render suffixSnip()}
    </div>
    {#if error}
        <div class="mt-[8px]">
            <div class="flex items-center">
                <div class="{errorText} text-red-500 dark:text-red-500">
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

