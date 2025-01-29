<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { IconProps } from '$lib/types/ui.js';

    /**
     * Display mode (determines the shape and presence/absence of text):
     *  - 'auto' (default): calculated automatically based on whether icon and/or children are present
     *  - 'iconOnly': always a circle/square without side padding
     *  - 'iconWithText': icon + text, width is flexible
     *  - 'textOnly': only text, width is flexible
     */
    type ToggleMode = 'auto' | 'iconOnly' | 'iconWithText' | 'textOnly';

    type PropsT = {
        /** Whether the toggle is active */
        isSelected?: boolean;
        /** Click handler: (isSelected) => void */
        onClick?: (isSelected: boolean) => void;
        /** aria-label for accessibility, should be provided */
        ariaLabel?: string;
        /** Additional classes (Tailwind or any other) */
        className?: string;
        /** Disabled state */
        disabled?: boolean;
        /** Button size */
        size?: 'tiny' | 'small' | 'medium' | 'large';
        /** Style variant (transparent or outlined) */
        variant?: 'ghost' | 'outline';
        /** Icon (should be an object { component, props }) */
        icon?: IconProps;
        /** Rounded corners (rounded-full) or just rounded */
        rounded?: boolean;
        /** Text/content passed as a Snippet (function) */
        children?: Snippet;
        /** Mode: auto | iconOnly | iconWithText | textOnly */
        mode?: ToggleMode;
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
        mode = 'auto',
    }: PropsT = $props();

    // Selection state
    let selectedState = $state(isSelected);

    // Typographic sizes (Tailwind classes)
    const typographySizes = {
        tiny:   'text-xs leading-3',
        small:  'text-sm leading-4',
        medium: 'text-sm leading-[20px]',
        large:  'text-base leading-[24px]',
    };

    // Height/width + padding sizes
    const dimensions = {
        tiny:   { h: 'h-7', w: 'w-7', px: 'px-2',  minw: 'min-w-7' },
        small:  { h: 'h-8', w: 'w-8', px: 'px-3',  minw: 'min-w-8' },
        medium: { h: 'h-9', w: 'w-9', px: 'px-[10px]', minw: 'min-w-9' },
        large:  { h: 'h-10', w: 'w-10', px: 'px-3', minw: 'min-w-10' },
    };

    // Styles for ghost/outline in different states
    const variantClasses = {
        ghost: {
            default:       'text-neutral-950 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:bg-neutral-100 dark:hover:bg-neutral-700',
        },
        outline: {
            default:       'text-neutral-950 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 border border-neutral-200 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700',
        },
    };

    // Styles when the button is disabled
    const disabledSelectedClasses = {
        ghost:   'bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
        outline: 'border-neutral-400 dark:border-neutral-600 bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
    };

    /**
     * Helper function to determine the final mode when mode='auto'.
     */
    function resolveFinalMode(
        m: ToggleMode,
        hasIcon: boolean,
        hasChildren: boolean
    ): Exclude<ToggleMode, 'auto'> {
        if (m !== 'auto') {
            return m as Exclude<ToggleMode, 'auto'>;
        }
        // Auto logic
        if (hasIcon && hasChildren) return 'iconWithText';
        if (hasIcon && !hasChildren) return 'iconOnly';
        return 'textOnly';
    }

    // General class for <button>
    let combinedClass = $derived.by(() => {
        const t   = typographySizes[size] ?? '';
        const dim = dimensions[size]      ?? dimensions['medium'];

        // Mode (iconOnly / iconWithText / textOnly)
        const finalMode = resolveFinalMode(mode, !!icon, typeof children === 'function');

        // Base classes for shape
        let shapeClasses = `box-border flex items-center justify-center ${dim.h}`;

        // Rounded corners (fully rounded vs regular)
        let roundClass = rounded ? 'rounded-full' : 'rounded';

        // Width and padding settings depending on mode
        switch (finalMode) {
            case 'iconOnly':
                shapeClasses += ` ${dim.w} p-0`;    // Fixed width, no side padding
                break;
            case 'iconWithText':
            case 'textOnly':
                shapeClasses += ` ${dim.minw} ${dim.px}`;  // min-width + px
                break;
        }

        // Select styles based on variant
        const v = variantClasses[variant];

        // Disabled
        if (disabled) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${disabledSelectedClasses[variant]}
                ${roundClass}
                ${shapeClasses}
                ${className}
            `;
        }

        // Selected
        if (selectedState) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${v.selected}
                ${v.hoverSelected}
                ${roundClass}
                ${shapeClasses}
                ${className}
            `;
        }

        // Default (unselected) state
        return `
            inline-flex items-center justify-center gap-2 transition-colors
            ${t}
            ${v.default}
            ${roundClass}
            ${shapeClasses}
            ${className}
        `;
    });

    // Warning if ariaLabel is not provided
    $effect(() => {
        if (!ariaLabel) {
            console.warn('Accessibility: Please provide a valid "ariaLabel" for Toggle.');
        }
    });

    // Click handler: toggles state + calls onClick if provided
    function handleClick() {
        if (!disabled) {
            selectedState = !selectedState;
            onClick?.(selectedState);
        }
    }
</script>

<!-- Snippet for "icon only" -->
{#snippet iconOnly()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
{/snippet}

<!-- Snippet for "icon + text" -->
{#snippet iconWithText()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
    {#if typeof children === 'function'}
        <span>{@render children()}</span>
    {/if}
{/snippet}

<!-- Snippet for "text only" -->
{#snippet textOnly()}
    {#if typeof children === 'function'}
        <span>{@render children()}</span>
    {/if}
{/snippet}

<!-- Main button -->
{#snippet toggleButton()}
    <button
        type="button"
        class={combinedClass}
        aria-pressed={selectedState}
        {disabled}
        onclick={handleClick}
    >
        {#if mode === 'iconOnly' || (mode === 'auto' && icon && !children) }
            {@render iconOnly()}
        {:else if mode === 'iconWithText' || (mode === 'auto' && icon && children) }
            {@render iconWithText()}
        {:else}
            {@render textOnly()}
        {/if}
    </button>
{/snippet}

<!-- Final render -->
<div>
    {@render toggleButton()}
</div>