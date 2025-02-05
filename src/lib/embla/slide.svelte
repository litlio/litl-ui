<script lang="ts">
    import type { Snippet } from "svelte";

    type propsT = {
        className?: string;
        size?: string; // Размер слайда (по умолчанию "100%")
        children: Snippet;
    };

    let { className = "", size = "100%", children }: propsT = $props();

    // ✅ Исправленный $derived.by() для правильного управления шириной слайдов
    let slideClasses = $derived.by(() => `
        flex-none min-w-0 
        ${size === "auto" ? "max-w-full flex-[0_0_auto]" : `flex-[0_0_${size}] w-full`}
    `);
</script>

<div class="{slideClasses} {className}">
    {@render children()}
</div>




  