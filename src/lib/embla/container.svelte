<script lang="ts">
    import type { Snippet } from "svelte";

    type propsT = {
        className?: string;
        vertical?: boolean;
        children: Snippet;
    };

    let { vertical = false, className = "", children }: propsT = $props();

    let containerClasses = $derived.by(() => `
        flex ${vertical ? 'flex-col h-[200px]' : ''}
    `);
</script>

<div class="{containerClasses} {className}">
    {@render children()}
</div>

  