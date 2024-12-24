<script lang="ts">
    import ArrowRight from 'lucide-svelte/icons/arrow-right';

    const menuItems = [
        { name: 'Avatar', href: '/avatar' },
        { name: 'Badge', href: '/badge' },
        { name: 'Button', href: '/button' },
        { name: 'Checkbox', href: '/checkbox' },
        { name: 'Input', href: '/input' },
        { name: 'Input Search', href: '/input-search' },
        { name: 'Input Otp', href: '/input-otp' },
        { name: 'Select', href: '/select' },
        { name: 'Accordion', href: '/accordion' },
        { name: 'Card', href: '/card' },
        { name: 'Menu', href: '/menu' },
        { name: 'Modal', href: '/modal' },
        { name: 'Progress', href: '/progress' },
        { name: 'Tabs', href: '/tabs' },
        { name: 'Toggle', href: '/toggle' },
        { name: 'TextArea', href: '/textarea' },
        { name: 'Context Menu', href: '/context-menu' },
        { name: 'Scroll Area', href: '/scroll-area' },
        { name: 'Separator', href: '/separator' },
        { name: 'Tooltip', href: '/tooltip' },
        { name: 'Test', href: '/test' },
    ];
</script>

<main class="bg-neutral-50 dark:bg-neutral-950 flex justify-center p-4">
    <div class="w-[600px] flex flex-col gap-4">

        <section class="text-left py-12 bg-neutral-50 dark:bg-neutral-950">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
                    Beautiful UI components built with Tailwind CSS and Svelte
                </h1>
                <p class="mt-4 text-md text-neutral-500 dark:text-neutral-400">
                    Litl UI - Svelte is a thoughtfully crafted library of Svelte 5 components designed to help you build modern and responsive user interfaces effortlessly. 
                </p>
            </div>
        </section>
        
        
        <nav>
            <ul class="flex flex-col gap-2">
                {#each menuItems as { name, href }}
                    <li>
                        <a href={href} 
                           class="inline-flex w-full items-center justify-between text-black dark:text-white whitespace-nowrap rounded-lg border border-neutral-200 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 p-4 font-semibold shadow-sm shadow-black/[0.04] ring-offset-background transition-colors hover:bg-white dark:hover:bg-neutral-950 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-14">
                            {name}
                            <ArrowRight size={16} />
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</main>
