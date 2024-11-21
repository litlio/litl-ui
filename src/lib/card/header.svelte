<script lang="ts">
    let { class: classProp = '', children } = $props<{ class?: string; children?: any }>();
</script>

<div class={`flex flex-col space-y-1.5 p-6 pb-0 ${classProp}`}>
    {@render children?.()}
</div>
