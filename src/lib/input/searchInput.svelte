<script lang="ts">
	import Search from "../icons/Search.svelte";

	type propsT = {
		'aria-labelledby'?: string | undefined;
		value?: string | undefined;
		size?: 'small' | 'medium' | 'large';
		error?: string | undefined;
		disabled?: boolean | undefined;
		placeholder?: string | undefined;
	};
	let {
		'aria-labelledby': araiLabelledBy = undefined,
		value = $bindable(''),
		size = 'medium',
		error = undefined,
		disabled = false,
		placeholder = undefined
	}: propsT = $props();

	let hasRing = $state(false);

	const sizeObj = {
		small: 'h-[32px] text-sm',
		medium: 'h-[40px] text-sm',
		large: 'h-[48px] text-base'
	};
	let sizeClass = $derived.by(() => {
		return sizeObj[size];
	});

	let ringClass = $derived.by(() => {
		if (disabled) {
			return `cursor-not-allowed border-neutral-200 dark:border-neutral-400 
			bg-neutral-100 dark:bg-neutral-100`;
		}
		if (error) {
			return `border-red-700 dark:border-red-700 hover:border-red-700 
			dark:hover:border-ed-700 ring-4 ring-red-400 dark:ring-red-400 
			hover:ring-red-500 dark:hover:ring-red-500 `;
		}
		if (hasRing) {
			return `border-neutral-700 dark:border-neutral-700 ring-4 ring-neutral-400 
            dark:ring-neutral400 hover:border-neutral-700 dark:hover:border-neutral-700`;
		}
		return `border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700`;
	});
</script>

<div
	class="flex items-center {sizeClass} overflow-hidden transition-all border {ringClass} rounded-[6px]"
>
	<span class="h-full flex items-center px-3 text-neutral-700 dark:text-neutral-700">
		<div class="w-[16px] h-[16px]">
			<Search />
		</div>
	</span>
	<div class="w-full h-full pr-3">
		<input
			type="search"
			aria-labelledby={araiLabelledBy}
			bind:value
			{placeholder}
			{disabled}
			onfocus={() => {
				hasRing = true;
			}}
			onblur={() => {
				hasRing = false;
			}}
			class="w-full h-full outline-none bg-transparent capitalize placeholder:text-sm placeholder:text-neutral-600
             dark:placeholder:text-neutral-600"
		/>
	</div>
</div>