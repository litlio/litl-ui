<script lang="ts">
    import { getContext } from 'svelte';

    const carouselState = getContext<{ get: () => { 
        scrollTo: (index: number) => void, 
        scrollSnaps: number[], 
        selectedSnap: number 
    }}>('carouselState');

    // ✅ Теперь scrollSnaps и selectedSnap обновляются реактивно
    let scrollSnaps = $derived.by(() => carouselState.get().scrollSnaps);
    let selectedSnap = $derived.by(() => carouselState.get().selectedSnap);

    function handleClick(index: number) {
        carouselState.get().scrollTo(index);
    }
</script>

{#if scrollSnaps.length > 0}
    <div class="flex gap-2 justify-center mt-4">
        {#each scrollSnaps as _, index}
            <button
                class="w-2 h-2 rounded-full transition-all {index === selectedSnap ? 'bg-black' : 'bg-neutral-200'}"
                onclick={() => handleClick(index)}
                aria-label="Switch to slide {index + 1}"
            ></button>
        {/each}
    </div>
{/if}
