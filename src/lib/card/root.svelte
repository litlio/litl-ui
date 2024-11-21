<script lang="ts">
    let { class: classProp = '', children } = $props<{ class?: string; children?: any }>();
</script>

<div class={`relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm ${classProp}`}>
    {@render children?.()}
</div>

