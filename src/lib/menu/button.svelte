<script lang="ts">
	import Button from '../button/button.svelte';
	import { getContext, type Component, type Snippet } from 'svelte';

	type IconProps = {
		component: any;
		props?: Record<string, any>;
	};

	type propsT = {
		class?: string | undefined;
		'aria-label'?: string;
		shape?: 'circle' | 'square' | undefined;
		size?: 'tiny' | 'small' | 'medium' | 'large';
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'warning';
		prefix?: Component | IconProps | undefined;
		suffix?: Component | IconProps | undefined;
		rounded?: boolean;
		loading?: boolean;
		disabled?: boolean;
		children: Snippet | undefined;
	};
	let { class: klass = '', variant = 'primary', children, ...attributes }: propsT = $props();

	const rootState = getContext<{
		getIsActive: () => boolean;
		setIsActive: (value: boolean) => void;
		setContentPosition: (value: string) => void;
		setTransY: (value: number) => void;
	}>('menu');

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
</script>

{#if children}
	<Button {...attributes} class={klass} variant={variant} onclick={toogle}>
		{@render children()}
	</Button>
{/if}