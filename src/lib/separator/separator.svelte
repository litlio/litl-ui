<script lang="ts">
    import type { Size } from "../types/ui.js";

    let { vertical = false, margin = "none", label }: { 
        vertical?: boolean;
        margin: "none" | Size; 
        label?: string;
    } = $props();

    let height = $derived.by(() => vertical ? "100%" : "1px");
    let width = $derived.by(() => vertical ? "1px" : "100%");
</script>

<div
    data-vertical={vertical}
    class="data-[vertical=true]:flex-col flex w-full data-[vertical=true]:w-[1px] place-items-center"
>
    <hr
        style="height: {height}; width: {width};"
        data-margin={margin}
        class="bg-neutral-200 dark:bg-neutral-700 border-none
        data-[margin='xs']:my-1 data-[margin='sm']:my-2 data-[margin='md']:my-3
        data-[margin='lg']:my-4 data-[margin='xl']:my-5"
    />
    
    {#if label}
        <small class="px-2 text-neutral-500 dark:text-neutral-500 whitespace-nowrap">{label}</small>
    {/if}
    
    <hr
        style="height: {height}; width: {width};"
        data-margin={margin}
        class="bg-neutral-200 dark:bg-neutral-700 border-none
        data-[margin='xs']:my-1 data-[margin='sm']:my-2 data-[margin='md']:my-3
        data-[margin='lg']:my-4 data-[margin='xl']:my-5"
    />
</div>