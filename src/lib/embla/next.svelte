<script lang="ts">
    import { getContext } from 'svelte';
    import type { Snippet } from 'svelte';

    type propsT = { className?: string, children: Snippet };
    let { className = "", children }: propsT = $props();

    // ✅ Получаем `carouselState` без деструктуризации
    const carouselState = getContext<{ get: () => { scrollNext: () => void } }>("carouselState");

    function handleClick() {
        if (!carouselState) return; // ✅ Проверяем, что контекст существует

        const embla = carouselState.get(); // Получаем объект с методами
        embla?.scrollNext(); // Вызываем scrollNext()
    }
</script>

<button class="{className}" onclick={handleClick}>
    {@render children()}
</button>




  