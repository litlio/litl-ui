<script lang="ts">
	import { getContext } from "svelte";
	import Toggle from "$lib/toggle/toggle.svelte";
	import type { IconProps } from "$lib/types/ui.js";
	import { type Snippet } from "svelte";

	type propsT = {
		value: string;
		ariaLabel: string;
		disabled?: boolean;
		icon?: IconProps;
		children?: Snippet;
	};

	let { value, ariaLabel, disabled, icon, children }: propsT = $props();

	type ToggleGroupContext = {
		type: "single" | "multiple";
		value: string | string[];
		toggleValue: (value: string) => void;
		disabled?: boolean;
		variant: "ghost" | "outline";
		size: "tiny" | "small" | "medium" | "large";
		rounded?: boolean;
	};

	const toggleGroup = getContext<ToggleGroupContext>("toggle-group");

	let isSelected = $derived(() => {
		if (toggleGroup.type === "single") {
			return toggleGroup.value === value;
		}
		return Array.isArray(toggleGroup.value) && toggleGroup.value.includes(value);
	});

	let isDisabled = $derived(() => toggleGroup.disabled || disabled || false);

	const handleClick = () => {
		if (!isDisabled()) {
			toggleGroup.toggleValue(value);
		}
	};

</script>

<Toggle
	isSelected={isSelected()}
	ariaLabel={ariaLabel}
	onClick={handleClick}
	disabled={isDisabled()}
	variant={toggleGroup.variant}
	size={toggleGroup.size}
	rounded={toggleGroup.rounded}
>
	{#if icon?.component}
		{@const IconComponent = icon.component}
		<IconComponent {...icon.props} />
	{/if}
	{#if typeof children === "function"}
		<span>{@render children()}</span>
	{:else if children}
		<span>{children}</span>
	{/if}
</Toggle>



