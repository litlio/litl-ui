<script lang="ts">
	import { switcher } from './theme-switcher.svelte.js';
	import LaptopMinimal from 'lucide-svelte/icons/laptop-minimal';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { randomString } from '$lib/utils/random.js';

	const randStr = randomString(8);

	const onchange = (evt: any) => {
		switcher.setTheme(evt.currentTarget.value);
	};

	let contBorder = $derived.by(() => {
		switch (switcher.theme) {
			case 'system':
				return 'border-r border-y';
			case 'light':
				return 'border';
			case 'dark':
				return 'border-l border-y';
			default:
				return 'border-r border-y';
		}
	});

	let [system, light, dark] = $derived.by(() => {
		switch (switcher.theme) {
			case 'system':
				return [
					'border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-white',
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white',
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white'
				];
			case 'light':
				return [
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white',
					'border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-white',
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white'
				];
			case 'dark':
				return [
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white',
					'text-neutral-900 dark:text-white hover:text-neutral-950 dark:hover:text-white',
					'border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-white'
				];
			default:
				return [
					'border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-white',
					'dark:text-white hover:text-neutral-950 dark:hover:text-white',
					'dark:text-white hover:text-neutral-950 dark:hover:text-white'
				];
		}
	});

	$effect(() => {
		// Проверяем сохранённую тему
		const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;

		if (storedTheme) {
			switcher.setTheme(storedTheme); // Устанавливаем сохранённую тему
		} else {
			// Если сохранённой темы нет, используем системную тему
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(systemTheme);
			switcher.setTheme('system');
		}
	});

	$effect(() => {
		const theme = switcher.theme;

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(systemTheme);
		} else {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(theme);
		}
	});
</script>

<span>
	<div
		class="w-[96px] h-[32px] rounded-full overflow-hidden flex items-center {contBorder} border-neutral-200 dark:border-neutral-800"
	>
		<div class="w-[32px] h-[32px]">
			<input
				{onchange}
				checked={switcher.theme === 'system'}
				id="theme-switch-system-{randStr}"
				type="radio"
				value="system"
				name="theme"
				class="hidden"
			/>
			<label
				for="theme-switch-system-{randStr}"
				class="w-full h-full rounded-full transition duration-0 {system} flex items-center justify-center cursor-pointer"
			>
				<LaptopMinimal size={16} />
			</label>
		</div>
		<div class="w-[32px] h-[32px]">
			<input
				{onchange}
				checked={switcher.theme === 'light'}
				id="theme-switch-light-{randStr}"
				type="radio"
				value="light"
				name="theme"
				class="hidden"
			/>
			<label
				for="theme-switch-light-{randStr}"
				class="w-full h-full rounded-full transition duration-0 {light} flex items-center justify-center cursor-pointer"
			>
				<Sun size={16} />
			</label>
		</div>
		<div class="w-[32px] h-[32px]">
			<input
				{onchange}
				checked={switcher.theme === 'dark'}
				id="theme-switch-dark-{randStr}"
				type="radio"
				value="dark"
				name="theme"
				class="hidden"
			/>
			<label
				for="theme-switch-dark-{randStr}"
				class="w-full h-full rounded-full transition duration-0 {dark} flex items-center justify-center cursor-pointer"
			>
				<Moon size={16} />
			</label>
		</div>
	</div>
</span>

