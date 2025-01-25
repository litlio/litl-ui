<script lang="ts">
	import Button from "../button/button.svelte";
	import { getContext, type Component, type Snippet } from 'svelte';

	type propsT = {
		onclick?: (evt: Event) => void;
		class?: string;
		'aria-label'?: string;
		shape?: 'circle' | 'square' | undefined;
		size?: 'tiny' | 'small' | 'medium' | 'large';
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'error' | 'warning';
		prefix?: Component | undefined;
		suffix?: Component | undefined;
		rounded?: boolean;
		loading?: boolean;
		disabled?: boolean;
		children: Snippet;
	};
	let { children, variant = 'primary', ...attributes }: propsT = $props();
</script>

{#if children}
	<Button {...attributes} variant={variant}>
		{@render children()}
	</Button>
{/if}