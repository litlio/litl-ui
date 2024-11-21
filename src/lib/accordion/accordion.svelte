<script lang="ts">
	import { slide } from 'svelte/transition';
	import ChevronRight from '../icons/ChevronRight.svelte';

	let { code }: { code: string } = $props();

	let isActive = $state(false);

	const toggleFunc = () => {
		isActive = !isActive;
	};

	let rotate180 = $derived.by(() => (isActive ? 'rotate-90' : ''));
	let title = $derived.by(() => (isActive ? 'Hide code' : 'Show code'));
	let border = $derived.by(() => (isActive ? 'border-y' : 'border-t'));
</script>

<button
	onclick={toggleFunc}
	class="w-full h-[48px] px-4 text-neutral-900 hover:text-neutral-950 dark:text-white hover:dark:text-white bg-neutral-50 dark:bg-neutral-800 {border} border-neutral-200 dark:border-neutral-700"
>
	<div class="flex items-center gap-x-2">
		<div class="w-[16px] h-[16px] {rotate180} transform-gpu duration-200">
			<ChevronRight />
		</div>
		<span class="text-sm font-normal leading-[20px] first-letter:capitalize">{title}</span>
	</div>
</button>

{#if isActive}
	<div class="ui-scrollbar w-full h-auto px-6 text-neutral-950 dark:text-white text-[13px] scroll-smoth overflow-x-auto">
		<div transition:slide>
			<pre>
				<code>
					{code}
				</code>
			</pre>
		</div>
	</div>
{/if}
