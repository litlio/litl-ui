<script lang="ts">
	import { type Snippet } from 'svelte';

	type IconProps = {
		component: any;
		props?: Record<string, any>;
	};

	type propsT = {
		href: string;
		type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'warning';
		prefix?: IconProps | undefined;
		suffix?: IconProps | undefined;
		children?: Snippet | undefined;
	};
	let { href, type = 'outline', prefix = undefined, suffix = undefined, children = undefined }: propsT = $props();

	const typeObj = {
		primary: 'text-neutral-950 dark:text-neutral-200',
		secondary: 'text-neutral-950 dark:text-neutral-200',
		outline: 'text-neutral-950 dark:text-neutral-200',
		ghost: 'text-neutral-950 dark:text-neutral-200',
		error: 'text-red-600 dark:text-red-600',
		warning: 'text-amber-600 dark:text-amber-600'
	};
	let typeClass = $derived.by(() => {
		return typeObj[type];
	});
</script>

{#snippet prefixSnip()}
    {#if typeof prefix === 'object' && prefix?.component}
        {@const IconComponent = prefix.component}
        <div class="w-[16px] h-[16px] flex items-center justify-center mr-2 text-black dark:text-white">
            <IconComponent {...prefix.props} />
        </div>
    {/if}
{/snippet}

{#snippet suffixSnip()}
    {#if typeof suffix === 'object' && suffix?.component}
        {@const IconComponent = suffix.component}
        <div class="w-[16px] h-[16px] flex items-center justify-center ml-auto text-black dark:text-white">
            <IconComponent {...suffix.props} />
        </div>
    {/if}
{/snippet}

{#if children}
	<a
		{href}
		class="relative w-full cursor-pointer bg-transparent transition-colors text-sm flex items-center rounded-md py-3.5 lg:py-2.5 px-2 hover:bg-neutral-100 hover:dark:bg-neutral-800"
	>
		{@render prefixSnip()}
		<span class="first-letter:capitalize {typeClass} flex-1">
			{@render children()}
		</span>
		{@render suffixSnip()}
	</a>
{/if}

