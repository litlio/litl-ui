<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	type propsT = {
		class?: string;
		children: Snippet;
	};
	let { class: klass = '', children }: propsT = $props();

	const rootState = getContext<{
		size: 'tiny' | 'small' | 'medium' | 'large';
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
		setContentPosition: (value: string) => void;
		setTransY: (value: number) => void;
	}>('select');

	const toogle = (evt: Event) => {
		const target = evt.currentTarget as HTMLInputElement;
		const position = target.getBoundingClientRect();

		const viewportHeight = window.innerHeight;

		const positionFromTop = position.top;
		const positionFromBottom = viewportHeight - position.bottom;

		if (positionFromTop > positionFromBottom) {
			rootState.setContentPosition(`bottom-[112%]`);
			rootState.setTransY(10);
		} else {
			rootState.setContentPosition(`top-[112%]`);
			rootState.setTransY(-10);
		}
		rootState.setIsActive(!rootState.getIsActive());
	};

	const sizeObj = {
		tiny: 'h-[24px] text-xs leading-3',
		small: 'h-[32px] px-[6px] text-sm leading-4',
		medium: 'h-[40px] px-[10px] text-sm leading-[20px]',
		large: 'h-[48px] px-[14px] text-base leading-[24px]'
	};
	let sizeClass = $derived.by(() => {
		return sizeObj[rootState.size];
	});
</script>

<button
	type="button"
	onclick={toogle}
	class="group w-full {sizeClass} flex items-center justify-between rounded-[6px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 {klass} "
>
	{@render children()}
</button>