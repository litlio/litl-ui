<script lang="ts">
    import Skeleton from "$lib/skeleton/skeleton.svelte";  // Импортируем компонент Skeleton
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
  <div class="container max-w-lg mx-auto px-4 py-16">
    <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

    <!-- Flex-контейнер для скелетонов -->
    <div class="flex items-center space-x-4">
      <!-- Круглый скелетон -->
      <Skeleton rounded class="w-12 h-12" />

      <!-- Прямоугольные скелетоны -->
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</div>

  
  

   
  
  
  
  
  










