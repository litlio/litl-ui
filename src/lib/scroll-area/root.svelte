<script lang="ts">
    let { 
        height = '100%',
        width = '100%',
        hideScrollbar = false,
        className = '',
        children 
    } = $props<{
        height?: string;
        width?: string;
        hideScrollbar?: boolean;
        className?: string;
        children?: any;
    }>();

    let rootClass = $derived.by(() => `
        relative border border-gray-300 dark:border-gray-700 rounded-md ${className}
    `);
</script>

<div class={rootClass} style={`height: ${height}; width: ${width}; overflow: hidden;`}>
    {@render children?.()}
</div>

