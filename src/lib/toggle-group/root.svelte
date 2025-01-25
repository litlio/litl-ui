<script lang="ts">
    import { setContext, type Snippet } from "svelte";

    type Props = {
        type?: "single" | "multiple";
        value?: string | string[];
        onChange?: (value: string | string[]) => void;
        disabled?: boolean;
        variant?: "ghost" | "outline";
        size?: "tiny" | "small" | "medium" | "large";
        rounded?: boolean;
        children?: Snippet;
    };

    let {
        type = "multiple",
        value = $bindable<string | string[]>([]),
        onChange,
        disabled = false,
        variant = "ghost",
        size = "medium",
        rounded = false,
        children,
    }: Props = $props();

    const toggleValue = (itemValue: string) => {
        if (disabled) return;

        let newValue: string | string[];
        
        if (type === "single") {
            newValue = value === itemValue ? "" : itemValue;
        } else {
            const currentValues = Array.isArray(value) ? value : [];
            newValue = currentValues.includes(itemValue)
                ? currentValues.filter(v => v !== itemValue)
                : [...currentValues, itemValue];
        }

        value = [...newValue];
        onChange?.(newValue);
    };

    setContext("toggle-group", {
        type,
        value,
        toggleValue,
        disabled,
        variant,
        size,
        rounded,
    });
</script>

<div class="flex gap-2 {disabled ? 'opacity-50 pointer-events-none' : ''}">
    {#if children}
        {@render children()}
    {/if}
</div>