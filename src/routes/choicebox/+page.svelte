<script lang="ts">
	import { ChoiceBox } from "$lib/index.js";

	// Создаём реактивную переменную для хранения значений
	let values = $state<Record<number, string>>({
		1: "apartment",
		2: "brick",
	});

	let cards = [
		{
			id: 1,
			label: "Property type",
			type: "radio" as const,
			options: [
				{ value: "apartment", title: "Apartment" },
				{ value: "house", title: "House" },
			],
			state: "Property Selection",
		},
		{
			id: 2,
			label: "Building type",
			type: "checkbox" as const,
			options: [
				{ value: "brick", title: "Brick" },
				{ value: "panel", title: "Panel" },
				{ value: "monolithic", title: "Monolithic" },
			],
			state: "Building Selection",
		},
	];

	const cols = 2; // Количество колонок
</script>

<div class="container mx-auto p-4">
	<div class="my-16 text-center" id="title">
		<h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">ChoiceBox Examples</h1>
		<p class="text-neutral-950 dark:text-white">A showcase of ChoiceBox components with dynamic data.</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-{cols} gap-0">
		{#each cards as card, index}
			<div
				class={`relative px-4 py-10 flex flex-col items-start justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
					${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
					${index % cols !== 0 ? "border-l" : ""}`}
			>
				<div class="w-full">
					<!-- Группа ChoiceBox -->
					<ChoiceBox.Group 
						label={card.label} 
						type={card.type} 
						bind:value={values[card.id]}
					>
						{#each card.options as option}
							<ChoiceBox.Item 
								title={option.title} 
								value={option.value} 
							/>
						{/each}
					</ChoiceBox.Group>
				</div>
				<p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
			</div>
		{/each}
	</div>
</div>
