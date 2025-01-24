<script lang="ts">
    import { type Snippet } from "svelte";
    import type { IconProps } from '$lib/types/ui.js';

    /** Параметры пропсов */
    type propsT = {
        isSelected?: boolean;
        onClick?: (isSelected: boolean) => void;
        ariaLabel?: string;
        className?: string;
        disabled?: boolean;
        size?: 'tiny' | 'small' | 'medium' | 'large';
        variant?: 'ghost' | 'outline';
        icon?: IconProps;
        rounded?: boolean;         // Если true → делает "rounded-full"
        children?: Snippet;       // Можно передать текст или слот
    };

    /** Деструктуризация пропсов */
    let {
        isSelected = $bindable(false),
        onClick = undefined,
        ariaLabel = undefined,
        className = '',
        disabled = false,
        size = 'medium',
        variant = 'ghost',
        icon = undefined,
        rounded = false,
        children,
    }: propsT = $props();

    /** Внутренний стейт: выбран или нет */
    let selectedState = $state(isSelected);

    /**
     * 1) Настраиваем шрифты/лидинг для разных размеров:
     *    tiny, small, medium, large
     */
    const typographySizes = {
        tiny:   'text-xs leading-3',
        small:  'text-sm leading-4',
        medium: 'text-sm leading-[20px]',
        large:  'text-base leading-[24px]',
    };

    /**
     * 2) Настраиваем «числовые» размеры.
     *    - Для кнопок с иконкой-only: w/h
     *    - Для кнопок с текстом: только h, а ширина растёт от контента + небольшие паддинги
     */
    const dimensions = {
        tiny:   { h: 28, w: 28, px:  8  },  // px-2
        small:  { h: 32, w: 32, px: 12 },  // px-3
        medium: { h: 36, w: 36, px: 10 },  // px-[10px]
        large:  { h: 40, w: 40, px: 12 },  // px-[12px]
    };

    /**
     * 3) Variant-классы (ghost / outline) для default / selected / hoverSelected
     */
    const variantClasses = {
        ghost: {
            default:       'text-neutral-950 dark:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:bg-neutral-300 dark:hover:bg-neutral-600',
        },
        outline: {
            default:       'text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700',
            selected:      'border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-200',
            hoverSelected: 'hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-600',
        },
    };

    /**
     * 4) Disabled + Selected стили
     */
    const disabledSelectedClasses = {
        ghost:   'bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
        outline: 'border-neutral-400 dark:border-neutral-600 bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
    };

    /**
     * 5) "Собираем" финальный класс кнопки.
     *    Логика:
     *    - Если только иконка (без children), делаем ровно w/h = 36×36 (или другие размеры).
     *    - Иначе (текст), делаем высоту 36, ширина "авто" с min-width (при желании).
     */
    let combinedClass = $derived.by(() => {
        const t = typographySizes[size] ?? '';
        const { h, w, px } = dimensions[size] ?? {h: 36, w: 36, px: 10};

        // 1) "форма" кнопки
        // Иконка-only: жёстко w/h = X
        // Текст: высота = X, ширина — авто, с паддингами по бокам
        let shapeClass = '';

        if (icon && !children) {
            // Иконка-only
            shapeClass = `
                box-border
                flex items-center justify-center
                w-[${w}px] h-[${h}px]
                p-0
            `;
        } else {
            // Текст / иконка+текст
            // Допустим, хотим высоту X, 
            // а ширина растягивается, минимум 36px (если нужно).
            // Можно убрать min-w, если не хотим фиксировать минимум.
            shapeClass = `
                box-border
                flex items-center justify-center
                h-[${h}px]
                min-w-[36px]
                px-[${px}px]
            `;
        }

        // 2) Округление
        const roundClass = rounded ? 'rounded-full' : 'rounded';

        // 3) Стили варианта
        const v = variantClasses[variant];

        // 4) Собираем
        if (disabled) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${disabledSelectedClasses[variant]}
                ${roundClass}
                ${shapeClass}
                ${className}
            `;
        }

        if (selectedState) {
            return `
                inline-flex items-center justify-center gap-2 transition-colors
                ${t}
                ${v.selected}
                ${v.hoverSelected}
                ${roundClass}
                ${shapeClass}
                ${className}
            `;
        }

        // default
        return `
            inline-flex items-center justify-center gap-2 transition-colors
            ${t}
            ${v.default}
            ${roundClass}
            ${shapeClass}
            ${className}
        `;
    });

    /**
     * 6) Предупреждение, если нет ariaLabel
     */
    $effect(() => {
        if (!ariaLabel) {
            console.warn('Accessibility: Please provide a valid "ariaLabel" for Toggle.');
        }
    });

    /**
     * 7) Обработка клика
     */
    function handleClick() {
        if (!disabled) {
            selectedState = !selectedState;
            onClick?.(selectedState);
        }
    }
</script>

<!-- Шаблоны для рендеринга иконки / иконки+текста -->
{#snippet iconOnly()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
{/snippet}

{#snippet iconWithText()}
    {#if icon?.component}
        {@const IconComponent = icon.component}
        <IconComponent size={16} {...icon.props} />
    {/if}
    {#if typeof children === 'function'}
        <span>{@render children()}</span>
    {/if}
{/snippet}

<!-- Основная кнопка -->
{#snippet toggleButton()}
    <button
        type="button"
        class={combinedClass}
        aria-pressed={selectedState}
        {disabled}
        onclick={handleClick}
    >
        {#if icon && typeof children === 'function'}
            {@render iconWithText()}
        {:else if icon}
            {@render iconOnly()}
        {:else if typeof children === 'function'}
            <span>{@render children()}</span>
        {/if}
    </button>
{/snippet}

<!-- Рендерим сам toggleButton -->
<div>
    {@render toggleButton()}
</div>