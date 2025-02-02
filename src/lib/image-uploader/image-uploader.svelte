<script lang="ts">
	// Импорт типов и иконки
	import type { SvelteComponent } from 'svelte';
	import X from 'lucide-svelte/icons/x';

	// Тип для объектов изображений
	type Image = {
		id: string;
		file: File;
		preview: string;
		loading: boolean;
	};

	type IconType = new (...args: any) => SvelteComponent;

	// Тип пропсов компонента
	type ImageUploaderProps = {
		onUpload?: (files: File[]) => Promise<void> | void;
		onRemove?: (imageId: string) => void;
		maxFiles?: number;
		maxSizeMB?: number;
		allowedTypes?: string[];
		icon?: IconType;
		iconProps?: Record<string, unknown>;
		title?: string;
		description?: string;
		files?: FileList | null;
	};

	// Деструктуризация входных пропсов.
	// Для двусторонней привязки файлов используем $bindable с указанием типа.
	let {
		onUpload = undefined,
		onRemove = undefined,
		maxFiles = 18,
		maxSizeMB = 5,
		allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/avif", "image/webp"],
		icon = undefined,
		iconProps = {},
		title = "Drag & drop or choose your images",
		description = undefined,
		files = $bindable()
	}: ImageUploaderProps = $props();

	// Локальное реактивное состояние
	let images = $state<Image[]>([]);
	let errorMessages = $state<string[]>([]);
	let fileInput: HTMLInputElement | null = null;

	// Вспомогательная функция для генерации UUID
	function generateUUID(): string {
		if (typeof crypto !== 'undefined' && crypto.randomUUID) {
			return crypto.randomUUID();
		}
		return `_${Math.random().toString(36).slice(2, 9)}`;
	}

	// Обработка перетаскивания файлов (drag & drop)
	const handleDrop = async (event: DragEvent) => {
		event.preventDefault();
		errorMessages = [];
		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles) await processFiles(Array.from(droppedFiles));
	};

	// Обработка выбора файлов через input
	const handleInput = async (event: Event) => {
		errorMessages = [];
		const input = event.target as HTMLInputElement;
		const selectedFiles = input.files;
		if (selectedFiles) {
			await processFiles(Array.from(selectedFiles));
			input.value = '';
		}
	};

	// Валидация и фильтрация выбранных файлов
	const processFiles = async (filesArray: File[]) => {
		const newErrors: string[] = [];
		const validFiles: File[] = [];

		for (const file of filesArray) {
			if (images.length + validFiles.length >= maxFiles) {
				newErrors.push(`Maximum number of files: ${maxFiles}`);
				break;
			}

			if (file.size > maxSizeMB * 1024 * 1024) {
				newErrors.push(`"${file.name}": Exceeds ${maxSizeMB}MB`);
				continue;
			}

			if (!allowedTypes.includes(file.type)) {
				newErrors.push(`"${file.name}": Unsupported file type`);
				continue;
			}

			validFiles.push(file);
		}

		if (newErrors.length > 0) {
			errorMessages = [...errorMessages, ...newErrors];
		}

		if (validFiles.length > 0) {
			await addFiles(validFiles);
		}
	};

	// Добавление файлов в состояние и создание превью
	const addFiles = async (filesArray: File[]) => {
		const newImages = filesArray.map(file => ({
			id: generateUUID(),
			file,
			preview: "",
			loading: true
		}));

		// Обновляем состояние изображений
		images = [...images, ...newImages];

		// Для каждого файла создаём data URL через FileReader
		newImages.forEach(img => {
			const reader = new FileReader();
			reader.onload = () => {
				const image = images.find(i => i.id === img.id);
				if (image) {
					image.preview = reader.result as string;
					image.loading = false;
				}
			};
			reader.readAsDataURL(img.file);
		});

		// Если задан callback onUpload, вызываем его с массивом новых файлов
		if (onUpload) {
			try {
				await onUpload(filesArray);
			} catch (e) {
				errorMessages = [
					...errorMessages,
					e instanceof Error ? e.message : 'Upload failed'
				];
			}
		}
	};

	// Удаление изображения по идентификатору
	const removeImage = (id: string) => {
		const index = images.findIndex(img => img.id === id);
		if (index > -1) {
			images = images.filter(img => img.id !== id);
			onRemove?.(id);
			if (images.length === 0) {
				errorMessages = [];
			}
		}
	};

	// Флаги для предотвращения циклических обновлений между images и files
	let internalUpdate = false;
	let externalUpdate = false;

	$effect(() => {
	if (!internalUpdate && files) {
		// Если в files добавилось больше файлов, чем уже в images,
		// значит пользователь добавил новые файлы.
		if (files.length > images.length) {
			externalUpdate = true;
			// Определим, какие файлы новые.
			const existingFiles = images.map(img => img.file);
			const newFiles = Array.from(files).filter(file => !existingFiles.includes(file));
			// Добавляем только новые файлы.
			addFiles(newFiles).then(() => {
				externalUpdate = false;
			});
		}
		// Если files.length меньше или равно images.length,
		// значит файлы были удалены — в этом случае ничего не делаем.
	}
});

</script>

<!-- Разметка компонента -->
<div class="w-full">
	<div
		role="button"
		tabindex="0"
		aria-label="Drag and drop area"
		class="w-full border border-dashed bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-center hover:border-neutral-300 dark:hover:border-neutral-700 focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-colors flex flex-col items-center gap-2 md:p-8 min-h-[200px] md:min-h-[250px] justify-center"
		ondragover={(e) => e.preventDefault()}
		ondrop={handleDrop}
		onclick={() => fileInput?.click()}
		onkeydown={(e) => ['Enter', ' '].includes(e.key) && fileInput?.click()}
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
			accept={allowedTypes.join(',')}
			class="hidden"
			bind:this={fileInput}
			onchange={handleInput}
		/>
	</div>

	{#if images.length > 0}
		<div class="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 my-4">
			{#each images as { id, preview, loading }}
				<div class="relative w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square">
					{#if loading}
						<div class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
							<div class="w-6 h-6 border-2 border-gray-400 dark:border-gray-500 border-t-transparent rounded-full animate-spin"></div>
						</div>
					{:else}
						<img src={preview} alt="Preview" class="w-full h-full object-cover" />
						<button
							aria-label="Remove image"
							class="absolute top-1 right-1 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md transition-colors"
							onclick={(event) => {
								event.stopPropagation();
								removeImage(id);
							}}
						>
							<X class="w-4 h-4" />
						</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if errorMessages.length > 0}
		<div class="text-red-500 dark:text-red-400 my-4 text-sm text-start space-y-1">
			{#each errorMessages as message}
				<p>{message}</p>
			{/each}
		</div>
	{/if}
</div>
