<script lang="ts">
    import "../app.css";
    import Button from "$lib/button/button.svelte";

    let { children } = $props();
</script>

<header class="w-full bg-white border-b border-neutral-200">
    <div class="container mx-auto flex items-center justify-between p-2">
        <!-- Логотип -->
        <div class="flex items-center">
            <a href="/" class="text-xl font-bold text-foreground hover:text-accent-foreground transition-colors">
                <!-- Логотип -->
                LitlUI
            </a>
        </div>

        <!-- Кнопка -->
        <a href="https://github.com/litlio/litl-ui.git" target="_blank" rel="noopener noreferrer" class="text-black text-normal">
            GitHub
        </a>
        
    </div>
</header>

{@render children()}