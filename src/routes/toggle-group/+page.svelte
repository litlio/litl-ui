<script lang="ts">
    import ToggleGroup from "$lib/toggle-group/index.js";
    import Bold from "lucide-svelte/icons/bold";
    import Italic from "lucide-svelte/icons/italic";
    import Underline from "lucide-svelte/icons/underline";

    let examples = [
    {
        id: 1,
        state: "Default Group (Multiple Select)",
        type: "multiple" as const,
        disabled: false,
        value: [],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: false },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: false },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: false }
        ]
    },
    {
        id: 2,
        state: "Disabled Group",
        type: "multiple" as const,
        disabled: true,
        value: ["bold", "italic", "underline"],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: true },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: true },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: true }
        ]
    },
    {
        id: 3,
        state: "Group with Disabled Item",
        type: "multiple" as const,
        disabled: false,
        value: ["italic"],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: true },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: false },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: false }
        ]
    },
    {
        id: 4,
        state: "Group with All Selected",
        type: "multiple" as const,
        disabled: false,
        value: ["bold", "italic", "underline"],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: false },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: false },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: false }
        ]
    },
    {
        id: 5,
        state: "Group with Preselected Items",
        type: "multiple" as const,
        disabled: false,
        value: ["italic"],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: false },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: false },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: false }
        ]
    },
    {
        id: 6,
        state: "Outline Group (Multiple Select)",
        type: "multiple" as const,
        disabled: false,
        variant: "outline" as const,
        value: [],
        items: [
            { value: "bold", icon: { component: Bold, props: { size: 16 } }, ariaLabel: "Toggle bold", disabled: false },
            { value: "italic", icon: { component: Italic, props: { size: 16 } }, ariaLabel: "Toggle italic", disabled: false },
            { value: "underline", icon: { component: Underline, props: { size: 16 } }, ariaLabel: "Toggle underline", disabled: false },
        ],
    },
];


    const cols = 3; // Количество колонок
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Toggle Group Showcase</h1>
        <p class="text-neutral-950 dark:text-white">A showcase of toggle group components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-{cols} gap-0">
        {#each examples as example, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(examples.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex items-center justify-center">
                    <ToggleGroup.Root
                        bind:value={example.value}
                        type={example.type}
                        disabled={example.disabled}
                        variant={example.variant}
                    >
                        {#each example.items as item}
                            <ToggleGroup.Item 
                                value={item.value} 
                                ariaLabel={item.ariaLabel} 
                                disabled={item.disabled} 
                                icon={item.icon} 
                            />
                        {/each}
                    </ToggleGroup.Root>
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{example.state}</p>
            </div>
        {/each}
    </div>
</div>
