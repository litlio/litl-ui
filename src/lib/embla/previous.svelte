<script lang="ts">
    import { getContext } from 'svelte';
    import type { Snippet } from 'svelte';
    import ChevronLeft from 'lucide-svelte/icons/chevron-left';

    type propsT = { className?: string };
    let { className = "" }: propsT = $props();

    // ✅ Получаем `carouselState` без деструктуризации
    const carouselState = getContext<{ get: () => { scrollPrev: () => void } }>("carouselState");

    function handleClick() {
        if (!carouselState) return; // ✅ Проверяем, что контекст существует

        const embla = carouselState.get(); // Получаем объект с методами
        embla?.scrollPrev(); // Вызываем scrollPrev()
    }
</script>

<button
    class="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 active:bg-neutral-200 transition-all {className}"
    onclick={handleClick}
>
    <ChevronLeft size={16} class="text-black"/>
</button>




  