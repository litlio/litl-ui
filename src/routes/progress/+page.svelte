<script lang="ts">
    import { Progress } from "$lib/index.js";
    import Button from "$lib/button/button.svelte";

    let dynamic = $state(0);

    let cards = [
        {
            id: 1,
            type: "success" as const,
            value: 100,
            state: "Completed",
        },
        {
            id: 2,
            type: "dynamic" as const,
            state: "Dynamic Progress",
        },
        {
            id: 3,
            type: "error" as const,
            value: 20,
            state: "Error State",
        },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Progress</h1>
        <p class="text-muted-foreground">A collection of progress dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                {#if card.type !== "dynamic"}
                    <div class="flex items-center justify-center w-full">
                        <Progress type={card.type} value={card.value} />
                    </div>
                {:else}
                    <div class="flex flex-col items-center gap-4 w-full">
                        <Progress value={dynamic} />
                        <div class="flex items-center gap-4">
                            <Button
                                onclick={() => {
                                    if (dynamic > 0) {
                                        dynamic = dynamic - 10;
                                    }
                                }}
                                size="small"
                                variant="secondary"
                            >
                                Decrease
                            </Button>
                            <Button
                                onclick={() => {
                                    if (dynamic < 100) {
                                        dynamic = dynamic + 10;
                                    }
                                }}
                                size="small"
                            >
                                Increase
                            </Button>
                        </div>
                    </div>
                {/if}
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

