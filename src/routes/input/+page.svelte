<script lang="ts">
    import Input from "$lib/input/input.svelte";

    // Массив данных для карточек
    let cards = [
        { id: 1, placeholder: "Medium" as const, size: "medium" as const },
        { id: 2, placeholder: "Error" as const, size: "medium" as const, error: "Error message" },
        { id: 3, placeholder: "medium" as const, size: "medium" as const, disabled: true },
    ];

    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">

    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-muted-foreground dark:text-foreground  md:text-4xl">Input</h1>
        <p class="text-muted-foreground">A growing collection of over 51 input components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex flex-col bg-white dark:bg-neutral-950 justify-start border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Компонент Input -->
                <Input 
                    aria-labelledby="Demo input" 
                    placeholder={card.placeholder} 
                    size={card.size} 
                    error={card.error} 
                    disabled={card.disabled} 
                />
            </div>
        {/each}
    </div>
</div>
