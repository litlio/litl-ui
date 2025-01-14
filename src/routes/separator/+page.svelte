<script lang="ts">
    import Separator from "$lib/separator/separator.svelte";

    let cards = [
        {
            id: 1,
            margin: "md" as const,
            label: "This is sparta",
            state: "Words"
        },
        {
            id: 2,
            vertical: false,
            margin: "xl" as const,
            state: "Line"
        },
    ];

    const cols = $state(2);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Separator</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of separator components built with Svelte and TailwindCSS.</p>
    </div>

    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4">
                <Separator margin={card.margin} label={card.label} vertical={card.vertical}/>
            </div>
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>