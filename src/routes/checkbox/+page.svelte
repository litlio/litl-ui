<script lang="ts">
    import Checkbox from '$lib/checkbox/checkbox.svelte';

    let cards = [
        { id: 1, value: "Accept terms and conditions", state: "Default" },
        { id: 2, value: "Option", checked: true, state: "Checked" },
        { id: 3, value: "Option", disabled: true, state: "Disabled" },
        { id: 4, value: "Option", disabled: true, checked: true, state: "Checked & Disabled" },
        { id: 5, value: "Option", indeterminate: true, state: "Indeterminate Active" },
        { id: 6, value: "Option", disabled: true, indeterminate: true, state: "Indeterminate disabled" },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Checkbox Cards</h1>
        <p class="text-muted-foreground">A showcase of styled checkbox cards with states.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col items-center justify-between border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Чекбокс -->
                <Checkbox
                    disabled={card.disabled}
                    checked={card.checked}
                    indeterminate={card.indeterminate}
                >
                    {card.value}
                </Checkbox>
                <!-- Состояние -->
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">
                    {card.state}
                </p>
            </div>
        {/each}
    </div>
</div>
