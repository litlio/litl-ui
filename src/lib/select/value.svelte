<script lang="ts">
	import ChevronDown from '../icons/ChevronDown.svelte';
	import { getContext } from 'svelte';

	type propsT = {
		placeholder?: string;
	};
	let { placeholder = 'placeholder' }: propsT = $props();

	const rootState = getContext<{
		getSelected: () => string;
		getIsActive: () => boolean;
	}>('select');

	let rotate = $derived(rootState.getIsActive() ? 'rotate-180' : '');
</script>

<span class="text-sm first-letter:capitalize text-neutral-950 dark:text-neutral-200"
	>{rootState.getSelected() === '' ? placeholder : rootState.getSelected()}</span
>
<div class="w-[16px] h-[16px] flex items-center justify-center">
	<div class="w-[16px] h-[16px] text-neutral-900 hover:text-neutral-950 dark:text-neutral-500 hover:dark:text-neutral-500 transform duration-300 {rotate}">
		<ChevronDown/>
	</div>
</div>