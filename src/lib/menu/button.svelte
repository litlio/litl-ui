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

	const toggle = (evt: Event) => {
		const target = evt.currentTarget as HTMLElement;
		const position = target.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Определяем вертикальное позиционирование
		const positionFromTop = position.top;
		const positionFromBottom = viewportHeight - position.bottom;

		if (positionFromTop > positionFromBottom) {
			rootState.setContentPosition(`bottom-[112%]`);
			rootState.setTransY(10);
		} else {
			rootState.setContentPosition(`top-[112%]`);
			rootState.setTransY(-10);
		}

		// Определяем горизонтальное позиционирование
		const menuWidth = 200; // Ширина меню (задаётся в Tailwind)
		if (position.left + menuWidth > viewportWidth) {
			// Меню выходит за правый край
			rootState.setContentPosition(`top-[112%] right-0`);
		} else if (position.right - menuWidth < 0) {
			// Меню выходит за левый край
			rootState.setContentPosition(`top-[112%] left-0`);
		} else {
			// Оставляем меню выровненным относительно триггера
			rootState.setContentPosition(`top-[112%]`);
		}

		rootState.setIsActive(!rootState.getIsActive());
	};
</script>

{#if children}
	<Button {...attributes} class={klass} variant={variant} onclick={toggle}>
		{@render children()}
	</Button>
{/if}
