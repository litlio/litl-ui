<script lang="ts">
  import { ToggleGroup } from "$lib/index.js";
  let selectedValues = $state<string[]>([]);

    const toggleConfig = {
        type: "multiple" as const,
        disabled: false,
        rounded: true,
        variant: "outline" as const,
        items: [
            { value: "studio", children: "Студия", ariaLabel: "Toggle Studio" },
            { value: "1", children: "1", ariaLabel: "Toggle 1" },
            { value: "2", children: "2", ariaLabel: "Toggle 2" },
            { value: "3", children: "3", ariaLabel: "Toggle 3" },
            { value: "4", children: "4", ariaLabel: "Toggle 4" }
        ]
    };
    
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
<div class="container max-w-lg mx-auto px-4 py-16">
  <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

  <!-- Flex-контейнер для скелетонов -->
  <div class="flex items-center space-x-4">
    <ToggleGroup.Root
      bind:value={selectedValues}
      type={toggleConfig.type}
      disabled={toggleConfig.disabled}
      rounded={toggleConfig.rounded}
      variant={toggleConfig.variant}
      size="large"
  >
      {#each toggleConfig.items as item}
          <ToggleGroup.Item 
              value={item.value}
              ariaLabel={item.ariaLabel}
          >
              {item.children}
          </ToggleGroup.Item>
      {/each}
  </ToggleGroup.Root>

  </div>
</div>
</div>

  
  

   
  
  
  
  
  










