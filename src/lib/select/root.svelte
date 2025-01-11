<script lang="ts">
	import { clickAnywhere, clickOutside } from '../utils/event.js';
	import { setContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createRootState } from './root.svelte.js';

	type propsT = {
		value?: string;
		size?: 'tiny' | 'small' | 'medium' | 'large' | undefined;
		class?: string;
		children: Snippet;
	};
	let { value = $bindable(''), size = 'medium', class: klass = '', children }: propsT = $props();


	const rootState = createRootState({
		isMobile: false,
		selected: '',
		isActive: false,
		size,
		contentPosition: 'top-[112%',
		transY: -10
	});

	setContext('select', rootState);

	$effect(() => {
		value = rootState.getSelected();
	});

	$effect(() => {
		if (window.innerWidth < 767) {
			rootState.setIsMobile(true);
		} else {
			rootState.setIsMobile(false);
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth < 767) {
				rootState.setIsMobile(true);
			} else {
				rootState.setIsMobile(false);
			}
		});
	});
</script>

{#if rootState.getIsActive()}
	<div
		in:fade|local
		out:fade|local
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.4] lg:hidden z-[1000]"
	></div>
{/if}

<div use:clickAnywhere={() => rootState.setIsActive(false)} class="relative inline-block {klass}">
    {@render children()}
</div>
