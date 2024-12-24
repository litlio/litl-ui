<script lang="ts">
    import "../app.css";
    import ThemeSwitcher from "$lib/theme-switcher/theme-switcher.svelte";

    let { children } = $props();
</script>

<header class="w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
    <div class="container mx-auto flex items-center justify-between p-2">

        <div class="flex items-center">
            <a href="/" class="text-xl font-bold text-foreground hover:text-accent-foreground transition-colors">
                LitlUI
            </a>
        </div>


        <ThemeSwitcher/>
        <a href="https://github.com/litlio/litl-ui.git" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white text-normal">
            GitHub
        </a>
        
    </div>
</header>

{@render children()}