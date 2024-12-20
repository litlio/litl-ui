<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import { getContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type propsT = {
		value: string;
		children: Snippet;
	};
	let { value, children }: propsT = $props();

	
	const rootState = getContext<{
		getSelected: () => string;
		setSelected: (value: string) => void;
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
	}>('select');
</script>

<button
	onclick={() => {
		rootState.setSelected(value);
		rootState.setIsActive(false);
	}}
	class="relative w-full cursor-pointer bg-transparent transition-colors text-sm flex items-center rounded-sm py-1.5 px-2 hover:bg-neutral-100 hover:dark:bg-neutral-700"
>
	{#if rootState.getSelected() === value}
		<!--Icon-->
		<div transition:fade class="absolute right-2">
			<div class="w-full h-full flex items-center justify-center">
				<div class="w-[14px] h-[14px] text-neutral-950 dark:text-neutral-200">
					<Check size={16} />
				</div>
			</div>
		</div>
	{/if}
	<span class="first-letter:capitalize text-neutral-950 dark:text-neutral-200">
		{@render children()}
	</span>
</button>