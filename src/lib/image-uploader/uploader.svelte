<script lang="ts">
	import X from 'lucide-svelte/icons/x';
	import type { SvelteComponent } from 'svelte';

	type Image = {
		id: string;
		file: File;
		preview: string;
		loading: boolean;
	};

	type IconType = new (...args: any) => SvelteComponent;

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
		value?: Array<{ id: string; file: File }>;
	};

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
		value = $bindable<Array<{ id: string; file: File }>>([])
	}: ImageUploaderProps = $props();

	let images = $state<Image[]>([]);
	let errorMessages = $state<string[]>([]);
	let fileInput: HTMLInputElement | null = null;

	// Синхронизация с внешним значением
	$effect(() => {
		const newFiles = value.filter(v => !images.some(img => img.id === v.id));
		if (newFiles.length > 0) {
			addFiles(newFiles.map(nf => nf.file));
		}
	});

	function generateUUID(): string {
		return crypto.randomUUID();
	}

	const handleDrop = async (event: DragEvent) => {
		event.preventDefault();
		errorMessages = [];
		const files = event.dataTransfer?.files;
		if (files) await processFiles(Array.from(files));
	};

	const handleInput = async (event: Event) => {
		errorMessages = [];
		const files = (event.target as HTMLInputElement).files;
		if (files) {
			await processFiles(Array.from(files));
			if (fileInput) fileInput.value = '';
		}
	};

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

		errorMessages = [...errorMessages, ...newErrors];
		if (validFiles.length > 0) await addFiles(validFiles);
	};

	const addFiles = async (filesArray: File[]) => {
		const newImages = filesArray.map(file => ({
			id: generateUUID(),
			file,
			preview: "",
			loading: true
		}));

		images = [...images, ...newImages];
		value = [...value, ...newImages.map(img => ({ id: img.id, file: img.file }))];

		for (const img of newImages) {
			const reader = new FileReader();
			reader.onload = () => {
				img.preview = reader.result as string;
				img.loading = false;
			};
			reader.readAsDataURL(img.file);
		}

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

	const removeImage = (id: string) => {
		images = images.filter(img => img.id !== id);
		value = value.filter(v => v.id !== id);
		onRemove?.(id);
		if (images.length === 0) errorMessages = [];
	};

	const handleDragOver = (e: DragEvent) => e.preventDefault();
</script>

<div class="w-full">
	<div
		role="button"
		tabindex="0"
		aria-label="Drag and drop area"
		class="w-full border border-dashed bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-center hover:border-neutral-300 dark:hover:border-neutral-700 focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-colors flex flex-col items-center gap-2 md:p-8 min-h-[200px] md:min-h-[250px] justify-center"
		ondragover={handleDragOver}
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