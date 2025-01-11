<script lang="ts">
	import { ChoiceBox } from "$lib/index.js";
	let value: string | string[]  = $state('');
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
	<div class="container max-w-lg mx-auto px-4 py-16">
		<h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

			<div class="w-full">
				<ChoiceBox.Group label="Property type" type="radio" bind:value>
					<ChoiceBox.Item defaultChecked  title="Apartment" value="apartment" />
					<ChoiceBox.Item  title="House" value="house" />
				</ChoiceBox.Group>
			</div>

	</div>
</div>



