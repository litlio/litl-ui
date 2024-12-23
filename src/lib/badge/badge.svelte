<script lang="ts">
  import type { BadgeProps } from './types.js';
  import { COLORS, VARIANTS, SIZES, ICON_SIZE_MAP, ICON_X_GAP_MAP } from './constants.js';

  let props: BadgeProps = $props();

  let {
    class: klass = '',
    color = 'neutral',
    variant = 'filled',
    size = 'md',
    icon = undefined,
    rounded = false,
    children,
    number = undefined,
  } = props;

  // Определяем классы для цвета и варианта
  let colorClass = $derived.by(() => COLORS[color] || COLORS.neutral);
  let variantClass = $derived.by(() => VARIANTS[variant] || VARIANTS.filled);
  let sizeClass = $derived.by(() => SIZES[size] || SIZES.md);
  let iconSize = ICON_SIZE_MAP[size] || ICON_SIZE_MAP.md;
  let iconXGap = $derived.by(() => ICON_X_GAP_MAP[size] || ICON_X_GAP_MAP.md);

  let badgeClass = $derived.by(() => `
    ${colorClass} 
    ${variantClass}
    ${sizeClass}
    ${rounded ? 'rounded-md' : 'rounded-full'}
  `);
</script>

{#snippet iconSnip()}
  {#if icon?.component}
    {@const Icon = icon.component}
    <span class="flex items-center" style="width: {iconSize}px; height: {iconSize}px;">
      <Icon size={iconSize} {...icon.props} />
    </span>
  {/if}
{/snippet}

{#snippet numberSnip()}
  {#if number !== undefined}
    <span 
      class={`text-white dark:text-black min-w-[20px] h-[20px] px-[6px] rounded-full flex items-center justify-center text-[12px] ${colorClass} ${klass}`}
    >
      {number}
    </span>
  {/if}
{/snippet}

{#snippet badgeContentSnip()}
  <span class="flex items-center {iconXGap}">
    {@render iconSnip()}
    {@render children()}
  </span>
{/snippet}

{#if number !== undefined}
  {@render numberSnip()}
{:else}
  <span class="flex items-center justify-center {badgeClass} {klass}">
    {@render badgeContentSnip()}
  </span>
{/if}


