<script lang="ts">
    import type { FontSize } from "@types";
    
    export let size: FontSize = "m";
</script>

<span class="loading-spinner" style={`--size: calc(var(--fs-${size}))`}>
</span>

<style>
    .loading-spinner {
        display: inline-block;
        box-sizing: border-box;
        width: var(--size);
        height: var(--size);
        animation: spin 1s linear infinite;
        border: 0.2em solid #ffffff;
        border-bottom-color: transparent;
        border-radius: 50%;
    }
</style>