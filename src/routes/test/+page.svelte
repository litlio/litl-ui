<script lang="ts">
    import { Select } from "$lib/index.js";

let selectedValue = "orange"; // Установим начальное значение
let options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "pineapple", label: "Pineapple" },
];
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
    <div class="container max-w-lg mx-auto px-4 py-16">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

        <div class="w-full">
            <Select.Root bind:value={selectedValue}>
                <Select.Trigger>
                    <Select.Value placeholder="Choose a fruit" />
                </Select.Trigger>
                <Select.Content>
                    {#each options as option}
                        <Select.Item value={option.value}>{option.label}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
            
            <p>Selected: {selectedValue}</p>

        </div>
    </div>
</div>

