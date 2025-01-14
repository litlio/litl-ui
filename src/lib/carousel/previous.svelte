<script lang="ts">
    import ChevronLeft from 'lucide-svelte/icons/chevron-left';
    import { getContext } from 'svelte';

    const { carouselState, isHovered } = getContext<{
        carouselState: {
            get: () => any;
            isBeginning: () => boolean;
        };
        isHovered: () => boolean;
    }>('embla');

    let isVisible = $state(() => isHovered() && !carouselState.isBeginning());

    const handleClick = () => {
        const embla = carouselState.get();
        embla?.scrollPrev();
    };
</script>

<button
    class={`absolute top-1/2 left-4 transform -translate-y-1/2 z-10 rounded-full p-3 bg-white/90 hover:bg-white text-black transition-opacity duration-300 ${
        isVisible() ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onclick={handleClick}
>
    <ChevronLeft size={16} />
</button>










