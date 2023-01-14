<script context="module">
    export let count = 0;
</script>

<script lang="ts">
    import { clickoutside, escape } from "@utils/actions";
    import { circInOut } from "svelte/easing";
    import { fade, scale, slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    
    export let overlay = true;
    export let open = false;
    export let width = "50vw";
    export let height: string | undefined = undefined;
    
    const dispatch = createEventDispatcher();
    
    const handleClose = () => {
        open = false;
        dispatch("close");
    };
    
    count += 1;
</script>

{#if open}
    <div
        class="modal"
        class:overlay
        in:scale={{duration: 200, easing: circInOut}}
        on:clickoutside={handleClose}
        on:escape={handleClose}
        out:slide={{duration: 200, easing: circInOut}}
        style="--modalCount: {count}; --width: {width}; --height: {height};"
        use:clickoutside
        use:escape
    >
        <slot/>
    </div>
    
    {#if overlay}
        <div class="modal__overlay" transition:fade={{duration: 300}}></div>
    {/if}
{/if}

<style>
    .modal {
        position: fixed;
        z-index: calc(var(--z-modal) + var(--modalCount));
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: var(--shdw-large-soft);
        overflow: hidden;
        border-radius: var(--br-more);
        outline: var(--brdr-thin-light);
        background: var(--clr-black-2);
        width: var(--width);
        height: var(--height);
    }
    
    .modal__overlay {
        position: absolute;
        z-index: 32;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.50);
        gap: 3rem;
    }
    
    .modal.overlay {
        border: none;
        box-shadow: none;
    }
</style>
