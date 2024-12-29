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
        children,
    }: propsT = $props();

    let selectedState = $state(isSelected);

    // Размеры
    const sizeClasses = {
        tiny: 'h-[28px] px-[6px] text-xs leading-3',
        small: 'h-[32px] px-[8px] text-sm leading-4',
        medium: 'h-[36px] px-[10px] text-sm leading-[20px]',
        large: 'h-[40px] px-[12px] text-base leading-[24px]',
    };

    // Варианты стилей
    const variantClasses = {
        ghost: {
            default: `text-neutral-950 dark:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700`,
            selected: `bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200`,
            hoverSelected: `hover:bg-neutral-300 dark:hover:bg-neutral-600`,
        },
        outline: {
            default: `text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 bg-transparent 
                      hover:bg-neutral-100 dark:hover:bg-neutral-700 box-border`,
            selected: `border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200 box-border`,
            hoverSelected: `hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-600`,
        },
    };

    // Disabled + Selected стили
    const disabledSelectedClasses = {
        ghost: `bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`,
        outline: `border-neutral-400 dark:border-neutral-600 bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`,
    };

    let combinedClass = $derived.by(() => {
        const sizeClass = sizeClasses[size];
        const variantClass = variantClasses[variant];

        // Логика выбора класса
        if (disabled) {
            return selectedState
                ? `${sizeClass} ${disabledSelectedClasses[variant]} ${className}`
                : `${sizeClass} cursor-not-allowed text-neutral-500 dark:text-neutral-700 bg-transparent ${className}`;
        }

        if (selectedState) {
            return `${sizeClass} ${variantClass.selected} ${variantClass.hoverSelected} ${className}`;
        }

        return `${sizeClass} ${variantClass.default} ${className}`;
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
    {#if icon}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
{/snippet}

{#snippet iconWithText()}
    {#if icon}
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
        class={`inline-flex items-center justify-center gap-2 rounded transition-colors ${combinedClass}`}
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
