<script lang="ts">
	import { type Snippet } from 'svelte';
    import X from 'lucide-svelte/icons/x';

	// Определяем тип пропсов
	type ModalProps = {
		open?: boolean;
		title?: string;
		onClose?: () => void;
		children?: Snippet;
	};

	// Извлекаем пропсы через $props<Тип>()
	let { open = false, title = 'Modal Title', onClose, children }: ModalProps = $props();

	// Локальная функция закрытия (вызываем колбэк, если передан)
	const handleClose = () => {
		onClose?.();
	};
</script>

{#if open}
	<!-- Тёмная полупрозрачная подложка -->
	<div class="fixed inset-0 bg-black/40 z-[999]">
		<!-- «Окно» модалки на весь экран -->
		<div class="absolute inset-0 bg-white dark:bg-neutral-900 z-[1000] flex flex-col p-4">
			<!-- Шапка с заголовком и кнопкой закрытия -->
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-lg font-semibold">{title}</h2>
				<button class="text-sm" onclick={handleClose}>
					<X size={20}/>
				</button>
			</header>

			<!-- Основная часть (контент) -->
			<main class="flex-1 overflow-y-auto">
				{#if children}
					{@render children()}
				{/if}
			</main>
		</div>
	</div>
{/if}
