<script lang="ts">
	import Tooltip from '$lib/tooltip/index.js';
	import Button from '$lib/button/button.svelte';

</script>

<div class="min-h-screen bg-gray-100 dark:bg-neutral-900 text-black dark:text-white flex items-center justify-center">
	<div class="container max-w-md mx-auto px-4 py-16">
		<h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Tooltip Demo</h1>

		<div class="relative flex items-center justify-center w-full h-64 bg-neutral-200 dark:bg-neutral-800">
			<Tooltip.Provider delayDuration={400}>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="outline" size="small">Hover me</Button>
					</Tooltip.Trigger>
					<Tooltip.Content position="top">
            Привет, заебал.
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
	</div>
</div>

