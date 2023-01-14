<script lang="ts">
    import type { CSSColor, CSSPercentage, CSSUnit, CSSVariable, FontSize } from "@types";
    
    export let name: string = "";
    export let size: FontSize | string = "r";
    export let customSize: CSSUnit | undefined = undefined;
    export let color: CSSColor | CSSVariable = "auto";
    export let opacity: CSSPercentage | number | "auto" = "auto";
    export let weight: "auto" | "normal" | "bold" = "auto";
    export let filled = false;
    
    const computeStyle = (): string => {
        return `
            font-size: ${customSize ?? "var(--fs-" + size + ")"};
            color: ${color};
            opacity: ${opacity};
            font-weight: ${weight};
            user-select: none;
        `
    };
</script>

<span class="material-symbols-outlined" class:filled style={computeStyle()}>
    {name}
</span>

<style>
    @import 'material-symbols';
    
    .material-symbols-outlined {
        display: inline-block;
        line-height: 1;
    }
    
    .filled {
        font-variation-settings: 'FILL' 1;
    }
</style>
