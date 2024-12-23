<script lang="ts">
    import Tooltip from "$lib/tooltip/tooltip.svelte";
    import Button from "$lib/button/button.svelte";
    import Badge from "$lib/badge/badge.svelte";

    let cards = [
        {
            id: 1,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "top" as const,
                content: "Top",
            },
            state: "Top Tooltip",
        },
        {
            id: 2,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "bottom" as const,
                content: "Bottom",
            },
            state: "Bottom Tooltip",
        },
        {
            id: 3,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "right" as const,
                content: "Right",
            },
            state: "Right Tooltip",
        },
        {
            id: 4,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "left" as const,
                content: "Left",
            },
            state: "Left Tooltip",
        },
        {
            id: 5,
            tooltip: {
                text: "The Evil Rabbit",
                position: "top" as const,
                type: "success" as const,
                content: "Top",
            },
            state: "Success Tooltip",
        },
        {
            id: 6,
            tooltip: {
                text: "The Evil Rabbit",
                position: "bottom" as const,
                type: "error" as const,
                content: "Bottom",
            },
            state: "Error Tooltip",
        },
        {
            id: 7,
            tooltip: {
                text: "The Evil Rabbit",
                position: "right" as const,
                type: "warning" as const,
                content: "Right",
            },
            state: "Warning Tooltip",
        },
        {
            id: 8,
            tooltip: {
                text: "The Evil Rabbit",
                position: "left" as const,
                type: "violet" as const,
                content: "Left",
            },
            state: "Violet Tooltip",
        },
        {
            id: 9,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "bottom" as const,
                content: "<Button size='small'>Bottom</Button>",
                isComponent: true,
            },
            state: "Button Tooltip",
        },
        {
            id: 10,
            tooltip: {
                text: "The Evil Rabbit Jumped over the Fence",
                position: "left" as const,
                content: "<Badge size='sm'>LEFT</Badge>",
                isComponent: true,
            },
            state: "Badge Tooltip",
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
                <Tooltip
                    text={card.tooltip.text}
                    position={card.tooltip.position}
                    type={card.tooltip.type}
                >
                    {#if card.tooltip.isComponent}
                        {#if card.tooltip.content === "<Button size='small'>Bottom</Button>"}
                            <Button size="small">Bottom</Button>
                        {:else if card.tooltip.content === "<Badge size='sm'>LEFT</Badge>"}
                            <Badge size="sm">LEFT</Badge>
                        {/if}
                    {:else}
                        <span class="dark:text-white">{card.tooltip.content}</span>
                    {/if}
                </Tooltip>
            </div>
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>
