<script lang="ts">
    let { className = '' } = $props<{
        className?: string;
    }>();
</script>

<div
    class={`absolute bg-neutral-500 dark:bg-neutral-600 rounded-full w-full h-4 ${className}`}
></div>

