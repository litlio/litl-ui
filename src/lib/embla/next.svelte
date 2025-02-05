<script lang="ts">
    import { getContext } from 'svelte';
    import type { Snippet } from 'svelte';
    import ChevronRight from 'lucide-svelte/icons/chevron-right';

    type propsT = { className?: string };
    let { className = "" }: propsT = $props();

    // ✅ Получаем `carouselState` без деструктуризации
    const carouselState = getContext<{ get: () => { scrollNext: () => void } }>("carouselState");

    function handleClick() {
        if (!carouselState) return; // ✅ Проверяем, что контекст существует

        const embla = carouselState.get(); // Получаем объект с методами
        embla?.scrollNext(); // Вызываем scrollNext()
    }
</script>

<button
    class="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 active:bg-neutral-200 transition-all {className}"
    onclick={handleClick}
>
    <ChevronRight size={16} class="text-black" />
</button>




  