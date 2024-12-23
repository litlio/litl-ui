<script lang="ts">
    import Badge from "$lib/badge/badge.svelte";
    import User from "lucide-svelte/icons/user";

    // Обновляем данные с разделением на color и variant
    let badges = [
        { id: 1, color: "neutral" as const, variant: "filled" as const, content: "Badge", state: "Default" },
        { id: 2, color: "neutral" as const, variant: "filled" as const, content: "Badge", icon: { component: User, props: { size: 16, class: "text-white dark:text-black" } }, state: "With Icon" },
        { id: 3, color: "neutral" as const, variant: "filled" as const, content: "Badge", rounded: true, state: "Rounded" },
        { id: 4, color: "neutral" as const, variant: "filled" as const, content: "Badge", icon: { component: User, props: { size: 16 } }, rounded: true, state: "Rounded with Icon" },
        { id: 5, color: "red" as const, variant: "filled" as const, number: 5, state: "Number" },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Badge</h1>
        <p class="text-muted-foreground">Showcasing all variations of the badge component built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each badges as badge, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(badges.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <!-- Передаём color и variant -->
                    <Badge 
                        color={badge.color}
                        variant={badge.variant}
                        icon={badge.icon}
                        rounded={badge.rounded}
                        number={badge.number}
                    >
                        {badge.content}
                    </Badge>
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{badge.state}</p>
            </div>
        {/each}
    </div>
</div>

