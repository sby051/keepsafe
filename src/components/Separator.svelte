<script lang="ts">
    export let direction: "horizontal" | "vertical" = "horizontal";
    export let invisible = false;
</script>

<div class="separator {direction}"></div>

<style>
    .separator {
        background: var(--clr-grey-1);
        z-index: 0;
    }
    
    .separator.horizontal {
        width: 100%;
        height: 0.1rem;
    }
    
    .separator.vertical {
        width: 0.1rem;
        height: 50%;
    }
    
    .invisible {
        opacity: 0;
    }
</style>
