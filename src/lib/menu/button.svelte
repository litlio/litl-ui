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

    // Увеличим offsetY для лучшего визуального разделения
    const offsetY = 8;
    // Добавим offsetX для минимального отступа от краев экрана
    const offsetX = 8;

    function toggle(evt: Event) {
        const target = evt.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Вертикальное позиционирование
        let top: number;
        let transY: number;
        const spaceBelow = viewportHeight - rect.bottom - offsetY;
        const spaceAbove = rect.top - offsetY;

        // Выбираем направление с максимальным доступным пространством
        if (spaceBelow >= menuHeight || spaceBelow > spaceAbove) {
            top = rect.bottom + offsetY;
            transY = -10;
        } else {
            top = rect.top - menuHeight - offsetY;
            transY = 10;
        }

        // Горизонтальное позиционирование
        const buttonCenterX = rect.left + rect.width / 2;
        let left = buttonCenterX - menuWidth / 2;

        // Корректировка для правого края
        if (left + menuWidth > viewportWidth - offsetX) {
            left = viewportWidth - menuWidth - offsetX;
        }
        
        // Корректировка для левого края
        if (left < offsetX) {
            left = offsetX;
        }

        // Применяем позиционирование
        rootState.setContentPosition(`top: ${top}px; left: ${left}px;`);
        rootState.setTransY(transY);
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


