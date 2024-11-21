<script lang="ts">
	import type { Snippet } from 'svelte';

	type propsT = {
		class?: string | undefined;
		children: Snippet | undefined;
	};

	let { class: klass = '', children }: propsT = $props();
</script>

{#if children}
	<h3
		class="text-[20px] text-neutral-950 dark:text-white leading-[32px] font-semibold {klass}"
	>
		{@render children()}
	</h3>
{/if}