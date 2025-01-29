<script lang="ts">
    import { getContext } from "svelte";
    import Toggle from "$lib/toggle/toggle.svelte";
    import type { Snippet } from "svelte";
    import type { IconProps } from "$lib/types/ui.js";

    /**
     * Context received from Root.svelte
     */
    type ToggleGroupContext = {
        type: "single" | "multiple";
        value: string | string[];
        toggleValue: (value: string) => void;
        disabled: boolean;
        variant: "ghost" | "outline";
        size: "tiny" | "small" | "medium" | "large";
        rounded: boolean;
        mode?: 'auto' | 'iconOnly' | 'iconWithText' | 'textOnly';
        className?: string;
    };

    const context = getContext<ToggleGroupContext>("toggle-group");

    /**
     * Props for a specific Item.
     * It should support ALL Toggle props (except isSelected / onClick, 
     * since selection logic is handled by the group).
     */
    type ItemProps = {
        /** Unique value used by the group to determine selection */
        value: string;
        /** ariaLabel for the button */
        ariaLabel?: string;
        /** Local disabled state for this item (can override group-level disabled) */
        disabled?: boolean;
        /** Icon, if needed */
        icon?: IconProps;
        /** Rounded shape — if we want to override it */
        rounded?: boolean;
        /** Variant (ghost/outline) — if we want to override it */
        variant?: "ghost" | "outline";
        /** Size (tiny/small/medium/large) */
        size?: "tiny" | "small" | "medium" | "large";
        /** Mode: if we want to change auto/iconOnly/... */
        mode?: 'auto' | 'iconOnly' | 'iconWithText' | 'textOnly';
        /** Additional classes */
        className?: string;
        /** Child Snippet, if text/additional markup is needed */
        children?: Snippet;
    };

    let {
        value,
        ariaLabel = "",
        disabled = false,
        icon,
        rounded,
        variant,
        size,
        mode,
        className = "",
        children,
    }: ItemProps = $props();

    /**
     * Compute "isSelected" based on the group
     */
    let isSelected = $derived(
        context.type === "single"
            ? context.value === value
            : Array.isArray(context.value) && context.value.includes(value)
    );

    /**
     * Compute the final disabled state: 
     * if the group is disabled or the item is locally disabled = true,
     * the button will be unavailable
     */
    let isDisabled = $derived(context.disabled || disabled);

    /**
     * On click, call toggleValue from the context
     */
    function handleClick() {
        if (!isDisabled) {
            context.toggleValue(value);
        }
    }

    /**
     * Form the final props for <Toggle>, considering priority:
     * - local Item props (if provided)
     * - otherwise, props from the context
     */
    let finalVariant   = $derived(variant   ?? context.variant);
    let finalSize      = $derived(size      ?? context.size);
    let finalRounded   = $derived(rounded   ?? context.rounded);
    // If you want to support mode globally, do the same:
    // let finalMode = $derived(mode ?? context.mode);
    // let finalClassName = ... // if needed

</script>

<!-- Now render <Toggle>, passing all required props -->
<Toggle
    isSelected={isSelected}
    onClick={handleClick}
    disabled={isDisabled}
    ariaLabel={ariaLabel}
    {icon}
    size={finalSize}
    variant={finalVariant}
    rounded={finalRounded}
    className={className}
    mode={mode}
>
    {#if typeof children === "function"}
        <!-- Render Snippet -->
        {@render children()}
    {/if}
</Toggle>