<script lang="ts">
    import Checkbox from '$lib/checkbox/checkbox.svelte';

    // Массив данных для карточек
    let cards = [
        { id: 1, value: "Option" },
        { id: 2, checked: true, value: "Option" },
        { id: 3, disabled: true, value: "Option" },
        { id: 4, disabled: true, indeterminate: true, value: "Option" },
        { id: 5, disabled: true, checked: true, value: "Option" },
        { id: 6, indeterminate: true, value: "Option" },

    ]
    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Checkbox</h1>
        <p class="text-muted-foreground">A growing collection of over 51 checkbox components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Добавьте компонент внутрь этой карточки -->
                <div class="flex items-center justify-center">
                    <Checkbox
                        disabled={card.disabled}
                        checked={card.checked}
                        indeterminate={card.indeterminate}
                    >
                    {card.value}
                    </Checkbox>
                </div>
            </div>
        {/each}
    </div>
</div>