<script lang="ts">
    import Badge from "$lib/badge/badge.svelte";

    // Массив данных для карточек
    let cards = [
        { id: 1, variant: "blue" as const, size: "sm" as const, content: "Small" },
        { id: 2, variant: "red" as const, size: "md" as const, content: "Medium" },
        { id: 3, variant: "green" as const, size: "lg" as const, content: "Large" },
        { id: 4, variant: "amber-subtle" as const, size: "md" as const, content: "Amber" }
    ];

    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">

    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Badge</h1>
        <p class="text-muted-foreground">A growing collection of over 51 badge components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex items-center justify-center border-neutral-300 
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Добавьте компонент внутрь этой карточки -->
                <div class="flex items-center justify-center">
                    <Badge variant={card.variant} size={card.size}>{card.content}</Badge>
                </div>
            </div>
        {/each}
    </div>
</div>
