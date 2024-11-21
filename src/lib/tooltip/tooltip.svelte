<script lang="ts">
	import { getStringWidth } from "../utils/text.js";
	import type { Snippet } from 'svelte';

	type propsT = {
		position?: 'top' | 'bottom' | 'left' | 'right';
		text?: string;
		type?: 'success' | 'error' | 'warning' | 'violet' | undefined;
		class?: string | undefined;
		children?: Snippet;
	};
	let {
		position = 'top',
		text,
		type = undefined,
		class: klass = '',
		children = undefined
	}: propsT = $props();

	let widthClass = $state('width:250px');

	$effect(() => {
		if (text) {
			const num = getStringWidth(text);
			if (num < 250) {
				widthClass = 'width:' + (num + 24) + 'px'; // 24 is for the left 12px and right 12px padding
			}
		}
	});

	const positionObj = {
		top: `bottom-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-neutral-950 bg-neutral-900 dark:bg-neutral-50 after:content-[' ']
				after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px]
				after:border-t-neutral-950 after:dark:border-t-neutral-50 after:border-b-transparent
				after:border-x-transparent `,
		bottom: `top-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-neutral-950 bg-neutral-900 dark:bg-neutral-50 after:content-[' ']
				after:absolute after:bottom-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] 
				after:border-t-transparent after:border-b-neutral-950 after:dark:border-b-neutral-50 
				after:border-x-transparent `,
		left: `top-[50%] right-[125%] transform translate-y-[-50%] text-white 
				dark:text-neutral-950 bg-neutral-900 dark:bg-neutral-50 after:content-[' ']
				after:absolute after:top-[50%] after:left-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-neutral-950
				after:dark:border-l-neutral-50 after:border-r-transparent`,
		right: `top-[50%] left-[125%] transform translate-y-[-50%] text-white
				dark:text-neutral-950 bg-neutral-900 dark:bg-neutral-50 after:content-[' '] 
				after:absolute after:top-[50%] after:right-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-transparent after:border-r-neutral-950
				after:dark:border-r-neutral-50`
	};
	let positionStyle = $derived.by(() => {
		return positionObj[position];
	});

	const typeObj = {
		success: {
			top: `bottom-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-blue-700 dark:bg-blue-700 after:content-[' ']
				after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px]
				after:border-t-blue-700 after:dark:border-t-blue-700 after:border-b-transparent
				after:border-x-transparent `,
			bottom: `top-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-blue-700 dark:bg-blue-700 after:content-[' ']
				after:absolute after:bottom-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] 
				after:border-t-transparent after:border-b-blue-700 after:dark:border-b-blue-700 
				after:border-x-transparent `,
			left: `top-[50%] right-[125%] transform translate-y-[-50%] text-neutral-950 
				dark:text-white bg-blue-700 dark:bg-blue-700 after:content-[' ']
				after:absolute after:top-[50%] after:left-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-blue-700
				after:dark:border-l-blue-700 after:border-r-transparent`,
			right: `top-[50%] left-[125%] transform translate-y-[-50%] text-neutral-950
				dark:text-white bg-blue-700 dark:bg-blue-700 after:content-[' '] 
				after:absolute after:top-[50%] after:right-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-transparent after:border-r-blue-700
				after:dark:border-r-blue-700`
		},
		error: {
			top: `bottom-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-red-700 dark:bg-red-700 after:content-[' ']
				after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px]
				after:border-t-red-700 after:dark:border-t-red-700 after:border-b-transparent
				after:border-x-transparent `,
			bottom: `top-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-red-700 dark:bg-red-700 after:content-[' ']
				after:absolute after:bottom-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] 
				after:border-t-transparent after:border-b-red-700 after:dark:border-b-red-700 
				after:border-x-transparent `,
			left: `top-[50%] right-[125%] transform translate-y-[-50%] text-neutral-950
				dark:text-white bg-red-700 dark:bg-red-700 after:content-[' ']
				after:absolute after:top-[50%] after:left-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-red-700
				after:dark:border-l-red-700 after:border-r-transparent`,
			right: `top-[50%] left-[125%] transform translate-y-[-50%] text-neutral-950
				dark:text-white bg-red-700 dark:bg-red-700 after:content-[' '] 
				after:absolute after:top-[50%] after:right-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-transparent after:border-r-red-700
				after:dark:border-r-red-700`
		},
		warning: {
			top: `bottom-[125%] left-[50%] translate-x-[-50%] text-neutral-950 
				dark:text-neutral-950 bg-amber-500 dark:bg-amber-500 after:content-[' ']
				after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px]
				after:border-t-amber-500 after:dark:border-t-amber-500 after:border-b-transparent
				after:border-x-transparent `,
			bottom: `top-[125%] left-[50%] translate-x-[-50%] text-kui-light-black 
				dark:text-neutral-950 bg-amber-500 dark:bg-amber-500 after:content-[' ']
				after:absolute after:bottom-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] 
				after:border-t-transparent after:border-b-amber-500 after:dark:border-b-amber-500 
				after:border-x-transparent `,
			left: `top-[50%] right-[125%] transform translate-y-[-50%] text-neutral-950 
				dark:text-neutral-950 bg-amber-500 dark:bg-amber-500 after:content-[' ']
				after:absolute after:top-[50%] after:left-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-amber-500
				after:dark:border-l-amber-500 after:border-r-transparent`,
			right: `top-[50%] left-[125%] transform translate-y-[-50%] text-neutral-950
				dark:text-neutral-950 bg-amber-500 dark:bg-amber-500 after:content-[' '] 
				after:absolute after:top-[50%] after:right-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-transparent after:border-r-amber-500
				after:dark:border-r-amber-500`
		},
		violet: {
			top: `bottom-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-purple-700 dark:bg-purple-700 after:content-[' ']
				after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px]
				after:border-t-purple-700 after:dark:border-t-purple-700 after:border-b-transparent
				after:border-x-transparent `,
			bottom: `top-[125%] left-[50%] translate-x-[-50%] text-white
				dark:text-white bg-purple-700 dark:bg-purple-700 after:content-[' ']
				after:absolute after:bottom-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] 
				after:border-t-transparent after:border-b-purple-700 after:dark:border-b-purple-700 
				after:border-x-transparent `,
			left: `top-[50%] right-[125%] transform translate-y-[-50%] text-white
				dark:text-white bg-purple-700 dark:bg-purple-700 after:content-[' ']
				after:absolute after:top-[50%] after:left-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-purple-700
				after:dark:border-l-purple-700 after:border-r-transparent`,
			right: `top-[50%] left-[125%] transform translate-y-[-50%] text-white
				dark:text-white bg-purple-700 dark:bg-purple-700 after:content-[' '] 
				after:absolute after:top-[50%] after:right-[100%] after:mt-[-5px] after:border-[5px] 
				after:border-y-transparent after:border-l-transparent after:border-r-purple-700
				after:dark:border-r-purple-700`
		}
	};
	let typeStyle = $derived.by(() => {
		if (type && position) {
			return typeObj[type][position];
		}
		return '';
	});

	let tooltipStyle = $derived.by(() => {
		if (type) {
			return typeStyle;
		}
		return `${positionStyle}`;
	});
</script>

<span>
	<div class="group relative inline-block cursor-pointer text-neutral-950 dark:text-neutral-950 {klass}">
		{#if children}
			{@render children()}
		{/if}
		<div
			style={widthClass}
			class=" invisible group-hover:visible absolute {tooltipStyle} px-3 py-1.5 text-xs text-center rounded-[4px] z-[1000]"
		>
			{text || ''}
		</div>
	</div>
</span>