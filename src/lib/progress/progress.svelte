<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	type propsT = {
		type?: 'success' | 'error' | 'warning' | 'secondary' | undefined;
		value?: number | undefined;
	};
	let { type = undefined, value = 0 }: propsT = $props();

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	let widthClass = $derived.by(() => {
		progress.set(value);
		return 'width:' + $progress + '%';
	});

	const typeObj = {
		success: 'bg-blue-500 dark:bg-blue-500',
		error: 'bg-red-500 dark:bg-red-500',
		warning: 'bg-amber-500 dark:bg-amber-500',
		secondary: 'bg-neutral-900 dark:bg-neutral-200'
	};
	let progressClass = $derived.by(() => {
		if (type) {
			return typeObj[type];
		}
		return `bg-neutral-900 dark:bg-neutral-200 bg-v-200`;
	});
</script>

<div class="w-full">
	<div class="w-full h-2.5 dark:bg-neutral-800 bg-neutral-200 rounded-full">
		<div class="h-2.5 {progressClass} rounded-full" style={widthClass}></div>
	</div>
</div>