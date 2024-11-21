<script lang="ts">
    let { 
      required = false, 
      requiredSymbol = "*", 
      for: f = undefined,
      children
    } = $props<{ required?: boolean; requiredSymbol?: string; for?: string; children?: any }>();
  
  </script>
  
  <label for={f} class="text-neutral-500 dark:text-neutral-500 text-xs">
    {@render children?.()}
    {#if required}
      {requiredSymbol}
    {/if}
  </label>