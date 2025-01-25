<script lang="ts">
    import { getContext } from "svelte";
    import Toggle from "$lib/toggle/toggle.svelte";
    import type { IconProps } from "$lib/types/ui.js";
    import type { Snippet } from "svelte";

    type Props = {
        value: string;
        ariaLabel: string;
        disabled?: boolean;
        icon?: IconProps;
        children?: Snippet;
    };

    let { value, ariaLabel, disabled = false, icon, children }: Props = $props();

    type Context = {
        type: "single" | "multiple";
        value: string | string[];
        toggleValue: (value: string) => void;
        disabled: boolean;
        variant: "ghost" | "outline";
        size: "tiny" | "small" | "medium" | "large";
        rounded: boolean;
    };

    const context = getContext<Context>("toggle-group");

    // Исправлено: убрана функция-обертка
    let isSelected = $derived(
        context.type === "single"
            ? context.value === value
            : Array.isArray(context.value) && context.value.includes(value)
    );

    let isDisabled = $derived(context.disabled || disabled);

    const handleClick = () => {
        if (!isDisabled) {
            context.toggleValue(value);
        }
    };
</script>

<Toggle
    isSelected={isSelected}
    {ariaLabel}
    onClick={handleClick}
    {disabled}
    variant={context.variant}
    size={context.size}
    rounded={context.rounded}
>
    {#if icon?.component}
        {@const Icon = icon.component}
        <Icon {...icon.props} />
    {/if}
    
    {#if children}
        {#if typeof children === "function"}
            <span>{@render children()}</span>
        {:else}
            <span>{children}</span>
        {/if}
    {/if}
</Toggle>