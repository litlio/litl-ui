<script lang="ts">
	import PhotoUploader from '$lib/photo-uploader/photo-uploader.svelte';
	import Image from 'lucide-svelte/icons/image';
	import Button from "$lib/button/button.svelte";

	let uploadedFiles: File[] = [];

	// Метод для получения файлов из PhotoUploader
	function handleUpload(files: File[]) {
		uploadedFiles = files;
		console.log("Загруженные фотографии:", files);
	}

	// Метод для имитации отправки фотографий
	function sendPhotos() {
		if (uploadedFiles.length === 0) {
			console.log("Нет фотографий для отправки.");
		} else {
			console.log(`${uploadedFiles.length} фотографии отправлены:`, uploadedFiles);
		}
	}
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
	<div class="container max-w-lg mx-auto px-4 py-16">
		<h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

		<div class="w-full">
			<!-- Компонент PhotoUploader -->
			<PhotoUploader
				onUpload={handleUpload}
				icon={Image}
				iconProps={{ size: 48, strokeWidth: 1 }}
				title="Upload yout photos"
				description="Supported: PNG, JPEG. Max size: 10MB."
			/>

			<!-- Кнопка для имитации отправки -->
			 <Button variant="outline" full onclick={sendPhotos}>Send</Button>
		</div>
	</div>
</div>




