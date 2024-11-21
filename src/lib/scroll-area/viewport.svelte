<script lang="ts">
    let { className = '', children } = $props<{ className?: string; children?: any }>();
</script>

<div
    class={`relative overflow-auto w-full h-full ${className}`}
>
    {@render children?.()}
</div>
