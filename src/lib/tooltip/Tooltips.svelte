<script lang="ts">
    import type { Snippet } from 'svelte';
	// Описание ожидаемых пропсов
	type TooltipProviderProps = {
		delay?: number;
		children?: Snippet;
	};

	// Получение пропсов
	let { delay = 200, children }: TooltipProviderProps = $props();

	// Состояние для управления видимостью тултипа
	let tooltipState = $state({ visible: false, delay });

	// Реактивное обновление задержки
	$effect(() => {
		tooltipState.delay = delay;
	});
</script>

<div class="relative">
	{#if children}
		{@render children()}
	{/if}
</div>


