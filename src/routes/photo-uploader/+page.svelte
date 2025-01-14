<script lang="ts">
	import PhotoUploader from '$lib/photo-uploader/photo-uploader.svelte';
	import Image from 'lucide-svelte/icons/image';

	// Данные для загрузчиков
	const uploaders = [
		{
			id: 1,
			title: 'Upload your profile pictures',
			description: 'Supported: PNG, JPEG. Max size: 10MB.',
			state: 'Profile Pictures',
		},
		{
			id: 2,
			title: 'Upload your documents',
			description: 'Supported: PNG, JPEG. Max size: 10MB.',
			state: 'Documents',
		},
	];
</script>

<div class="container mx-auto p-4">
	<div class="my-16 text-center" id="title">
		<h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">PhotoUploader Examples</h1>
		<p class="text-neutral-950 dark:text-white">A showcase of PhotoUploader components with dynamic data.</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
		{#each uploaders as uploader, index}
			<div
				class={`relative px-4 py-10 flex flex-col items-start justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
					${Math.ceil((index + 1) / 2) !== Math.ceil(uploaders.length / 2) ? 'border-b' : ''} 
					${index % 2 !== 0 ? 'border-l' : ''}`}
			>
				<div class="w-full">
					<!-- Компонент PhotoUploader -->
					<PhotoUploader
						icon={Image}
						iconProps={{ size: 48, strokeWidth: 1 }}
						title={uploader.title}
						description={uploader.description}
					/>
				</div>
				<p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{uploader.state}</p>
			</div>
		{/each}
	</div>
</div>

