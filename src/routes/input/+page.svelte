<script lang="ts">
    import Input from "$lib/input/input.svelte";

    let cards = [
        { id: 1, placeholder: "Medium" as const, size: "medium" as const, state: "Medium Input" },
        { id: 2, placeholder: "Error" as const, size: "medium" as const, error: "Error message", state: "Input with Error" },
        { id: 3, placeholder: "medium" as const, size: "medium" as const, disabled: true, state: "Disabled Input" },
        { id: 4, placeholder: "Required" as const, size: "medium" as const, required: true, state: "Required Input" },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">

    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white  md:text-4xl">Input</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of input components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col bg-white dark:bg-neutral-950 justify-start border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <Input 
                    aria-labelledby="Demo input" 
                    placeholder={card.placeholder} 
                    size={card.size} 
                    error={card.error} 
                    disabled={card.disabled}
                    required={card.required}
                />

                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>
