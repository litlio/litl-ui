<script lang="ts">
	import { clickAnywhere } from '../utils/event.js';
	import { fade } from 'svelte/transition';
	import { createRootState } from './root.svelte.js';
	import { setContext, type Snippet } from 'svelte';

	type propsT = {
		class?: string | undefined;
		alignment?: 'left' | 'right' | undefined;
		children: Snippet | undefined;
	};
	let { class: klass = '', alignment = 'left', children = undefined }: propsT = $props();

	// Инициализация состояния
	const rootState = createRootState({
		isMobile: false,     // ← Мобильную логику временно отключаем
		isActive: false,
		alignment: alignment,
		contentPosition: 'top-[112%]',
		transY: -10
	});

	setContext('menu', rootState);

	// Закомментируем эффект, который вычислял "isMobile"
	/*
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
	*/
	
</script>

<!-- 
// Закомментируем код показа "мобильной" подложки
{#if rootState.getIsActive() && rootState.getIsMobile()}
	<div
		in:fade|local
		out:fade|local
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.4] z-[1000]"
	></div>
{/if}
-->

<!-- Теперь остаётся только контейнер для "клика снаружи" и children -->
<div use:clickAnywhere={() => rootState.setIsActive(false)} class="relative inline-block {klass}">
	{#if children}
		{@render children()}
	{/if}
</div>
