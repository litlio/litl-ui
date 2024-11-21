<script lang="ts">
	import { type Snippet } from 'svelte';

	type propsT = {
		href: string;
		type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'warning';
		children?: Snippet | undefined;
	};
	let { href, type = 'outline', children = undefined }: propsT = $props();

	const typeObj = {
		primary: 'text-neutral-950 dark:text-neutral-200',
		secondary: 'text-neutral-950 dark:text-neutral-200',
		outline: 'text-neutral-950 dark:text-neutral-200',
		ghost: 'text-neutral-950 dark:text-neutral-200',
		error: 'text-red-600 dark:text-red-600',
		warning: 'text-amber-600 dark:text-amber-600'
	};
	let typeClass = $derived.by(() => {
		return typeObj[type];
	});
</script>

{#if children}
	<a
		{href}
		class="relative w-full cursor-pointer bg-transparent transition-colors text-sm flex items-center rounded-md py-3.5 lg:py-2.5 px-2 hover:bg-neutral-100 hover:dark:bg-neutral-700"
	>
		<span class="first-letter:capitalize {typeClass}">
			{@render children()}
		</span>
	</a>
{/if}