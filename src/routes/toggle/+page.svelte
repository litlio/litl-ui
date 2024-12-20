<script lang="ts">
    import { Toggle } from "$lib/index.js";

    let cards = [
        {
            id: 1,
            color: "secondary" as const,
            state: "Enabled"
        },
        {
            id: 2,
            disabled: true,
            color: "warning" as const,
            state: "Disabled"
        },
        {
            id: 3,
            checked: true,
            color: "warning" as const,
            state: "Checked"
        },
        {
            id: 4,
            disabled: true,
            checked: true,
            color: "success" as const,
            state: "Disabled & Checked"
        },
    ];

    const cols = $state(4);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Toggle</h1>
        <p class="text-muted-foreground">A showcase of toggle components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4 mx-auto">
                <!-- Toggle компонент -->
                <Toggle disabled={card.disabled} checked={card.checked} color={card.color} />
            </div>
            <!-- Текст состояния -->
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>

