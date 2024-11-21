<script lang="ts">
    let { class: classProp = '', children } = $props<{ class?: string; children?: any }>();
</script>

<div class={`items-center p-6 pt-0 flex justify-between ${classProp}`}>
    {@render children?.()}
</div>
