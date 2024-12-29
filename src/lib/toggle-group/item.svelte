<script lang="ts">
	import { getContext } from "svelte";
	import Toggle from "$lib/toggle/toggle.svelte";
	import type { IconProps } from "$lib/types/ui.js";

	type propsT = {
		value: string;
		ariaLabel: string;
		disabled?: boolean;
		content?: IconProps;
	};

	let { value, ariaLabel, disabled, content }: propsT = $props();

	type ToggleGroupContext = {
		type: "single" | "multiple";
		value: string | string[];
		toggleValue: (value: string) => void;
		disabled?: boolean;
		variant: "ghost" | "outline";
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
>
	{#if content?.component}
		{@const IconComponent = content.component}
		<IconComponent {...content.props} />
	{/if}
</Toggle>

