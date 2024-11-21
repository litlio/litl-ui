<script lang="ts">
    import { clickAnywhere } from '../utils/event.js';
    import { fade } from 'svelte/transition';
    import { createRootState } from './root.svelte.js';
    import { setContext, type Snippet } from 'svelte';

    type propsT = {
        class?: string | undefined;
        alignment?: 'left' | 'right' | undefined;
        children: Snippet | undefined;
    };

    let { class: klass = '', alignment = 'left', children = undefined }: propsT = $props();

    const rootState = createRootState({
        isMobile: false,
        isActive: false,
        alignment: alignment,
        x: 0,
        y: 0
    });

    setContext('contextMenu', rootState);

    // Эффект для обработки изменения ширины окна
    $effect(() => {
        if (typeof window === 'undefined') return; // Проверяем, что это клиент
        rootState.setIsMobile(window.innerWidth < 767);

        const resizeHandler = () => rootState.setIsMobile(window.innerWidth < 767);
        window.addEventListener('resize', resizeHandler);

        // Убираем обработчик при удалении эффекта
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    });

    // Эффект для clickAnywhere
    $effect(() => {
        if (typeof document === 'undefined') return; // Проверяем, что это клиент

        const destroyClickAnywhere = clickAnywhere(() => {
            rootState.setIsActive(false);
        });

        // Убираем обработчик при удалении эффекта
        return () => {
            destroyClickAnywhere.destroy();
        };
    });
</script>

{#if rootState.getIsActive()}
    <div
        in:fade|local
        out:fade|local
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.4] lg:hidden z-[1000]"
    ></div>
{/if}

<div class="relative inline-block {klass}">
    {#if children}
        {@render children()}
    {/if}
</div>
