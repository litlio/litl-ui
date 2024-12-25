<script lang="ts">
    import Label from "../label/label.svelte";

    type PropsT = {
        className?: string;
        width?: string;
        height?: string;
        size?: "base" | "sm" | "lg" | "xl";
        id?: string;
        debounce?: number;
        readonly?: boolean;
        required?: boolean;
        requiredSymbol?: string;
        autoResize?: boolean;
        resize?: boolean;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        onInput?: (value: string) => void;
        onDebounce?: (value: string) => void;
        onSubmit?: (value: string) => void;
    };

    let {
        className = '',
        width = "w-full",
        height = '',
        size = "base",
        id = '',
        debounce = 0,
        readonly = false,
        required = false,
        requiredSymbol = "*",
        autoResize = false,
        resize = true,
        value = $bindable(''),
        placeholder = "",
        disabled = false,
        onInput = () => {},
        onDebounce = () => {},
        onSubmit = () => {}
    }: PropsT = $props();

    let inputRef: HTMLTextAreaElement | null = null;
    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    const resizeTextArea = () => {
        if (autoResize && inputRef) {
            inputRef.style.height = 'auto';
            inputRef.style.height = `${inputRef.scrollHeight}px`;
        }
    };

    const handleInput = () => {
        if (inputRef) {
            value = inputRef.value;
            resizeTextArea();
            onInput(value);

            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout);
            }

            debounceTimeout = setTimeout(() => {
                onDebounce(value);
            }, debounce);
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit(value);
        }
    };

    $effect(() => {
        if (autoResize) {
            resizeTextArea();
        }
        return () => {
            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout);
            }
        };
    });
</script>

<div>
    <Label for={id} {required} {requiredSymbol} />

    <textarea
        {id}
        readonly={readonly}
        placeholder={placeholder}
        bind:this={inputRef}
        disabled={disabled}
        bind:value
        style="height: {height || 'auto'};"
        oninput={handleInput}
        onkeydown={handleKeydown}
        data-size={size}
        class={`w-full bg-white dark:bg-neutral-900 border border-neutral-200
            px-2 py-1 disabled:dark:border-neutral-700 disabled:dark:bg-neutral-800 disabled:dark:text-neutral-700
            disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400
            disabled:placeholder:text-neutral-400 dark:placeholder:text-neutral-600
            text-black dark:text-white dark:border-neutral-700 outline-none focus:border-neutral-200
            dark:focus:border-neutral-500 transition-all rounded-md
            ${resize ? '' : 'resize-none'} ${className} min-h-[64px}`}
    ></textarea>
</div>
