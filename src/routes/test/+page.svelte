<script lang="ts">
	import { ToggleGroup } from "$lib/index.js";
</script>

<div class="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white flex items-center justify-center">
	<div class="container max-w-lg mx-auto px-4 py-16">
		<h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>
		<div class="p-1 border border-neutral-200 dark:border-neutral-700 rounded-xl inline-flex items-center gap-4">
		<ToggleGroup.Root type="multiple">
			<ToggleGroup.Item value="studio" ariaLabel="studio">Studio</ToggleGroup.Item>
			<ToggleGroup.Item value="one" ariaLabel="two">1</ToggleGroup.Item>
			<ToggleGroup.Item value="two" ariaLabel="two">2</ToggleGroup.Item>
			<ToggleGroup.Item value="three" ariaLabel="three">3</ToggleGroup.Item>
			<ToggleGroup.Item value="four" ariaLabel="four">4+</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
	</div>
</div>



