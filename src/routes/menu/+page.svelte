<script lang="ts">
    import { Menu } from "$lib/index.js";
    import Avatar from "$lib/avatar/avatar.svelte";
    import Plus from 'lucide-svelte/icons/plus';
    import Settings from 'lucide-svelte/icons/settings';
    import Logout from 'lucide-svelte/icons/log-out';

    type MenuCard = {
    id: number;
    action: 
        | { component: typeof Avatar | typeof Plus | typeof Settings; props: any } 
        | string;
    buttonProps: Record<string, any>;
    items: { link: string; value: string; prefix?: any; suffix?: any }[];
    state: string;
};


    let user = {
        name: "John Doe",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        size: 40,
    };

    let cards: MenuCard[] = [
        {
            id: 1,
            action: "Button",
            buttonProps: { 'aria-label': 'Menu', size: 'medium'},
            items: [
                { link: "#settings", value: "Settings" },
                { link: "#logout", value: "Logout" },
            ],
            state: "Circle Menu",
        },
        {
            id: 1,
            action: { component: Plus, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } },
            buttonProps: { 'aria-label': 'Menu', shape: 'circle', size: 'medium', variant: 'outline' },
            items: [
                { link: "#settings", value: "Settings" },
                { link: "#logout", value: "Logout" },
            ],
            state: "Circle Menu",
        },
        {
            id: 2,
            action: { component: Plus, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } },
            buttonProps: { 'aria-label': 'Menu', shape: 'square', size: 'medium', variant: 'outline' },
            items: [
                { link: "#settings", value: "Settings" },
                { link: "#logout", value: "Logout" },
            ],
            state: "Square Menu",
        },
        {
            id: 3,
            action: { component: Avatar, props: { name: user.name, img: user.img, size: user.size } },
            buttonProps: { 'aria-label': 'User menu', shape: 'circle', size: 'medium', variant: 'ghost' },
            items: [
                { link: "#profile", value: "Profile", prefix: Plus },
                { link: "#settings", value: "Settings", prefix: Settings },
                { link: "#logout", value: "Logout", prefix: Logout },
            ],
            state: "User Avatar Menu with Prefix",
        },
        {
            id: 4,
            action: { component: Avatar, props: { name: user.name, img: user.img, size: user.size } },
            buttonProps: { 'aria-label': 'User menu', shape: 'circle', size: 'medium', variant: 'ghost' },
            items: [
                { link: "#profile", value: "Profile", suffix: Plus },
                { link: "#settings", value: "Settings", suffix: Settings },
                { link: "#logout", value: "Logout", suffix: Logout },
            ],
            state: "User Avatar Menu with Suffix",
        },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">Menu</h1>
        <p class="text-muted-foreground">A collection of menu dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`px-4 py-12 flex items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 relative
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <!-- Component -->
                <div class="flex items-center justify-center w-full">
                    <Menu.Root>
                        <Menu.Button {...card.buttonProps}>
                            {#if typeof card.action === "object" && card.action.component}
                                <svelte:component this={card.action.component} {...card.action.props} />
                            {:else if typeof card.action === "string"}
                                {card.action}
                            {/if}
                        </Menu.Button>
                        
                        
                        <Menu.Content class="w-[200px]">
                            {#each card.items as item}
                                <Menu.Link 
                                    href={item.link} 
                                    prefix={item.prefix ? { component: item.prefix, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } } : undefined}
                                    suffix={item.suffix ? { component: item.suffix, props: { size: 16, strokeWidth: 1.5, ariaHidden: true } } : undefined}
                                >
                                    {item.value}
                                </Menu.Link>
                            {/each}
                        </Menu.Content>
                    </Menu.Root>
                </div>
                <!-- State -->
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-800">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

