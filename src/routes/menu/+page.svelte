<script lang="ts">
    import { Menu } from "$lib/index.js";
	import { Content } from "$lib/menu/index.js";

    // Массив данных для карточек
    let cards = [
        {
            id: 1,
            action: "Fruits",
            items: [
                { link: "#", value: "Apple" },
                { link: "#", value: "Banana" },
                { link: "#", value: "Mango" },
                { link: "#", value: "Orange" },
            ],
        },
        {
            id: 2,
            action: "Product",
            items: [
                { link: "#", value: "Apple" },
                { link: "#", value: "Apple" },
            ],
        },
        {
            id: 3,
            action: "Account",
            items: [
                { link: "#", value: "Apple" },
                { link: "#", value: "Apple" },
            ],
        },
        {
            id: 4,
            action: "...",
            buttonProps: { 'aria-label': 'Menu', shape: 'square' as const, size: 'medium' as const, variant: 'outline' as const },
            items: [
                { link: "#", value: "Settings" },
                { link: "#", value: "Logout" },
            ],
        },
        {
            id: 5,
            action: "...",
            buttonProps: { 'aria-label': 'Menu', shape: 'circle' as const, size: 'medium' as const, variant: 'outline' as const },
            items: [
                { link: "#", value: "Settings" },
                { link: "#", value: "Logout" },
            ],
        },
    ];

    // Количество колонок в сетке
    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Menu</h1>
        <p class="text-muted-foreground">A collection of menu dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Вывод компонента Select -->
                <div class="flex items-center justify-center w-full">
                    <Menu.Root>
                        <Menu.Button {...card.buttonProps}>{card.action}</Menu.Button>
                        <Menu.Content class="w-[200px]">
                            {#each card.items as item}
                            <Menu.Link href={item.link}>{item.value}</Menu.Link>
                            {/each}
                        </Menu.Content>
                    </Menu.Root>
                </div>
            </div>
        {/each}
    </div>
</div>