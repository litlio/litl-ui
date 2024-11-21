<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const rootState = getContext<{
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
		setContentPosition: (x: number, y: number) => void;
	}>('contextMenu');

	const showMenu = (event: MouseEvent) => {
		event.preventDefault();
		
		const isMenuActive = rootState.getIsActive();
		if (isMenuActive) {
			rootState.setIsActive(false);
			return;
		}

		const { clientX: x, clientY: y } = event;
		rootState.setContentPosition(x, y);
		rootState.setIsActive(true);
	};
</script>

<div role="menu" oncontextmenu={showMenu} tabindex="0">
	{@render children()}
</div>
