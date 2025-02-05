<script lang="ts">
  import Embla from "$lib/embla/index.js";
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
  <div class="container max-w-lg mx-auto px-4 py-16">
    <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>      
    <Embla.Root>
      <Embla.Container>
        <Embla.Slide className="mr-[20px]">
          <div class="bg-red-100 h-32">
            <h1>Hi 1</h1>
          </div>
        </Embla.Slide>
        <Embla.Slide>
          <div class="bg-green-100 h-32">
            <h1>Hi 2</h1>
          </div>
        </Embla.Slide>
      </Embla.Container>
    
      <!-- Кнопки "Previous" и "Next" размещены под контейнером -->
      <div class="flex justify-between mt-4">
        <Embla.Previous className="bg-gray-800 text-white px-3 py-1 rounded-full">
          Prev
        </Embla.Previous>
        <Embla.Next className="bg-gray-800 text-white px-3 py-1 rounded-full">
          Next
        </Embla.Next>
      </div>
    </Embla.Root>
    
  </div>
</div>