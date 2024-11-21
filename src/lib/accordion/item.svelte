<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	type propsT = {
		size?: 'small' | 'medium' | 'large';
		value: string;
		defaultExpanded?: boolean;
		class?: string | undefined;
		children: Snippet | undefined;
	};
	let {
		size = 'medium',
		value = '',
		class: klass = '',
		defaultExpanded = false,
		children
	}: propsT = $props();

	setContext('collapseItem', {
		size: size,
		value: value,
		defaultExpanded: defaultExpanded
	});
</script>

<div class="w-full {klass}">
	{#if children}
		{@render children()}
	{/if}
</div>