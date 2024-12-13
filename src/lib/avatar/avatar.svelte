<script lang="ts">
    import type { AvatarProps } from "./types.js";
    import { getShortName } from "./utils.js";
  
    let props: AvatarProps = $props();
  
    let { img, name, details, detail = false, href, size = 32 } = props;
  
    let shortName = $derived.by(() => getShortName(props.name));

    let avatarClasses = $derived.by(() => `
      inline-flex place-items-center gap-2 rounded-full overflow-hidden
      ${img ? '' : 'bg-neutral-200 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-800'}
    `);
  </script>
  
  <div class="inline-flex place-items-center gap-2">
    {#if href}
      <a href={href} class={avatarClasses} style="width: {size}px; height: {size}px;">
        {#if img}
          <img class="h-full object-cover" src={img} alt="{name}'s avatar" />
        {:else}
          <div class="text-xs flex place-items-center justify-center w-full h-full">
            <span class="text-black dark:text-white">{shortName}</span>
          </div>
        {/if}
      </a>
    {:else}
      <div class={avatarClasses} style="width: {size}px; height: {size}px;">
        {#if img}
          <img class="h-full object-cover" src={img} alt="{name}'s avatar" />
        {:else}
          <div class="text-xs flex place-items-center justify-center w-full h-full">
            <span class="text-black dark:text-white">{shortName}</span>
          </div>
        {/if}
      </div>
    {/if}
  
    {#if detail}
      <div class="flex flex-col">
        <span class="text-sm font-medium">{name}</span>
        {#if details}
          <small class="text-xs text-neutral-600 dark:text-neutral-500">{details}</small>
        {/if}
      </div>
    {/if}
  </div>
  