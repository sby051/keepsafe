<script lang="ts">    
    import { clickoutside } from "@utils/actions";

    // Value props
    export let position: string | undefined = undefined;
    export let padding: string | undefined = undefined;
    export let background: string | undefined = undefined;
    export let margin: string | undefined = undefined;
    export let border: string | undefined = undefined;
    export let gap: string | undefined = undefined;
    export let w: string | undefined = undefined;
    export let h: string | undefined = undefined;
    export let inset: string | undefined = undefined;
    export let flex: string | undefined = undefined;
    export let zIndex: string | undefined = undefined;
    
    // Trigger props
    export let fullW: boolean | undefined = undefined;
    export let fullVH: boolean | undefined = undefined;
    export let fullH: boolean | undefined = undefined;
    export let fullVW: boolean | undefined = undefined;
    export let rounded: boolean | undefined = undefined;
    export let roundedMore: boolean | undefined = undefined;
    export let shadow: boolean | undefined = undefined;
    export let column: boolean | undefined = undefined;
    export let centerX: boolean | undefined = undefined;
    export let centerY: boolean | undefined = undefined;
    export let scrollX: boolean | undefined = undefined;
    export let scrollY: boolean | undefined = undefined;
    export let spaceBetween: boolean | undefined = undefined;
    export let spaceEvenly: boolean | undefined = undefined;
    export let spaceAround: boolean | undefined = undefined;
    export let hugContent: boolean | undefined = undefined;
    export let wrap: boolean | undefined = undefined;
    
    const computeStyle = (): string => {
        return `
            --position: ${position};
            --padding: ${padding};
            --background: ${background};
            --margin: ${margin};
            --border: ${border};
            --gap: ${gap};
            --w: ${w};
            --h: ${h};
            --inset: ${inset};
            --flex: ${flex};
            --z-index: ${zIndex};
        `
    }
</script>

<div
    class:centerX
    class:centerY
    class:column
    class:fullH
    class:fullVH
    class:fullVW
    class:fullW
    class:hugContent
    class:rounded
    class:roundedMore
    class:scrollX
    class:scrollY
    class:shadow
    class:spaceAround
    class:spaceBetween
    class:spaceEvenly
    class:wrap
    on:click
    on:keydown
    on:keyup
    use:clickoutside
    on:clickoutside
    on:contextmenu
    on:mouseenter
    on:mouseleave
    on:mousemove
    style={computeStyle()}
>
    <slot/>
</div>

<style>
    div {
        display: flex;
        position: var(--position);
        padding: var(--padding);
        background: var(--background);
        margin: var(--margin);
        border: var(--border);
        gap: var(--gap);
        width: var(--w);
        height: var(--h);
        inset: var(--inset);
        flex: var(--flex);
        z-index: var(--z-index);
    }
    
    .wrap {
        flex-wrap: wrap;
        width: 100%;
    }
    
    .column {
        flex-direction: column;
    }
    
    .centerX {
        align-items: center;
    }
    
    .centerY {
        justify-content: center;
    }
    
    .hugContent {
        width: fit-content;
    }
    
    .fullW {
        width: 100%;
    }
    
    .fullVW {
        width: 100vw;
    }
    
    .fullH {
        height: 100%;
    }
    
    .fullVH {
        height: 100vh;
    }
    
    .rounded {
        border-radius: var(--br);
    }
    
    .roundedMore {
        border-radius: var(--br-more);
    }
    
    .shadow {
        box-shadow: var(--shdw-normal);
    }
    
    .scrollX {
        overflow-x: scroll;
        overflow-y: unset;
    }
    
    .scrollY {
        overflow: scroll;
        height: 100%;
    }
    
    .spaceBetween {
        justify-content: space-between;
    }
    
    .spaceEvenly {
        justify-content: space-evenly;
    }
    
    .spaceAround {
        justify-content: space-around;
    }
</style>