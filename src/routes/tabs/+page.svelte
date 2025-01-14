<script lang="ts">
    import { Tabs } from "$lib/index.js";

    let selected = $state('apple');
    let cards = [
        {
            id: 1,
            items: [
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' },
            ],
            state: "Standard Tabs",
        },
        {
            id: 2,
            disabled: true,
            items: [
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' },
            ],
            state: "Disabled Tabs",
        },
        {
            id: 3,
            disabled: true,
            items: [
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango', disabled: true, tooltip: 'Mangos are not allowed' },
            ],
            state: "Tabs with Disabled Option",
        },
        {
            id: 4,
            items: [
                { title: 'Apple', value: 'apple' },
                { title: 'Orange', value: 'orange' },
                { title: 'Mango', value: 'mango' },
            ],
            type: "secondary" as const,
            state: "Secondary Tabs",
        },
    ];

    const cols = $state(2);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Tabs</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of tabs components built with Svelte and TailwindCSS.</p>
    </div>

    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-0`}>
        {#each cards as card, index}
            <div
                class={`relative px-10 py-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <Tabs disabled={card.disabled} bind:selected={selected} tabs={card.items} type={card.type} />
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

