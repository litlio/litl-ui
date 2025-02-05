<script lang="ts">
  import Embla from "$lib/embla/index.js";
  import { Card } from "$lib/index.js";

</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
  <div class="container max-w-lg mx-auto px-4 py-16">
    <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>      


    <Embla.Root className="w-full max-w-xs">
      <Embla.Container>
        {#each Array(10) as _, i (i)}
          <Embla.Slide>
            <div class="p-1">
              <Card.Root>
                <Card.Content
                  class="flex aspect-square items-center justify-center p-6"
                >
                  <span class="text-4xl font-semibold">{i + 1}</span>
                </Card.Content>
              </Card.Root>
            </div>
          </Embla.Slide>
        {/each}
      </Embla.Container>
    
      <!-- 🔥 Новый контейнер для кнопок и точек -->
      <div class="flex items-center justify-between mt-4">
        <!-- 🔹 Блок с кнопками -->
        <div class="flex gap-2">
          <Embla.Previous />
          <Embla.Next />
        </div>
    
        <!-- 🔹 Блок с точками -->
        <Embla.Dots />
      </div>
    </Embla.Root>
    
    
  </div>
</div>