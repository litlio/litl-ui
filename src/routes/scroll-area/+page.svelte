<script lang="ts">
    import { ScrollArea } from "$lib/index.js";

    let cards = [
        {
            id: 1,
            state: "Need fix"
        },
    ];

    let blocks = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

    const cols = $state(1);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Scroll Area</h1>
        <p class="text-muted-foreground">A showcase of scroll area components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4 mx-auto">
                <ScrollArea.Root height="300px" width="240px">
                    <ScrollArea.Viewport>
                        <ScrollArea.Content>
                            <ul class="space-y-2 p-2">
                                {#each blocks as block}
                                    <li class="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                                        {block}
                                    </li>
                                {/each}
                            </ul>
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                </ScrollArea.Root>
            </div>
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>