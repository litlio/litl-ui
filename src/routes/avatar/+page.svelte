<script lang="ts">
    import Avatar from "$lib/avatar/avatar.svelte";

    // Массив данных для карточек
    let cards = [
        { id: 1, name: "Mary" },
        { id: 2, name: "John Doe" },
        { id: 3, name: "Joe Middle", img: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" },
        { id: 4, name: "Sophia" },
        { id: 5, name: "Ethan" },
        { id: 6, name: "Emily" },
        { id: 7, name: "Liam" },
        { id: 8, name: "Noah" },
        { id: 9, name: "Olivia" }
    ];

    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">

    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Avatar</h1>
        <p class="text-muted-foreground">A growing collection of over 51 avatar components built with Svelte and TailwindCSS.</p>
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
                    <Avatar name={card.name} img={card.img} />
                </div>
            </div>
        {/each}
    </div>
</div>
