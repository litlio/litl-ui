<script lang="ts">
    import type { BadgeProps } from './types.js';
    import { VARIANTS, SIZES, ICON_SIZE_MAP, ICON_X_GAP_MAP } from './constants.js';
  
    let props: BadgeProps = $props();
  
    let {
      class: klass = '',
      variant = 'neutral',
      size = 'md',
      icon = undefined,
      children
    } = props;
  
    let variantClass = $derived.by(() => VARIANTS[variant] || VARIANTS.neutral);
  
    let sizeClass = $derived.by(() => SIZES[size] || SIZES.md);
  
    let iconSize = ICON_SIZE_MAP[size] || ICON_SIZE_MAP.md;
  
    let iconXGap = $derived.by(() => ICON_X_GAP_MAP[size] || ICON_X_GAP_MAP.md);
  
    let badgeClass = $derived.by(() => `${variantClass} ${sizeClass}`);
  </script>
  
  {#snippet iconSnip()}
    {#if icon}
      {@const Icon = icon}
      <span class="flex items-center" style="width: {iconSize}px; height: {iconSize}px;">
        <Icon size={iconSize} />
      </span>
    {/if}
  {/snippet}
  
  <span class="flex items-center justify-center rounded-full {badgeClass} {klass}">
    <span class="flex items-center {iconXGap} capitalize">
      {@render iconSnip()}
      {@render children()}
    </span>
  </span>
  