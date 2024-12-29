<script lang="ts">
  let { checked = false, color = "success", disabled = false }: { checked?: boolean; color?: keyof typeof COLORS; disabled?: boolean } = $props();

  const COLORS = {
    default: "bg-neutral-200 dark:bg-neutral-800", // Значение по умолчанию
    secondary: "enabled:aria-checked:bg-neutral-900 enabled:aria-checked:dark:bg-white",
    success: "enabled:aria-checked:bg-green-600 enabled:aria-checked:dark:bg-green-600",
    warning: "enabled:aria-checked:bg-orange-300 enabled:aria-checked:dark:bg-orange-400",
    error: "enabled:aria-checked:bg-red-500 enabled:aria-checked:dark:bg-red-600",
  } as const;

  const BASE_CLASSES =
    "h-[16px] w-[30px] rounded-xl relative transition-all border group border-transparent bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-800";

  const DISABLED_CLASSES =
    "dark:bg-neutral-800 border-neutral-200 cursor-not-allowed";

  let colorClass = $derived.by(() => COLORS[color] || COLORS.default);
  let disabledClass = $derived.by(() => (disabled ? DISABLED_CLASSES : ""));
  let switchClass = $derived.by(() => `${BASE_CLASSES} ${colorClass} ${disabledClass}`);

  function handleSwitch() {
    if (!disabled) {
      checked = !checked;
      dispatchEvent(new CustomEvent("change", { detail: { checked } }));
    }
  }
</script>

<div class="relative inline-block">
<input bind:checked type="checkbox" hidden />
<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-disabled={disabled}
  aria-label="switch"
  class="{switchClass}"
  onclick={handleSwitch}
>
  <div
    class="rounded-full size-3 transition-all bg-white dark:bg-neutral-950 absolute
        top-1/2 -translate-y-1/2 group-aria-[checked=false]:left-[1px] group-aria-checked:translate-x-[16px]"
  ></div>
</button>
</div>

  
  