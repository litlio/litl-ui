<script lang="ts">
	// Вместо deprecated ComponentType используем SvelteComponent
	import type { SvelteComponent } from "svelte";
	import X from 'lucide-svelte/icons/x';
	type IconType = new (...args: any) => SvelteComponent;

	type Image = {
		id: string;
		file: File;
		preview: string;
		loading: boolean;
	};

	type propsT = {
		onUpload?: (files: File[]) => void;
		onRemove?: (imageId: string) => void;
		maxFiles?: number;
		maxSizeMB?: number;
		icon?: IconType;
		iconProps?: Record<string, unknown>;
		title?: string;
		description?: string;
	};

	let {
		onUpload,
		onRemove = undefined,
		// По умолчанию теперь 20
		maxFiles = 20,
		maxSizeMB = 10,
		icon = undefined,
		iconProps = {},
		title = "Drag & drop or choose your images",
		description = undefined,
	}: propsT = $props();

	let images = $state<Image[]>([]);
	let errorMessage = $state<string | null>(null);
	let fileInput: HTMLInputElement | null = null;

	function generateUUID(): string {
		return `_${Math.random().toString(36).slice(2, 9)}`;
	}

	const handleDrop = async (event: DragEvent) => {
		event.preventDefault();
		errorMessage = null;
		const files = event.dataTransfer?.files;
		if (files) {
			await addFiles(Array.from(files));
		}
	};

	const handleInput = async (event: Event) => {
		errorMessage = null;
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files) {
			await addFiles(Array.from(files));
		}
	};

	const addFiles = async (files: File[]) => {
		for (const file of files) {
			if (images.length >= maxFiles) {
				errorMessage = `Maximum number of files: ${maxFiles}`;
				break;
			}

			if (file.size > maxSizeMB * 1024 * 1024) {
				errorMessage = `The file "${file.name}" exceeds ${maxSizeMB} MB`;
				continue;
			}

			const validTypes = ["image/png", "image/jpeg", "image/jpg"];
			if (!validTypes.includes(file.type)) {
				errorMessage = `Файл "${file.name}" has an unsupported format. Allowed: PNG, JPEG.`;
				continue;
			}

			const id = generateUUID();

			images.push({
				id,
				file,
				preview: "",
				loading: true,
			});

			const reader = new FileReader();
			reader.onload = () => {
				const img = images.find((img) => img.id === id);
				if (img) {
					img.preview = reader.result as string;
					img.loading = false;
				}
			};
			reader.readAsDataURL(file);
		}

		if (onUpload) {
			onUpload(files);
		}
	};

	const removeImage = (id: string) => {
		const index = images.findIndex((img) => img.id === id);
		if (index > -1) {
			URL.revokeObjectURL(images[index].preview);
			images.splice(index, 1);
			onRemove?.(id);

			if (images.length === 0) {
				errorMessage = null;
			}
		}
	};
</script>

<div class="w-full">
	<!-- drag & drop -->
	<div
		role="button"
		tabindex="0"
		aria-label="Drag and drop component"

		class="w-full border border-dashed bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-center hover:border-neutral-300 dark:hover:border-neutral-700 focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-colors flex flex-col items-center gap-2 md:p-8"
		ondragover={(event) => event.preventDefault()}
		ondrop={handleDrop}
		onclick={() => fileInput?.click()}
		onkeydown={(event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				fileInput?.click();
			}
		}}
	>
		<!-- icon -->
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent
				{...iconProps}
				class="text-neutral-400 dark:text-neutral-600"
				style="width: {iconProps?.size || '40px'}; height: {iconProps?.size || '40px'}"
			/>
		{/if}

		<!-- title -->
		<h3 class="text-neutral-900 dark:text-neutral-400 text-lg font-medium">{title}</h3>

		<!-- description -->
		{#if description}
			<p class="text-neutral-700 dark:text-neutral-600 text-sm">{description}</p>
		{/if}

		<!-- Input -->
		<input
			type="file"
			multiple
			accept="image/png,image/jpeg,image/jpg"
			class="hidden"
			bind:this={fileInput}
			onchange={handleInput}
		/>
	</div>

	<!-- Список превью — тоже на всю ширину -->
	<div class="w-full grid grid-cols-3 sm:grid-cols-4 gap-4 my-4">
		{#each images as { id, preview, loading }, index}
			<div class="relative w-full bg-gray-100 rounded-lg overflow-hidden aspect-square">
				{#if loading}
					<!-- spinner -->
					<div class="absolute inset-0 flex items-center justify-center bg-gray-200">
						<div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
					</div>
				{:else}
					<img src={preview} alt={`Image ${index + 1}`} class="w-full h-full object-cover" />
					<button
						class="absolute top-1 right-1 bg-black/40 backdrop-blur-md text-white hover:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
						onclick={() => removeImage(id)}
					>
						<X class="w-4 h-4" />
					</button>
				{/if}
			</div>
		{/each}
	</div>

	<!-- error -->
	{#if errorMessage}
		<div class="text-red-500 my-4 text-sm text-start">
			<p>{errorMessage}</p>
		</div>
	{/if}
</div>
