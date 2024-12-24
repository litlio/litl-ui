<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	type TooltipTriggerProps = {
		children?: Snippet;
	};

	// Получаем состояние через контекст (обратите внимание на { delay: number }!)
	let tooltipState = getContext<{ visible: boolean; delay: number }>('tooltipState');
	let { children }: TooltipTriggerProps = $props();

	let showTimer: ReturnType<typeof setTimeout> | null = null;

	function showTooltip() {
		// Если задана задержка, используем setTimeout
		if (tooltipState.delay > 0) {
			// На всякий случай сбросим предыдущий таймер
			if (showTimer) clearTimeout(showTimer);

			showTimer = setTimeout(() => {
				tooltipState.visible = true;
			}, tooltipState.delay);
		} else {
			// Без задержки
			tooltipState.visible = true;
		}
	}

	function hideTooltip() {
		// Сбрасываем таймер, чтобы тултип не появился «задним числом», если пользователь быстро ушёл
		if (showTimer) clearTimeout(showTimer);

		tooltipState.visible = false;
	}
</script>

<div
	role="button"
	tabindex="0"
	aria-haspopup="true"
	aria-expanded={tooltipState.visible ? "true" : "false"}
	class="inline-block cursor-pointer"
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocus={showTooltip}
	onblur={hideTooltip}
>
	{#if children}
		{@render children()}
	{/if}
</div>






