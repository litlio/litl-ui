<script lang="ts">
    import OtpInput from "$lib/input/otpInput.svelte";

    let cards = [
        {
            id: 1,
            otpValue: [],
            error: '',
            state: 'Default',
        },
        {
            id: 2,
            otpValue: ['1', '2', '3', '4', '5', '6'],
            error: 'Invalid code entered',
            state: 'Error Active',
        },
    ];

    const cols = 2;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">OTP Input</h1>
        <p class="text-neutral-950 dark:text-white">Showcasing different OTP input states.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-{cols} gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex items-center justify-center border-neutral-300 dark:border-neutral-800
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex flex-col items-center space-y-4">
                    <OtpInput
                        length={6}
                        bind:otp={card.otpValue}
                        error={card.error}
                    />
                </div>
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>

