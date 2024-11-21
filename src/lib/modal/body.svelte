<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	type propsT = {
		class?: string;
		children: Snippet | undefined;
	};

	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		sticky: boolean;
	}>('modal');

	let bodyClass = $derived.by(() => {
		return rootState.sticky ? '' : '';
	});
</script>

{#if children}
	<div class="relative h-full {bodyClass} {klass}">
		{#if rootState.sticky}
			<div aria-hidden="true" class="w-full h-[73px]"></div>
		{/if}
		<div 
			class="
				modal-body p-6 scroll-smooth overflow-y-auto overscroll-contain 
				max-h-[calc(80vh-146px)] lg:max-h-[calc(626px-146px)]
			"
		>
			{@render children()}
		</div>
		<div aria-hidden="true" class="w-full lg:h-[73px]"></div>
	</div>
{/if}
