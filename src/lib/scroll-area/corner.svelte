<script lang="ts">
    let { className = '', children } = $props<{ className?: string; children?: any }>();
</script>

<div
    class={`absolute bottom-0 right-0 bg-neutral-300 dark:bg-neutral-700 ${className}`}
>
    {@render children?.()}
</div>

