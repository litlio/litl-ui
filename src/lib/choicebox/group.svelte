<script lang="ts">
	import { randomString } from '$lib/utils/random.js';
	import { setContext, type Snippet } from 'svelte';
	import { createGroupState } from './group.svelte.js';

	type propsT = {
		type?: 'radio' | 'checkbox' | undefined;
		label?: string | undefined;
		value?: string | Array<string> | undefined;
		disabled?: boolean | undefined;
		children?: Snippet | undefined;
	};
	let {
		type = 'radio',
		label = undefined,
		value = $bindable(''),
		disabled = false,
		children = undefined
	}: propsT = $props();

	const groupState = createGroupState({
		selected: '',
		name: randomString(8),
		type: type,
		disabledParent: disabled
	});

	setContext('choicebox', groupState);

	let labelClass = $derived.by(() => {
		if (disabled) {
			return 'text-neutral-900 dark:text-neutral-900';
		}
		return 'text-neutral-950 dark:text-neutral-950';
	});

	$effect(() => {
		value = groupState.get();
	});
</script>

<div class="w-full">
	{#if label}
		<div class="text-[13px] mb-[8px] first-letter:capitalize {labelClass} ">
			{label}
		</div>
	{/if}
	<div class="w-full flex gap-x-4">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>