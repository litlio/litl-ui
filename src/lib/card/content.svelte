<script lang="ts">
    let { class: classProp = '', children } = $props<{ class?: string; children?: any }>();
</script>

<div class={`p-6 ${classProp}`}>
    {@render children?.()}
</div>

