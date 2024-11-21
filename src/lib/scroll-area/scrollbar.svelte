<script lang="ts">
    let { className = '', children } = $props<{
        className?: string;
        children?: any;
    }>();
</script>

<div
    class={`overflow-auto h-full w-2 ${className}`}
>
    {@render children?.()}
</div>
