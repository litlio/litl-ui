<script lang="ts">
    import { setContext, type Snippet } from "svelte";

    /**
     * Props for the root component ToggleGroup
     */
    type Props = {
        type?: "single" | "multiple";
        /** Current value (string or an array of strings for multiple selection) */
        value?: string | string[];
        /** Callback triggered when selected values change */
        onChange?: (value: string | string[]) => void;

        /** Disables the entire group */
        disabled?: boolean;
        /** Style variant (ghost / outline) */
        variant?: "ghost" | "outline";
        /** Button size */
        size?: "tiny" | "small" | "medium" | "large";
        /** Rounded shape */
        rounded?: boolean;
        /** Slot/Snippet for rendering `<ToggleGroup.Item>` */
        children?: Snippet;
        /**
         * mode? className? ...
         * If you want to set a common mode/className for all Items, add them here.
         */
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

    /**
     * Function called by each Item to "toggle" its value
     */
    function toggleValue(itemValue: string) {
        if (disabled) return;

        if (type === "single") {
            // If already selected, deselect it; otherwise, select itemValue
            value = value === itemValue ? "" : itemValue;
            onChange?.(value);
        } else {
            // multiple selection
            const currentValues = Array.isArray(value) ? value : [];
            const isChecked = currentValues.includes(itemValue);
            let newArr: string[];
            if (isChecked) {
                newArr = currentValues.filter((v) => v !== itemValue);
            } else {
                newArr = [...currentValues, itemValue];
            }
            value = [...newArr]; // assign new value
            onChange?.(newArr);
        }
    }

    // Pass a set of common group properties + toggleValue function into the context
    setContext("toggle-group", {
        type,
        value,
        toggleValue,
        disabled,
        variant,
        size,
        rounded,
        // If needed, you can add mode, className, etc.
    });
</script>

<!-- Wrapper around all Items -->
<div class="flex gap-2 {disabled ? 'opacity-50 pointer-events-none' : ''}">
    {#if children}
        {@render children()}
    {/if}
</div>