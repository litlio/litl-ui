<script lang="ts">
    import Input from "$lib/input/input.svelte";
    let minPrice: string | number = '';
    let maxPrice: string | number = '';
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
  <div class="container max-w-lg mx-auto px-4 py-16">
    <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

    <!-- Flex-контейнер для скелетонов -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2">
        <!-- Инпут "От" -->
        <Input
            type="number"
            bind:value={minPrice}
            prefix="от"
            prefixStyling={false}
            class="!border-none !ring-0 !px-0 [&>div]:!h-auto"
        />
        
        <!-- Разделитель -->
        <div class="h-6 border-l border-neutral-200 mx-2"></div>
        
        <!-- Инпут "До" -->
        <Input
            type="number"
            bind:value={maxPrice}
            prefix="до"
            suffix="$"
            prefixStyling={false}
            suffixStyling={false}
            class="!border-none !ring-0 !px-0 [&>div]:!h-auto"
        />
    </div>
    </div>
  </div>
</div>

  
  

   
  
  
  
  
  










