<script lang="ts">
	// Импортируем только нужные типы
	import type { SvelteComponent } from 'svelte';
	import X from 'lucide-svelte/icons/x'; // для удаления изображений

	// Типы данных для изображений
	type Image = {
		id: string;
		file: File;
		preview: string;
		loading: boolean;
	};

	type IconType = new (...args: any) => SvelteComponent;

	type UploadProps = {
		onUpload?: (files: File[]) => void;
		onRemove?: (imageId: string) => void;
		maxFiles?: number;
		maxSizeMB?: number;
		icon?: IconType;
		iconProps?: Record<string, unknown>;
		title?: string;
		description?: string;
	};

	// Пропсы компонента
	let {
		onUpload,
		onRemove = undefined,
		maxFiles = 5,
		maxSizeMB = 5,
		icon = undefined,
		iconProps = {},
		title = "Drag & drop or choose your images",
		description = undefined,
	}: UploadProps = $props();

	// Состояния компонента
	let images = $state<Image[]>([]); // Состояние изображений
	let errorMessage = $state<string | null>(null); // Ошибка
	let fileInput: HTMLInputElement | null = null;

	// Генерация уникального id для каждого изображения
	function generateUUID(): string {
		return `_${Math.random().toString(36).slice(2, 9)}`;
	}

	// Обработка перетаскивания изображений
	const handleDrop = async (event: DragEvent) => {
		event.preventDefault();
		errorMessage = null;
		const files = event.dataTransfer?.files;
		if (files) {
			await addFiles(Array.from(files)); // Добавление файлов
		}
	};

	// Обработка выбора файлов через input
	const handleInput = async (event: Event) => {
		errorMessage = null;
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files) {
			await addFiles(Array.from(files)); // Добавление файлов
		}
	};

	// Добавление файлов в список изображений
	const addFiles = async (files: File[]) => {
		for (const file of files) {
			// Проверяем лимит файлов
			if (images.length >= maxFiles) {
				errorMessage = `Maximum number of files: ${maxFiles}`;
				break;
			}

			// Проверка размера файла
			if (file.size > maxSizeMB * 1024 * 1024) {
				errorMessage = `The file "${file.name}" exceeds ${maxSizeMB} MB`;
				continue;
			}

			// Проверка типа файла
			const validTypes = ["image/png", "image/jpeg", "image/jpg"];
			if (!validTypes.includes(file.type)) {
				errorMessage = `Файл "${file.name}" имеет неподдерживаемый формат. Разрешены: PNG, JPEG.`;
				continue;
			}

			const id = generateUUID(); // Генерация уникального id для изображения

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
					img.preview = reader.result as string; // Предпросмотр изображения
					img.loading = false;
				}
			};
			reader.readAsDataURL(file); // Чтение файла как data URL
		}

		if (onUpload) {
			onUpload(files); // Вызов внешней функции onUpload, если она передана
		}
	};

	// Удаление изображения
	const removeImage = (id: string) => {
		const index = images.findIndex((img) => img.id === id);
		if (index > -1) {
			URL.revokeObjectURL(images[index].preview); // Отмена создания объекта URL
			images.splice(index, 1); // Удаление изображения из списка
			onRemove?.(id); // Вызов onRemove, если он передан

			if (images.length === 0) {
				errorMessage = null; // Очистка ошибки, если список изображений пуст
			}
		}
	};
</script>

<div class="w-full">
	<!-- Drag & Drop зона -->
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
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent
				{...iconProps}
				class="text-neutral-400 dark:text-neutral-600"
				style="width: {iconProps?.size || '40px'}; height: {iconProps?.size || '40px'}"
			/>
		{/if}

		<h3 class="text-neutral-900 dark:text-neutral-400 text-lg font-medium">{title}</h3>

		{#if description}
			<p class="text-neutral-700 dark:text-neutral-600 text-sm">{description}</p>
		{/if}

		<input
			type="file"
			multiple
			accept="image/png,image/jpeg,image/jpg"
			class="hidden"
			bind:this={fileInput}
			onchange={handleInput}
		/>
	</div>

	<!-- Превью изображений -->
	<div class="w-full grid grid-cols-3 sm:grid-cols-4 gap-4 my-4">
		{#each images as { id, preview, loading }, index}
			<div class="relative w-full bg-gray-100 rounded-lg overflow-hidden aspect-square">
				{#if loading}
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

	{#if errorMessage}
		<div class="text-red-500 my-4 text-sm text-start">
			<p>{errorMessage}</p>
		</div>
	{/if}
</div>

