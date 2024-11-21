<script lang="ts">
    let { className = '', children } = $props<{ className?: string; children?: any }>();
</script>

<div
    class={`relative min-h-full ${className}`}
>
    {@render children?.()}
</div>
