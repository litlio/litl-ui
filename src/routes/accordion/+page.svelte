<script lang="ts">
    import { Accordion } from "$lib/index.js";

    let cards = [
        {
            id: 1,
            value: "item-1",
            title: "Frequently Asked Questions",
            state: "FAQs",
            items: [
                { trigger: "What is Svelte?", content: "Svelte is a modern JavaScript framework for building user interfaces." },
                { trigger: "Why use Svelte?", content: "Svelte offers faster, leaner, and simpler code for developing web applications." }
            ],
        },
        {
            id: 2,
            value: "item-2",
            title: "Advanced Topics",
            state: "Advanced Topics",
            items: [
                { trigger: "What is SvelteKit?", content: "SvelteKit is a framework for building applications with Svelte." },
                { trigger: "How does hydration work?", content: "Hydration in Svelte restores the DOM interactivity after server-side rendering." }
            ],
        },
    ];

    const cols = 2;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Accordion</h1>
        <p class="text-muted-foreground">A showcase of accordion components built with Svelte and TailwindCSS.</p>
    </div>

    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-0`}>
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <h2 class="mb-4 text-lg font-bold text-foreground">{card.title}</h2>
                <Accordion.Root>
                    {#each card.items as item, idx}
                        <Accordion.Item value={`item-${card.id}-${idx}`}>
                            <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
                            <Accordion.Content>{item.content}</Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

