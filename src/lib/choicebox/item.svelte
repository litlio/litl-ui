<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import { randomString } from '$lib/utils/random.js';
	import { getContext } from 'svelte';

	type propT = {
		defaultChecked?: boolean | undefined;
		disabled?: boolean | undefined;
		description?: string | undefined;
		title?: string | undefined;
		value: string;
	};
	let { defaultChecked, disabled = undefined, description, title, value }: propT = $props();

	// Switch props, the parent component

	type switchProps = {
		name: string;
		disabledParent?: boolean | undefined;
		type: 'radio' | 'checkbox' | undefined;
	};

	const groupState = getContext<{
		name: string;
		type: 'radio' | 'checkbox';
		disabledParent: boolean;
		get: () => string | Array<string>;
		set: (value: string | Array<string>) => void;
	}>('choicebox');

	const { name, type, disabledParent } = groupState;

	// If the parent is disabled then the child is disabled
	if (disabledParent) {
		disabled = true;
	}

	// If defaultChecked is set and value
	if (defaultChecked) {
		if (type === 'radio') {
			groupState.set(value);
		} else if (type === 'checkbox') {
			groupState.set([...groupState.get(), value]);
		}
	}

	const onchange = (evt: Event) => {
		const target = evt.currentTarget as HTMLInputElement;
		if (type == 'radio') {
			groupState.set(target.value);
		} else if (type == 'checkbox') {
			const arrStr = groupState.get() as Array<string>;
			const val = target.value;
			// if val is in the arrStr then remove it else add it
			if (arrStr.includes(val)) {
				groupState.set(arrStr.filter((item) => item !== val));
			} else {
				groupState.set([...arrStr, val]);
			}
		}
	};

	// random string for unique id
	const unique = `${randomString(4)}_${value}`;

	//When the selected class
	let labelClass = $derived.by(() => {
		// it is desabled
		if (disabled) {
			return ` cursor-not-allowed border-neutral-200 dark:border-neutral-400`;
		}
		if (groupState.get() === value || groupState.get().includes(value)) {
			return `cursor-pointer bg-sky-100 dark:bg-sky-800 border-sky-300  dark:border-sky-700 
			hover:border-sky-600 dark:hover:border-sky-600`;
		}
		return `cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 border-neutral-200 
		dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800`;
	});

	// Title text
	let titleClass = $derived.by(() => {
		// it is desabled
		if (disabled) {
			return `text-neutral-500 dark:text-neutral-500`;
		}
		if (groupState.get() === value || groupState.get().includes(value)) {
			return `text-sky-900 dark:text-sky-300`;
		}
		return `text-neutral-950 dark:text-neutral-400`;
	});

	// Description text
	let descriptionClass = $derived.by(() => {
		// it is desabled
		if (disabled) {
			return `text-neutral-500 dark:text-neutral-500`;
		}
		if (groupState.get() === value || groupState.get().includes(value)) {
			return `text-sky-900 dark:text-sky-300`;
		}
		return `text-neutral-900 dark:text-neutral-200`;
	});

	// The rounded radio cont
	let radioContClass = $derived.by(() => {
		// it is desabled
		if (disabled) {
			return `border-neutral-200 dark:border-neutral-700`;
		}

		if (groupState.get() === value) {
			return `border-sky-600  dark:border-sky-400 `;
		}
		return `border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-400 
		dark:group-hover:border-neutral-600 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900`;
	});

	// The radio cont
	let radioClass = $derived.by(() => {
		if (groupState.get() === value) {
			return `bg-sky-600  dark:bg-sky-400 `;
		}
		return ``;
	});

	// The rounded checkbox container
	let checkboxContClass = $derived.by(() => {
		// Если чекбокс отключён
		if (disabled) {
			return `border-neutral-200 dark:border-neutral-700`;
		}
		// Если чекбокс выбран
		if (groupState.get().includes(value)) {
			return `border-sky-600 dark:border-sky-400 bg-sky-600 dark:bg-sky-400`;
		}
		// Если чекбокс не выбран, но наведён
		return `border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-400 
		dark:group-hover:border-neutral-600 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900`;
	});

	// Checkbox content
	let checkboxClass = $derived.by(() => {
		if (groupState.get().includes(value)) {
			return `text-white dark:text-neutral-900 font-bold`;
		}
		return `text-transparent font-bold`;
	});

</script>

{#snippet radio()}
    {#if type === 'radio'}
        <div
            class="w-[16px] h-[16px] p-[1px] rounded-full transition-colors ease-in flex items-center justify-center border {radioContClass} "
        >
            <div class="w-[8px] h-[8px] rounded-full transition-colors ease-in {radioClass}">
                <input
                    {onchange}
                    {type}
                    checked={groupState.get() == value}
                    id={unique}
                    {name}
                    {value}
                    {disabled}
                    class="hidden"
                />
            </div>
        </div>
    {/if}
{/snippet}

{#snippet checkbox()}
	{#if type === 'checkbox'}
		<div
			class="w-[16px] h-[16px] rounded-[4px] transition-colors ease-in flex items-center justify-center border {checkboxContClass}"
		>
			<div class="w-full h-full flex items-center justify-center">
				<input
					{onchange}
					{type}
					checked={groupState.get().includes(value)}
					id={unique}
					{name}
					{value}
					{disabled}
					class="hidden"
				/>
				{#if groupState.get().includes(value)}
					<Check 
						size="12" 
						class="text-white transition-transform ease-in {checkboxClass}" 
					/>
				{/if}
			</div>
		</div>
	{/if}
{/snippet}

<label
	for={unique}
	class="group w-full transition-colors ease-in border flex  rounded-[6px] {labelClass} "
>
	<div class="w-full p-[12px] flex items-center justify-between">
		<div>
			{#if title}
				<p
					class="first-letter:capitalize ransition-colors ease-in text-sm {titleClass}  font-medium leading-6"
				>
					{title}
				</p>
			{/if}

			{#if description}
				<p
					class="first-letter:capitalize ransition-colors ease-in text-sm {descriptionClass} font-normal leading-6"
				>
					{description}
				</p>
			{/if}
		</div>
		{@render radio()}
		{@render checkbox()}
	</div>
</label>