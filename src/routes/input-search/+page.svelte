<script lang="ts">
    import SearchInput from "$lib/input/searchInput.svelte";

    let cards = [
        {
            id: 1,
            value: '',
            placeholder: 'Search...',
            showIcon: true,
            borderless: false,
            error: '',
            state: 'Default',
        },
        {
            id: 2,
            value: 'Query',
            placeholder: 'Search...',
            showIcon: false,
            borderless: true,
            error: '',
            state: 'Borderless',
        },
        {
            id: 3,
            value: '',
            placeholder: 'Search...',
            showIcon: false,
            borderless: false,
            error: '',
            state: 'No Icon',
        },
        {
            id: 4,
            value: '',
            placeholder: 'Search...',
            showIcon: true,
            borderless: false,
            error: 'Invalid search query',
            state: 'With Error',
        },
        {
            id: 5,
            value: '',
            placeholder: 'Search...',
            showIcon: true,
            borderless: false,
            error: '',
            disabled: true,
            state: 'Disabled',
        },
    ];

    const cols = 2;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Search Input</h1>
        <p class="text-neutral-950 dark:text-white">Showcasing different Search Input states.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-{cols} gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex flex-col items-center space-y-4">
                    <SearchInput
                        bind:value={card.value}
                        placeholder={card.placeholder}
                        showIcon={card.showIcon}
                        borderless={card.borderless}
                        error={card.error}
                        disabled={card.disabled}
                    />
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

