<script lang="ts">
    import ChevronRight from 'lucide-svelte/icons/chevron-right';
    import { getContext } from 'svelte';

    const { carouselState, isHovered } = getContext<{
        carouselState: {
            get: () => any;
            isEnd: () => boolean;
        };
        isHovered: () => boolean;
    }>('embla');

    let isVisible = $state(() => isHovered() && !carouselState.isEnd());

    const handleClick = () => {
        const embla = carouselState.get();
        embla?.scrollNext();
    };
</script>

<button
    class={`absolute top-1/2 right-4 transform -translate-y-1/2 z-10 rounded-full p-3 bg-white/90 hover:bg-white text-black transition-opacity duration-300 ${
        isVisible() ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onclick={handleClick}
>
    <ChevronRight size={16} />
</button>









