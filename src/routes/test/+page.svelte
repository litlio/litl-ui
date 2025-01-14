<script lang="ts">
    import { Carousel } from "$lib/index.js";

    const images = [
        "https://picsum.photos/400/300?random=1",
        "https://picsum.photos/400/300?random=2",
        "https://picsum.photos/400/300?random=3",
    ];
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
    <div class="container max-w-lg mx-auto px-4 py-16">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

        <div class="w-full">
            <!-- Карусель -->
            <Carousel.Root options={{ loop: false }}>
                <Carousel.Content>
                    {#each images as src, index (src)}
                        <Carousel.Item>
                            <img src={src} alt={`Image ${index + 1}`} class="object-cover w-full h-full" />
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
            </Carousel.Root>
        </div>
    </div>
</div>

