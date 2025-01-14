<script lang="ts">
    let {
        otp = $bindable<string[]>([]),
        length = 6,
        disabled = false,
        error = $bindable<string>(''),
    } = $props();

    $effect(() => {
        if (otp.length === 0) {
            otp = Array(length).fill('');
        }
    });


    let focusedIndex = $state<number>(0);
    let inputs: HTMLInputElement[] = [];

    function handleInput(event: Event, index: number) {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        if (error) error = '';
        if (!/^\d*$/.test(value)) return;
        otp[index] = value.slice(0, 1);

        if (value && index < length - 1) {
            focusedIndex = index + 1;
            inputs[index + 1]?.focus();
        }
    }

    function handleKeyDown(event: KeyboardEvent, index: number) {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            otp[index - 1] = '';
            focusedIndex = index - 1;
            inputs[index - 1]?.focus();
        }

        if (error) error = '';
    }

    $effect(() => {
        if (inputs[0] && focusedIndex === 0) {
            inputs[0].focus();
        }
    });
</script>

<div class="flex flex-col items-center space-y-2">
    <div
        class={`inline-flex items-center rounded-lg overflow-hidden 
            ${error ? 'border border-red-500 dark:border-red-500' : 'border border-neutral-300 dark:border-neutral-600'} 
            bg-white dark:bg-neutral-800`}
    >
        {#each Array(length).fill(0) as _, index}
        <input
            type="text"
            inputmode="numeric"
            maxlength="1"
            bind:value={otp[index]}
            oninput={(e) => handleInput(e, index)}
            onkeydown={(e) => handleKeyDown(e, index)}
            bind:this={inputs[index]}
            class={`w-10 h-10 text-center border-r last:border-r-0 
                ${error ? 'border-red-500 dark:border-red-500 text-red-500 dark:text-red-500' : 'border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white'} 
                focus:ring-0 focus:outline-none bg-transparent text-md font-medium`}
            disabled={disabled}
        />
        {/each}
    </div>
    {#if error}
        <p class="text-red-500 dark:text-red-500 text-sm">{error}</p>
    {/if}
</div>