<script lang="ts">
    import Button from "$lib/button/button.svelte";
    import Plus from 'lucide-svelte/icons/plus';
    import Bookmark from 'lucide-svelte/icons/bookmark';

    let cards = [
        { id: 1, size: "medium" as const, content: "Button" },
        { id: 2, variant: "secondary" as const, content: "Button" },
        { id: 3, variant: "outline" as const, content: "Button" },
        { id: 4, variant: "ghost" as const, content: "Button" },
        { id: 5, variant: "link" as const, content: "Button" },
        { id: 6, variant: "error" as const, content: "Button" },
        { id: 7, variant: "ghost" as const, shape: "square" as const, size: "medium" as const, ariaLabel: "Upload", content: Bookmark, iconProps: { size: 16, strokeWidth: 1.5, ariaHidden: true } },
        { id: 8, variant: "outline" as const, shape: "square" as const, size: "medium" as const, ariaLabel: "Upload", content: Bookmark, iconProps: { size: 16, strokeWidth: 1.5, ariaHidden: true } },
        { id: 9, variant: "outline" as const, shape: "circle" as const, size: "medium" as const, ariaLabel: "Upload",  content: Bookmark, iconProps: { size: 16, strokeWidth: 1.5, ariaHidden: true } },
        { id: 10, variant: "outline" as const, rounded: true, content: "Button" },
        { id: 11, disabled: true, content: "Button" },
        { id: 12, loading: true, content: "Button" },
        { id: 13, variant: "error" as const,prefix: { component: Bookmark, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } },content: "Button"},
        { id: 14, variant: "outline" as const,suffix: { component: Plus, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } },content: "Button"}
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Button</h1>
        <p class="text-muted-foreground">A growing collection of over 51 button components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`p-4 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <Button 
                        variant={card.variant} 
                        size={card.size} 
                        shape={card.shape} 
                        aria-label={card.ariaLabel}
                        rounded={card.rounded}
                        disabled={card.disabled}
                        loading={card.loading}
                        prefix={card.prefix}
                        suffix={card.suffix}
                    >
                    {#if typeof card.content === "function"}
                    <svelte:component this={card.content} {...card.iconProps} />
                    {:else}
                        {card.content}
                    {/if}
                    </Button>

                </div>
            </div>
        {/each}
    </div>
</div>
