<script lang="ts">
  import type { AvatarProps } from "./types.js";
  import type { IconProps } from "$lib/types/ui.js";
  import { getShortName } from "./utils.js";

  let props: AvatarProps & { icon?: IconProps } = $props();

  let { img, name, details, detail = false, href, size = 40, icon } = props;

  let shortName = $derived.by(() => name ? getShortName(name) : '');

  let avatarClasses = $derived.by(() => `
      inline-flex place-items-center gap-2 rounded-full overflow-hidden
      ${img ? '' : 'bg-secondary dark:bg-secondary'}
  `);
</script>

{#snippet avatarImage()}
  {#if img}
      <img class="h-full object-cover" src={img} alt="{name || 'Avatar'}" />
  {:else if icon}
      {@const IconComponent = icon.component}
      <div class="text-xs flex place-items-center justify-center w-full h-full">
          <IconComponent size={size / 2} {...icon.props} />
      </div>
  {:else if name}
      <div class="text-xs flex place-items-center justify-center w-full h-full">
          <span class="text-black dark:text-white">{shortName}</span>
      </div>
  {:else}
      <div class="text-xs flex place-items-center justify-center w-full h-full">
          <span class="text-neutral-500 dark:text-neutral-400">?</span>
      </div>
  {/if}
{/snippet}

{#snippet avatarLink()}
  <a href={href} class={avatarClasses} style="width: {size}px; height: {size}px;">
      {@render avatarImage()}
  </a>
{/snippet}

{#snippet avatarBlock()}
  <div class={avatarClasses} style="width: {size}px; height: {size}px;">
      {@render avatarImage()}
  </div>
{/snippet}

{#snippet avatarDetails()}
  {#if detail}
      <div class="flex flex-col">
          <span class="text-foreground dark:text-foreground text-sm font-medium">{name}</span>
          {#if details}
              <small class="text-xs text-neutral-600 dark:text-neutral-500">{details}</small>
          {/if}
      </div>
  {/if}
{/snippet}

<div class="inline-flex place-items-center gap-4">
  {#if href}
      {@render avatarLink()}
  {:else}
      {@render avatarBlock()}
  {/if}
  {@render avatarDetails()}
</div>



  