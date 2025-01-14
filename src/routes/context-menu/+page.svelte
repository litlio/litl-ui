<script lang="ts">
    import { ContextMenu } from "$lib/index.js";

    let cards = [
        {
            id: 1,
            state: "Right-click for actions",
            actions: [
                { id: 1, label: "Action 1", onClick: () => alert("Action 1 selected") },
                { id: 2, label: "Action 2", onClick: () => alert("Action 2 selected") },
                { id: 3, label: "Action 3", onClick: () => alert("Action 3 selected") },
            ],
        },
        {
            id: 2,
            state: "Another menu example",
            actions: [
                { id: 1, label: "Edit", onClick: () => alert("Edit selected") },
                { id: 2, label: "Delete", onClick: () => alert("Delete selected") },
            ],
        },
    ];

    const cols = $state(2);
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Context Menu</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of context menu components built with Svelte and TailwindCSS.</p>
    </div>

    <!-- Сетка карточек -->
    <div class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-0`}>
        {#each cards as card, index}
        <div
            class={`p-10 flex flex-col justify-start border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                ${index % cols !== 0 ? "border-l" : ""}`}
        >
            <div class="flex flex-col gap-4 mx-auto">
                <ContextMenu.Root>
                    <ContextMenu.Trigger>
                        <div class="h-32 p-4 text-black dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 rounded-md border-1 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-center">
                            Click right mouse button
                        </div>
                    </ContextMenu.Trigger>
            
                    <ContextMenu.Content class="w-[200px] bg-white dark:bg-neutral-800 shadow-sm rounded-md">
                        {#each card.actions as action}
                        <ContextMenu.Item onClick={action.onClick}>
                            {action.label}
                        </ContextMenu.Item>
                        {/each}
                    </ContextMenu.Content>
                </ContextMenu.Root>
            </div>
            <!-- Текст состояния -->
            <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
        </div>
        {/each}
    </div>
</div>
