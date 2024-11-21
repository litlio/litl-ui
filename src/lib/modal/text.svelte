<script lang="ts">
	import type { Snippet } from 'svelte';

	type propsT = {
		class?: string | undefined;
		children: Snippet | undefined;
	};

	let { class: klass = '', children }: propsT = $props();
</script>

{#if children}
	<p aria-describedby="modal-description" class="text-md text-neutral-950 dark:text-white leading-[20px] {klass}">
		{@render children()}
	</p>
{/if}