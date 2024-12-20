<script lang="ts">
    import { Progress } from "$lib/index.js";
    import Button from "$lib/button/button.svelte";

    let dynamic = $state(0);

    // Массив данных для карточек
    let cards = [
        {
            id: 1,
            type: "success" as const,
            value: 100,
        },
        {
            id: 2,
            type: "dynamic" as const,
        },
        {
            id: 3,
            type: "error" as const,
            value: 20,
        },
    ];

    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Progress</h1>
        <p class="text-muted-foreground">A collection of progress dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex flex-col items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Условие для обычных карточек -->
                {#if card.type !== "dynamic"}
                    <div class="flex items-center justify-center w-full">
                        <Progress type={card.type} value={card.value} />
                    </div>
                {:else}
                    <!-- Условие для карточки с кнопками -->
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
            </div>
        {/each}
    </div>
</div>
