<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { setContext } from 'svelte';
  import { createCarouselState } from './root.svelte.js';
  import type { Snippet } from 'svelte';

  type propsT = {
      className?: string;
      options?: Record<string, unknown>;
      plugins?: any[];
      children: Snippet;
  };

  let { className = "", options = { loop: false, align: 'center', speed: 0 }, plugins = [], children }: propsT = $props();

  // ✅ Создаем экземпляр карусели
  const carouselState = createCarouselState();

  // ✅ Устанавливаем контекст во время инициализации, а не в onInit
  setContext("carouselState", carouselState);

  function onInit(event: CustomEvent) {
      carouselState.set(event.detail); // Передаем API Embla в set()
  }
</script>

<div class="relative">
  <div class="overflow-hidden {className}" use:emblaCarouselSvelte={{ options, plugins }} onemblaInit={onInit}>
      {@render children()}
  </div>
</div>