<script lang="ts">
    import { Card } from "$lib/index.js";
    import Button from "$lib/button/button.svelte";

    let cards = [
        {
            id: 1,
            value: "item-1",
            title: "Frequently Asked Questions",
            description: "What is Svelte?",
            content: "This is the main content of the card. Add your content here.",
            state: "FAQs",
        },
        {
            id: 2,
            value: "item-2",
            title: "Advanced Topics",
            description: "What is Svelte?",
            content: "This is the main content of the card. Add your content here.",
            state: "Advanced Topics",
        },
    ];

    const cols = 2;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Card</h1>
        <p class="text-foreground">A showcase of card components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-0`}>
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <Card.Root class="w-full">
                    <Card.Header>
                        <h2 class="text-lg font-bold text-foreground">{card.title}</h2>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">{card.description}</p>
                    </Card.Header>
                    <Card.Content>
                        <div class="mb-4">
                            <p class="text-neutral-600 dark:text-neutral-400">{card.content}</p>
                        </div>
                    </Card.Content>
                    <Card.Footer class="flex gap-2">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Submit</Button>
                    </Card.Footer>
                </Card.Root>
                <!-- Отображение состояния -->
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

