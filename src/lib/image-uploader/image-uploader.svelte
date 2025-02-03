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
		/** Callback, который получает список новых файлов с их id. Родитель может использовать id для сопоставления с S3-именем */
		onUpload?: (images: { id: string; file: File }[]) => Promise<void> | void;
		/** Callback, вызываемый при удалении файла (передаётся id) */
		onRemove?: (imageId: string) => void;
		maxFiles?: number;
		maxSizeMB?: number;
		allowedTypes?: string[];
		icon?: IconType;
		iconProps?: Record<string, unknown>;
		title?: string;
		description?: string;
		/** Для двусторонней привязки файлов. С  Svelte 5 можно использовать FileList */
		files?: FileList | null;
	};

	// Деструктуризация входных пропсов.
	// Используем $bindable() для двусторонней привязки файлов, чтобы родитель мог получать актуальное значение.
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

	// Функция для генерации уникального идентификатора
	function generateUUID(): string {
		if (typeof crypto !== 'undefined' && crypto.randomUUID) {
			return crypto.randomUUID();
		}
		return `_${Math.random().toString(36).slice(2, 9)}`;
	}

	// Обработка drag & drop.
	// Вместо непосредственного вызова processFiles мы обновляем переменную files – эффект ниже среагирует.
	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		errorMessages = [];
		const dt = new DataTransfer();
		if (event.dataTransfer?.files) {
			for (const file of event.dataTransfer.files) {
				dt.items.add(file);
			}
			// Присваиваем новый FileList привязанной переменной, что запустит эффект обработки.
			files = dt.files;
		}
	};

	// При изменении input’а можно, если нужно, сбрасывать ошибки.
	const handleInput = () => {
		errorMessages = [];
	};

	// Функция валидации и фильтрации выбранных файлов.
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

	// Функция добавления файлов: генерирует id, создаёт превью через FileReader и вызывает onUpload.
	const addFiles = async (filesArray: File[]) => {
		const newImages = filesArray.map(file => ({
			id: generateUUID(),
			file,
			preview: "",
			loading: true
		}));

		// Обновляем локальное состояние изображений.
		images = [...images, ...newImages];

		// Создаём превью для каждого файла.
		newImages.forEach(img => {
			const reader = new FileReader();
			reader.onload = () => {
				const idx = images.findIndex(i => i.id === img.id);
				if (idx !== -1) {
					images[idx].preview = reader.result as string;
					images[idx].loading = false;
				}
			};
			reader.readAsDataURL(img.file);
		});

		// Вызываем onUpload с уже сгенерированными id.
		if (onUpload) {
			try {
				await onUpload(newImages.map(({ id, file }) => ({ id, file })));
			} catch (e) {
				errorMessages = [
					...errorMessages,
					e instanceof Error ? e.message : 'Upload failed'
				];
			}
		}
	};

	// Удаление изображения по id.
	const removeImage = (id: string) => {
		images = images.filter(img => img.id !== id);
		onRemove?.(id);
		if (images.length === 0) {
			errorMessages = [];
		}
	};

	// Флаги для предотвращения циклических обновлений между images и files.
	let internalUpdate = false;
	let externalUpdate = false;
	// Для отслеживания предыдущего количества файлов в bound файлах.
	let prevFilesLength = 0;

	// Эффект 1: При изменении массива images обновляем привязанный FileList.
	$effect(() => {
		if (!externalUpdate) {
			const dt = new DataTransfer();
			images.forEach(img => dt.items.add(img.file));
			const computedFiles = dt.files;
			if (!files || files.length !== computedFiles.length) {
				internalUpdate = true;
				files = computedFiles;
				internalUpdate = false;
			}
		}
	});

	// Эффект 2: Если внешний FileList изменился (например, через input или drag & drop),
	// обрабатываем новые файлы, которых ещё нет в images.
	$effect(() => {
		if (!internalUpdate && files) {
			if (files.length > prevFilesLength) {
				externalUpdate = true;
				const existingFiles = images.map(img => img.file);
				// Выбираем только те файлы, которые ещё не добавлены
				const newFiles = Array.from(files).filter(file => !existingFiles.includes(file));
				if (newFiles.length > 0) {
					addFiles(newFiles).then(() => {
						externalUpdate = false;
						prevFilesLength = files ? files.length : 0;
					});
				} else {
					prevFilesLength = files.length;
				}
			} else {
				prevFilesLength = files.length;
			}
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

		<!-- Здесь используется привязка files, чтобы родитель мог получать FileList, а изменения автоматически обрабатывались -->
		<input
			type="file"
			multiple
			accept={allowedTypes.join(',')}
			class="hidden"
			bind:this={fileInput}
			bind:files={files}
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
