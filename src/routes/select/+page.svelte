<script lang="ts">
    import { Select } from "$lib/index.js";

    let cards = [
        {
            id: 1,
            size: "small" as const,
            placeholder: "Select a fruit",
            items: [
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
                { value: "orange", label: "Orange" },
                { value: "pineapple", label: "Pineapple" },
            ],
            state: "Small Select",
        },
        {
            id: 2,
            size: "medium" as const,
            placeholder: "Choose an option",
            items: [
                { value: "car", label: "Car" },
                { value: "bike", label: "Bike" },
                { value: "train", label: "Train" },
                { value: "plane", label: "Plane" },
            ],
            state: "Medium Select",
        },
        {
            id: 3,
            size: "large" as const,
            placeholder: "Pick a color",
            items: [
                { value: "red", label: "Red" },
                { value: "blue", label: "Blue" },
                { value: "green", label: "Green" },
                { value: "yellow", label: "Yellow" },
            ],
            state: "Large Select",
        },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Select</h1>
        <p class="text-neutral-950 dark:text-white">A collection of select dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col bg-white dark:bg-neutral-950 justify-start items-start border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center w-full">
                    <Select.Root size={card.size} class="w-full lg:w-auto">
                        <Select.Trigger class="w-full lg:w-[200px]">
                            <Select.Value placeholder={card.placeholder} />
                        </Select.Trigger>
                        <Select.Content>
                            {#each card.items as item}
                                <Select.Item value={item.value}>{item.label}</Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>