<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	type TooltipContentProps = {
		position?: 'top' | 'bottom' | 'left' | 'right';
		class?: string;
		children?: Snippet;
		showArrow?: boolean;
	};

	let {
		position = 'top',
		class: klass = '',
		children,
		showArrow = false
	}: TooltipContentProps = $props();

	let tooltipState = getContext<{ visible: boolean }>('tooltipState');

	const positionClasses = {
		top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
	};

	const arrowSizeVertical = 'border-6';
	const arrowSizeHorizontal = 'border-4';

	const arrowClasses = {
		top: `
			absolute left-1/2 transform -translate-x-1/2
			bottom-0 translate-y-full
			${arrowSizeVertical} border-transparent
			border-t-neutral-900 dark:border-t-neutral-50
		`,
		bottom: `
			absolute left-1/2 transform -translate-x-1/2
			top-0 -translate-y-full
			${arrowSizeVertical} border-transparent
			border-b-neutral-900 dark:border-b-neutral-50
		`,
		left: `
			absolute top-1/2 transform -translate-y-1/2
			right-0 translate-x-full
			${arrowSizeHorizontal} border-transparent
			border-l-neutral-900 dark:border-l-neutral-50
		`,
		right: `
			absolute top-1/2 transform -translate-y-1/2
			left-0 -translate-x-full
			${arrowSizeHorizontal} border-transparent
			border-r-neutral-900 dark:border-r-neutral-50
		`,
	};
</script>

{#if tooltipState.visible}
	<div
		role="tooltip"
		class={`
			absolute
			w-max
			text-sm
			bg-neutral-900 text-white
			dark:bg-neutral-50 dark:text-black
			px-2 py-1
			rounded-lg shadow-sm
			z-50
			max-w-[280px]
			whitespace-normal
			${positionClasses[position]}
			${klass}
		`}
	>
		{#if children}
			{@render children()}
		{/if}

		{#if showArrow}
			<div class={arrowClasses[position]}></div>
		{/if}
	</div>
{/if}