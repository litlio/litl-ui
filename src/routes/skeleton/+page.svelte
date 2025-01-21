<script lang="ts">
    import Skeleton from "$lib/skeleton/skeleton.svelte";
  
    // Пример с данными для отображения скелетонов
    let cards = [
      { id: 1, name: "Default", type: "default" },
      { id: 2, name: "Rounded", type: "circle" },
    ];
  
    const cols = 3;
  </script>
  
  <div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
      <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Skeleton Loader</h1>
      <p class="text-neutral-950 dark:text-white">A showcase of skeleton loaders built with Svelte and TailwindCSS.</p>
    </div>
  
    <!-- Grid-контейнер для скелетонов -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {#each cards as card, index}
        <div
          class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                  ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                  ${index % cols !== 0 ? "border-l" : ""}`}
        >
          <div class="flex items-center justify-center">
            <!-- Скелетон в зависимости от типа -->
            <Skeleton
              class="w-12 h-12"
              pulse={true}
              rounded={card.type === 'circle'}
            />
          </div>
          <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.name}</p>
        </div>
      {/each}
    </div>    
  </div>
  