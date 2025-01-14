<script lang="ts">
    import type { Snippet } from "svelte";

    type propsT = {
        class?: string; // Класс для контейнера
        children: Snippet; // Дочерние элементы (сниппеты)
    };

    let { class: klass = 'flex gap-0 w-full h-full', children }: propsT = $props();
</script>

<div class={klass}>
    {@render children()}
</div>


