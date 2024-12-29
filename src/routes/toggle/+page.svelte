<script lang="ts">
    import Toggle from "$lib/toggle/toggle.svelte";
    import Bold from "lucide-svelte/icons/bold";
    import Italic from "lucide-svelte/icons/italic";

    let toggles = [
        { id: 1, isSelected: false, disabled: false, content: "Default", state: "Default State" },
        { id: 2, isSelected: true, disabled: false, content: "Checked", state: "Checked State" },
        { id: 3, isSelected: false, disabled: true, content: "Disabled", state: "Disabled State" },
        { id: 4, isSelected: true, disabled: true, content: "Disabled & Checked", state: "Disabled & Checked State" },
        { id: 5, isSelected: false, disabled: false, content: Bold, iconProps: { size: 16 }, state: "With Icon" },
        { id: 6, isSelected: false, disabled: false, content: Italic, iconProps: { size: 16 }, state: "With Another Icon" },
        { id: 7, isSelected: false, disabled: false, content: "Outline Ghost", variant: "ghost" as const, state: "Ghost Variant" },
        { id: 8, isSelected: false, disabled: false, content: "Outline", variant: "outline" as const, state: "Outline Variant" },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Toggle</h1>
        <p class="text-muted-foreground">A showcase of toggle components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each toggles as toggle, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(toggles.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <Toggle 
                        bind:isSelected={toggle.isSelected}
                        disabled={toggle.disabled}
                        variant={toggle.variant}
                        ariaLabel={`Toggle for ${toggle.state}`}
                    >
                        {#if typeof toggle.content === "function"}
                            <svelte:component this={toggle.content} {...toggle.iconProps} />
                        {:else}
                            {toggle.content}
                        {/if}
                    </Toggle>
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{toggle.state}</p>
            </div>
        {/each}
    </div>
</div>



