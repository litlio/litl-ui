<script lang="ts">
    import { Modal } from "$lib/index.js";
    import Button from "$lib/button/button.svelte";

    let active = $state(false);

    let cards = [
        {
            id: 1,
            title: "Title",
            subtitle: "Subtitle",
            text: "Some content contained within the modal.",
            buttonProps: { variant: 'outline' as const },
            buttonCancel: "Cancel",
            buttonAction: "Next",
            state: "Modal Example",
        },
    ];

    const cols = 3;
</script>

<div class="container mx-auto p-4">
    <div class="my-16 text-center" id="title">
        <h1 class="mb-3 text-3xl font-extrabold text-neutral-950 dark:text-white md:text-4xl">Modal</h1>
        <p class="text-neutral-950 dark:text-white">A collection of modal dropdown components built with Svelte and TailwindCSS.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
        {#each cards as card, index}
            <div
                class={`relative px-4 py-10 flex flex-col items-center justify-center border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950
                    ${Math.ceil((index + 1) / cols) !== Math.ceil(cards.length / cols) ? "border-b" : ""} 
                    ${index % cols !== 0 ? "border-l" : ""}`}
            >
                <div class="flex flex-col items-center w-full">
                    <Button onclick={() => (active = true)} size="small">Open Modal</Button>
                    <Modal.Root bind:active>
                        <Modal.Content>
                            <Modal.Body>
                                <Modal.Header>
                                    <Modal.Title>{card.title}</Modal.Title>
                                    <Modal.Subtitle>{card.subtitle}</Modal.Subtitle>
                                </Modal.Header>
                                <Modal.Text>{card.text}</Modal.Text>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onclick={() => (active = false)} {...card.buttonProps}>{card.buttonCancel}</Button>
                                <Button onclick={() => (active = false)}>{card.buttonAction}</Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal.Root>
                </div>
                <!-- Отображение состояния -->
                <p class="absolute bottom-2 left-2 text-xs text-neutral-400 dark:text-neutral-600">{card.state}</p>
            </div>
        {/each}
    </div>
</div>
