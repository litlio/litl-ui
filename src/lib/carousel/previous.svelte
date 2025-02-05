<script lang="ts">
    import { getContext } from 'svelte';
    import ChevronLeft from 'lucide-svelte/icons/chevron-left';

    type propsT = { className?: string };
    let { className = "" }: propsT = $props();

    // ✅ Получаем `carouselState` без деструктуризации
    const carouselState = getContext<{ get: () => { scrollPrev: () => void, canScrollPrev: boolean } }>("carouselState");

    function handleClick() {
        if (!carouselState) return;

        const embla = carouselState.get();
        if (embla?.canScrollPrev) embla.scrollPrev(); // ✅ Проверяем возможность скролла перед вызовом
    }
</script>

<button
    class="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white transition-all 
           disabled:opacity-50 disabled:cursor-not-allowed 
           hover:bg-neutral-100 active:bg-neutral-200 
           disabled:hover:bg-white disabled:active:bg-white {className}"
    onclick={handleClick}
    disabled={!carouselState.get().canScrollPrev}
>
    <ChevronLeft size={16} class="text-black"/>
</button>






  