<script lang="ts">
	import type { Rotation } from "../types/ui.js";

	export let rotation: Rotation = "0deg";
	export let size: number = 24;
</script>

<svg
    aria-label="elipsis horisontal"
    style="transform: rotate({rotation}); display: inline;"
    width={size}
	height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >

    <path
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />

</svg>
  