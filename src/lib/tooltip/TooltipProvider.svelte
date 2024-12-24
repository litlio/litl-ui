<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	type TooltipProviderProps = {
		delayDuration?: number;
		children?: Snippet;
	};

	let { delayDuration = 0, children }: TooltipProviderProps = $props();

	// Создаем реактивное состояние через $state()
	let state = $state({ visible: false, delay: delayDuration });

	// Устанавливаем контекст для передачи состояния
	setContext('tooltipState', state);
</script>

<div>
	{#if children}
		{@render children()}
	{/if}
</div>



