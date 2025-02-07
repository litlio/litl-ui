<script lang="ts">
	import { Menu } from "$lib/index.js";
    import FullModal from "$lib/full-modal/full-modal.svelte";

    // Любая логика: открыто / закрыто
	let isOpen = false;
	function openModal() {
		isOpen = true;
	}
	function closeModal() {
		isOpen = false;
	}
</script>

<!-- Фиксированный хедер -->
<header class="fixed top-0 left-0 w-full h-[60px] bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-lg z-50 flex items-center px-6 justify-between">
    
    <!-- Левое меню -->
    <Menu.Root>
        <Menu.Button aria-label="Left Menu" size="medium" variant="outline" class="px-4 py-2 rounded-md">
            Левое меню
        </Menu.Button>
        <Menu.Content class="w-[200px]">
            <Menu.Item>Пункт 1</Menu.Item>
            <Menu.Item>Пункт 2</Menu.Item>
            <Menu.Item>Пункт 3</Menu.Item>
        </Menu.Content>
    </Menu.Root>

    <!-- Центральное меню -->
    <Menu.Root>
        <Menu.Button aria-label="Center Menu" size="medium" variant="outline" class="px-4 py-2 rounded-md">
            Центр
        </Menu.Button>
        <Menu.Content class="w-[200px]">
            <Menu.Item>Пункт 1</Menu.Item>
            <Menu.Item>Пункт 2</Menu.Item>
            <Menu.Item>Пункт 3</Menu.Item>
        </Menu.Content>
    </Menu.Root>

    <!-- Правое меню -->
    <Menu.Root>
        <Menu.Button aria-label="Right Menu" size="medium" variant="outline" class="px-4 py-2 rounded-md">
            Правое меню
        </Menu.Button>
        <Menu.Content class="w-[200px]">
            <Menu.Item>Пункт 1</Menu.Item>
            <Menu.Item>Пункт 2</Menu.Item>
            <Menu.Item>Пункт 3</Menu.Item>
        </Menu.Content>
    </Menu.Root>

</header>

<!-- Основное содержимое -->
<main class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center pt-[80px]">
    <div class="container max-w-lg mx-auto px-4 py-16">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>
        <button onclick={openModal}>Открыть меню / модалку</button>

        <FullModal
            open={isOpen}
            title="Menu"
            onClose={closeModal}
        >
            <!-- передаваемое содержимое (Snippet) -->
            <ul class="space-y-2 text-lg">
                <li>Пункт 1</li>
                <li>Пункт 2</li>
                <li>Пункт 3</li>
            </ul>
        </FullModal>
    </div>
</main>
