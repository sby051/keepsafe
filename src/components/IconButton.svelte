<script lang="ts">
    import { Icon } from "@components";
    import { tooltip as tt } from "@features/tooltip";
    import type { FontSize } from "@types";
    import type { TooltipPosition } from "@features/tooltip/types";
    
    export let icon: string;
    export let size: FontSize = "m";
    export let color = "var(--clr-grey-4)";
    export let muted = false;
    export let disabled = false;
    export let filled = false;
    export let href = "";
    export let tooltip: string | undefined = undefined;
    export let tooltipPosition: TooltipPosition | undefined = undefined;
</script>

<button
    class="icon-button"
    class:muted
    {disabled}
    {href}
    on:click|preventDefault|stopPropagation
    data-tooltip={tooltip}
    data-tooltip-position={tooltipPosition}
    use:tt
>
    <Icon {color} {filled} name={icon} {size}/>
</button>

<style>
    .icon-button {
        all: unset;
        font-size: var(--fs-m);
        display: grid;
        cursor: pointer;
        transition: var(--ts-quicker);
        border-radius: 50%;
        place-items: center;
        position: relative;
    }
    
    .icon-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    
    .icon-button:hover {
        background: var(--color);
        color: white;
    }
    
    .icon-button:active {
        transition: var(--ts-quicker);
        animation: pulse 120ms forwards;
        filter: brightness(0.7);
    }
</style>