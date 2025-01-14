<script lang="ts">
    import TextArea from "$lib/textarea/textarea.svelte";

    let cards = [
        {
            id: 1,
            placeholder: "Default",
            state: "Default"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            resize: false,
            state: "Not resize"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            disabled: true,
            resize: false,
            state: "Disabled"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            readonly: true,
            value: "read only",
            state: "Read only"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            width: "100%",
            state: "Full width"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            resize: true,
            autoResize: true,
            state: "Resize & autoresize"
        },
        {
            id: 1,
            placeholder: "Placeholder",
            resize: false,
            autoResize: true,
            width: "175px",
            state: "Custom"
        },
    ];

    const cols = $state(4);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">TextArea</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of textarea components built with Svelte and TailwindCSS.</p>
    </div>

    <div class={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4 mx-auto">
                <TextArea placeholder={card.placeholder} resize={card.resize} disabled={card.disabled} readonly={card.readonly} width={card.width} autoResize={card.autoResize} />
            </div>
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>