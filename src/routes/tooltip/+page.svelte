<script lang="ts">
    import Tooltip from "$lib/tooltip/index.js";
    import Button from "$lib/button/button.svelte";

    let cards = [
        {
            id: 1,
            delayDuration: 300,
            position: "top" as const,
            content: "I am top.",
            state: "Top Tooltip",
        },
        {
            id: 2,
            delayDuration: 0,
            position: "bottom" as const,
            content: "I am bottom.",
            state: "Bottom Tooltip",
        },
        {
            id: 3,
            delayDuration: 0,
            position: "left" as const,
            content: "I am left.",
            state: "Left Tooltip",
        },
        {
            id: 4,
            delayDuration: 0,
            position: "right" as const,
            content: "I am right.",
            state: "Right Tooltip",
        },
        {
            id: 5,
            delayDuration: 0,
            position: "bottom" as const,
            content: "I am arrow.",
            showArrow: true,
            state: "With arrow",
        },
    ];

    const cols = $state(4);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Tooltip</h1>
        <p class="text-muted-foreground">A showcase of tooltip components built with Svelte and TailwindCSS.</p>
    </div>

    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4 mx-auto">
                <Tooltip.Provider delayDuration={card.delayDuration}>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Button variant="outline" size="small">Hover me</Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content position={card.position} showArrow={card.showArrow}>
                            {card.content}
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </div>
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>
