<script lang="ts">
    import type { Snippet } from "svelte";

    type propsT = {
        class?: string; // Дополнительные классы для элемента
        children: Snippet; // Дочерние элементы (сниппеты)
    };

    let { class: klass = 'flex-shrink-0 w-full h-full relative overflow-hidden', children }: propsT = $props();
</script>

<div class={klass} >
    {@render children()}
</div>


