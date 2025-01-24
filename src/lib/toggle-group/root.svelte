<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	type propsT = {
		type?: "single" | "multiple";
		value?: string | string[];
		onChange?: (value: string | string[]) => void;
		disabled?: boolean;
		variant?: "ghost" | "outline";
		size?: "tiny" | "small" | "medium" | "large";
		rounded?: boolean;
		children: Snippet | undefined;
	};

	let {
		type = "multiple",
		value = $bindable<string | string[]>(),
		onChange = () => {},
		disabled = false,
		variant = "ghost",
		size = "medium",
		rounded = false,
		children,
	}: propsT = $props();

	let internalValue = $state(
		type === "single" ? (typeof value === "string" ? value : "") : Array.isArray(value) ? value : []
	);

	const updateValue = (itemValue: string) => {
		if (disabled) return;

		if (type === "single") {
			internalValue = internalValue === itemValue ? "" : itemValue;
		} else {
			internalValue = Array.isArray(internalValue)
				? internalValue.includes(itemValue)
					? internalValue.filter((val) => val !== itemValue)
					: [...internalValue, itemValue]
				: [];
		}

		onChange?.(internalValue);
	};

	setContext("toggle-group", {
		type,
		get value() {
			return internalValue;
		},
		toggleValue: updateValue,
		disabled,
		variant,
		size,
		rounded,
	});
</script>

<div class={`flex space-x-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
	{#if children}
		{@render children()}
	{/if}
</div>