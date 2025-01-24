<script lang="ts">
    import { type Snippet } from "svelte";
    import type { IconProps } from '$lib/types/ui.js';

    type propsT = {
        isSelected?: boolean;
        onClick?: (isSelected: boolean) => void;
        ariaLabel?: string;
        className?: string;
        disabled?: boolean;
        size?: 'tiny' | 'small' | 'medium' | 'large';
        variant?: 'ghost' | 'outline';
        icon?: IconProps;
        rounded?: boolean;
        children?: Snippet;
    };

    let {
        isSelected = $bindable(false),
        onClick = undefined,
        ariaLabel = undefined,
        className = '',
        disabled = false,
        size = 'medium',
        variant = 'ghost',
        icon = undefined,
        rounded = false,
        children,
    }: propsT = $props();

    let selectedState = $state(isSelected);

    const typographySizes = {
        tiny:   'text-xs leading-3',
        small:  'text-sm leading-4',
        medium: 'text-sm leading-[20px]',
        large:  'text-base leading-[24px]',
    };

    const dimensions = {
        tiny:   { h: 'h-7', w: 'w-7', px: 'px-2' },
        small:  { h: 'h-8', w: 'w-8', px: 'px-3' },
        medium: { h: 'h-9', w: 'w-9', px: 'px-[10px]' },
        large:  { h: 'h-10', w: 'w-10', px: 'px-3' },
    };

    const variantClasses = {
        ghost: {
            default:       'text-neutral-950 dark:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:bg-neutral-300 dark:hover:bg-neutral-600',
        },
        outline: {
            default:       'text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-600',
        },
    };

    const disabledSelectedClasses = {
        ghost:   'bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
        outline: 'border-neutral-400 dark:border-neutral-600 bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
    };

    let combinedClass = $derived.by(() => {
        const t = typographySizes[size] ?? '';
        const { h, w, px } = dimensions[size] ?? { h: 'h-9', w: 'w-9', px: 'px-[10px]' };

        let shapeClass = '';
        if (icon && !children) {
            shapeClass = `
                box-border
                flex items-center justify-center
                ${w} ${h}
                p-0
            `;
        } else {
            shapeClass = `
                box-border
                flex items-center justify-center
                ${h}
                min-w-9
                ${px}
            `;
        }

        const roundClass = rounded ? 'rounded-full' : 'rounded';
        const v = variantClasses[variant];

        if (disabled) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${disabledSelectedClasses[variant]}
                ${roundClass}
                ${shapeClass}
                ${className}
            `;
        }

        if (selectedState) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${v.selected}
                ${v.hoverSelected}
                ${roundClass}
                ${shapeClass}
                ${className}
            `;
        }

        return `
            inline-flex items-center justify-center gap-2 transition-colors
            ${t}
            ${v.default}
            ${roundClass}
            ${shapeClass}
            ${className}
        `;
    });

    $effect(() => {
        if (!ariaLabel) {
            console.warn('Accessibility: Please provide a valid "ariaLabel" for Toggle.');
        }
    });

    function handleClick() {
        if (!disabled) {
            selectedState = !selectedState;
            onClick?.(selectedState);
        }
    }
</script>

{#snippet iconOnly()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
{/snippet}

{#snippet iconWithText()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
    {#if typeof children === 'function'}
        <span>{@render children()}</span>
    {/if}
{/snippet}

{#snippet toggleButton()}
    <button
        type="button"
        class={combinedClass}
        aria-pressed={selectedState}
        {disabled}
        onclick={handleClick}
    >
        {#if icon && typeof children === 'function'}
            {@render iconWithText()}
        {:else if icon}
            {@render iconOnly()}
        {:else if typeof children === 'function'}
            <span>{@render children()}</span>
        {/if}
    </button>
{/snippet}

<div>
    {@render toggleButton()}
</div>