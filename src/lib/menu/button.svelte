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

	// Допустим, размеры меню (можно подстраивать или вычислять):
	const menuWidth = 200;
	const menuHeight = 250;

	// Небольшой вертикальный отступ между кнопкой и меню
	const offsetY = 8;

	function toggle(evt: Event) {
		const target = evt.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// -----------------------------
		// 1) Вертикальное положение
		// -----------------------------
		// По умолчанию "снизу" кнопки
		let top = rect.bottom + offsetY;
		let transY = -10; // для анимации "вылета" чуть сверху

		const spaceBelow = viewportHeight - rect.bottom;
		if (spaceBelow < menuHeight) {
			// Места снизу мало → открываем над кнопкой
			top = rect.top - menuHeight - offsetY;
			transY = 10;  // анимация прилетает снизу
		}

		// -----------------------------
		// 2) Горизонтальное положение
		// -----------------------------
		// Пытаемся "прилипнуть" к левой границе кнопки
		let left = rect.left;

		// Сколько места справа от левой границы:
		const spaceRight = viewportWidth - rect.left;
		if (spaceRight < menuWidth) {
			// Если справа нет места, прижимаемся к правой границе (раскрываемся влево)
			left = rect.right - menuWidth;
			// А вдруг button очень узкая и rect.right < menuWidth (у левого края)? 
			// Тогда проверим, чтобы всё равно не выскочило за экран:
			if (left < 0) left = 0; 
		}

		// Собираем финальный inline-стиль
		const styleStr = `top: ${top}px; left: ${left}px;`;

		// Применяем к меню
		rootState.setContentPosition(styleStr);
		rootState.setTransY(transY);

		// Открываем/закрываем
		rootState.setIsActive(!rootState.getIsActive());
	}
</script>

{#if children}
	<Button
		{...attributes}
		class={klass}
		variant={variant}
		onclick={toggle}
	>
		{@render children()}
	</Button>
{/if}


