<script lang="ts">
    import Toggle from "$lib/toggle/toggle.svelte";
    import Bold from "lucide-svelte/icons/bold";
    import Italic from "lucide-svelte/icons/italic";

    // Массив вариантов. Каждая запись демонстрирует разные комбинации пропсов.
    let toggles = [
        // 1: Только текст, "Default"
        {
            id: 1,
            isSelected: false,
            disabled: false,
            children: () => "Default",
            state: "Default State",
        },
        // 2: Только текст, "Checked"
        {
            id: 2,
            isSelected: true,
            disabled: false,
            children: () => "Checked",
            state: "Checked State",
        },
        // 3: Только текст, "Disabled"
        {
            id: 3,
            isSelected: false,
            disabled: true,
            children: () => "Disabled",
            state: "Disabled State",
        },
        // 4: Только текст, "Disabled & Checked"
        {
            id: 4,
            isSelected: true,
            disabled: true,
            children: () => "Disabled & Checked",
            state: "Disabled & Checked State",
        },

        // 5: Только иконка Bold
        {
            id: 5,
            isSelected: false,
            disabled: false,
            mode: "iconOnly" as const,
            icon: { component: Bold, props: { size: 16 } },
            state: "With Icon",
            // mode = auto => iconOnly
        },
        // 6: Только иконка Bold, rounded
        {
            id: 6,
            isSelected: false,
            disabled: false,
            rounded: true,
            mode: "iconOnly" as const,
            icon: { component: Bold, props: { size: 16 } },
            state: "With Icon & Rounded",
        },
        // 7: Только текст "3", rounded + outline
        {
            id: 7,
            isSelected: false,
            disabled: false,
            rounded: true,
            variant: "outline" as const,
            children: () => "3",
            state: "With Icon & Rounded & Outline",
        },
        // 8: Только иконка Italic
        {
            id: 8,
            isSelected: false,
            disabled: false,
            mode: "iconOnly" as const,
            icon: { component: Italic, props: { size: 16 } },
            state: "With Another Icon",
        },
        // 9: Только текст, variant="ghost"
        {
            id: 9,
            isSelected: false,
            disabled: false,
            variant: "ghost" as const,
            children: () => "Outline Ghost",
            state: "Ghost Variant",
        },
        // 10: Только текст, variant="outline"
        {
            id: 10,
            isSelected: false,
            disabled: false,
            variant: "outline" as const,
            children: () => "Outline",
            state: "Outline Variant",
        },
        // 11: Только текст, rounded + outline
        {
            id: 11,
            isSelected: false,
            disabled: false,
            rounded: true,
            variant: "outline" as const,
            children: () => "Outline",
            state: "Outline Rounded",
        },

        // Дополнительные примеры
        // 12: Иконка Italic + текст "Italic + Text", размер small, ghost
        {
            id: 12,
            isSelected: false,
            disabled: false,
            icon: { component: Italic, props: { size: 16 } },
            children: () => "Italic + Text",
            size: "small" as const,
            variant: "ghost" as const,
            state: "Small iconWithText Ghost",
        },
        // 13: Иконка Bold + текст "Bold + Text", size=large, outline, rounded
        {
            id: 13,
            isSelected: false,
            disabled: false,
            icon: { component: Bold, props: { size: 16 } },
            children: () => "Bold + Text",
            size: "large" as const,
            variant: "outline" as const,
            rounded: true,
            state: "Large iconWithText Outline Rounded",
        },
        // 14: Только иконка Bold, mode="iconOnly", size="tiny"
        {
            id: 14,
            isSelected: false,
            disabled: false,
            icon: { component: Bold, props: { size: 16 } },
            mode: "iconOnly" as const,
            size: "tiny" as const,
            state: "Tiny forced iconOnly",
        },
        // 15: Только текст, mode="textOnly", size="large", ghost
        {
            id: 15,
            isSelected: false,
            disabled: false,
            mode: "textOnly" as const,
            size: "large" as const,
            variant: "ghost" as const,
            children: () => "Large textOnly Ghost",
            state: "Large forced textOnly Ghost",
        },
        // 16: rounded + outline
        {
            id: 16,
            isSelected: false,
            disabled: false,
            rounded: true,
            variant: "outline" as const,
            icon: { component: Bold, props: { size: 16 } },
            mode: "iconOnly" as const,
            state: "With Icon & Rounded & Outline",
        },
    ];

    const cols = 3;
</script>

<!-- Макет для показа вариантов -->
<div class="container mx-auto p-4">
    <div class="my-16 text-center">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Toggle</h1>
        <p class="text-neutral-950 dark:text-white">
            A showcase of toggle components built with Svelte and TailwindCSS.
        </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each toggles as toggle, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(toggles.length / cols)
                        ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <Toggle
                        bind:isSelected={toggle.isSelected}
                        disabled={toggle.disabled}
                        rounded={toggle.rounded}
                        variant={toggle.variant}
                        ariaLabel={`Toggle for ${toggle.state}`}
                        mode={toggle.mode}
                        size={toggle.size}
                        icon={toggle.icon}
                    >
                        {#if typeof toggle.children === "function"}
                        <span>{toggle.children()}</span>
                        {/if}
                    </Toggle>
                </div>

                <!-- Просто подпись снизу, не относится к функционалу -->
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">
                    {toggle.state}
                </p>
            </div>
        {/each}
    </div>
</div>