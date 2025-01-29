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
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
            ]
        },
        {
            id: 2,
            state: "Disabled Group",
            type: "multiple" as const,
            disabled: true,
            value: ["bold", "italic", "underline"],
            items: [
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: true,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: true,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: true,
                    mode: "iconOnly" as const
                }
            ]
        },
        {
            id: 3,
            state: "Group with Disabled Item",
            type: "multiple" as const,
            disabled: false,
            value: ["italic"],
            items: [
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: true,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
            ]
        },
        {
            id: 4,
            state: "Group with All Selected",
            type: "multiple" as const,
            disabled: false,
            value: ["bold", "italic", "underline"],
            items: [
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
            ]
        },
        {
            id: 5,
            state: "Group with Preselected Items",
            type: "multiple" as const,
            disabled: false,
            value: ["italic"],
            items: [
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
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
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
            ],
        },
        {
            id: 7,
            state: "Outline Group Rounded",
            type: "multiple" as const,
            disabled: false,
            rounded: true,
            variant: "outline" as const,
            value: [],
            items: [
                {
                    value: "bold",
                    icon: { component: Bold, props: { size: 16 } },
                    ariaLabel: "Toggle bold",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "italic",
                    icon: { component: Italic, props: { size: 16 } },
                    ariaLabel: "Toggle italic",
                    disabled: false,
                    mode: "iconOnly" as const
                },
                {
                    value: "underline",
                    icon: { component: Underline, props: { size: 16 } },
                    ariaLabel: "Toggle underline",
                    disabled: false,
                    mode: "iconOnly" as const
                }
            ],
        }
    ];

    const cols = 3;
</script>

<!-- Макет вывода -->
<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">
            Toggle Group Showcase
        </h1>
        <p class="text-neutral-950 dark:text-white">
            A showcase of toggle group components built with Svelte and TailwindCSS.
        </p>
    </div>

    <!-- Сетка в 3 колонки -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
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
                        rounded={example.rounded}
                        variant={example.variant}
                    >
                        {#each example.items as item}
                            <ToggleGroup.Item
                                value={item.value}
                                ariaLabel={item.ariaLabel}
                                disabled={item.disabled}
                                icon={item.icon}
                                mode={item.mode}
                            />
                        {/each}
                    </ToggleGroup.Root>
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">
                    {example.state}
                </p>
            </div>
        {/each}
    </div>
</div>

