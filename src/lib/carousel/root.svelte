<script lang="ts">
    import emblaCarouselSvelte from 'embla-carousel-svelte';
    import { setContext } from 'svelte';
    import { createCarouselState } from './root.svelte.js';
    import type { Snippet } from 'svelte';

    type propsT = {
        options?: Record<string, unknown>;
        plugins?: any[];
        class?: string;
        aspectRatio?: string;
        rounded?: string;
        children: Snippet;
    };

    let {
        options = { loop: false, align: 'center', speed: 0 },
        plugins = [],
        class: klass = 'overflow-hidden relative',
        aspectRatio = 'aspect-square',
        rounded = 'rounded-xl',
        children,
    }: propsT = $props();

    const carouselState = createCarouselState();
    let isHovered = $state(false);

    setContext('embla', {
        carouselState,
        isHovered: () => isHovered,
    });
</script>

<div
    class={`${klass} ${aspectRatio} ${rounded}`}
    role="region"
    aria-label="Carousel"
    style="aspect-ratio: 1 / 1;"
    use:emblaCarouselSvelte={{ options, plugins }}
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
    onemblaInit={(e) => {
        carouselState.set(e.detail);
    }}
>
    {@render children()}
</div>







