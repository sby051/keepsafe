<script lang="ts">
    import { Icon, Separator } from "@components";
    import type { CSSPercentage, FontSize, FontWeight, TextAlignment } from "@types";
    
    // Formatting
    export let size: FontSize = "inherit";
    export let weight: FontWeight = "regular";
    export let alignment: TextAlignment = "left";
    export let letterSpacing = "auto";
    export let lineHeight = 1.2;
    export let customSize: string | undefined = undefined;
    export let monospace = false;
    export let italic = false;
    export let underline = false;
    export let capitalize = false;
    export let allUpper = false;
    export let allLower = false;
    export let wrap = false;
    
    // Styling
    export let color = "auto";
    export let icon = "";
    export let iconMuted = false;
    export let opacity: CSSPercentage | number | "auto" = "auto";
    export let comfoorta = false;
    export let shadow = false;
    export let underlineOnHover = false;
    export let selectable = false;
    export let iconColor = color;
    
    // Positioning
    export let iconOnRight = false;
    export let fillWidth = false;
    export let iconFilled = false;
    export let separator = false;
    
    const FONT_WEIGHTS = {
        "regular": "var(--fw-regular)",
        "medium": "var(--fw-medium)",
        "semiBold": "var(--fw-semibold)",
        "bold": "var(--fw-bold)"
    }
    
    const computeStyle = (): string => {
        return `
            --font-size: ${customSize ? customSize : `var(--fs-${size})`};
            --color: ${color};
            --font-weight: ${FONT_WEIGHTS[weight]};
            --line-height: ${lineHeight};
            --letter-spacing: ${letterSpacing}rem;
            --text-align: ${alignment};
            --opacity: ${opacity};
        `
    };

</script>

<span
    class="text"
    class:allLower
    class:allUpper
    class:capitalize
    class:comfoorta
    class:fillWidth
    class:iconFilled
    class:italic
    class:monospace
    class:selectable
    class:separator
    class:shadow
    class:underline
    class:underlineOnHover
    class:wrap
    on:click
    on:keydown
    style={computeStyle()}
>
    {#if icon && !iconOnRight}
        <Icon name="{icon}" filled={iconFilled} customSize="1.2em" color={iconColor} opacity={iconMuted ? "50%" : ""}/>
    {/if}
    
    <slot/>
    
    {#if icon && iconOnRight}
         <Icon name="{icon}" customSize="1.2em" color={iconColor} opacity={iconMuted ? "50%" : ""}/>
    {/if}
    
    {#if separator}
        <Separator/>
    {/if}
</span>

<style>
    .text {
        font-size: var(--font-size);
        font-weight: var(--font-weight);
        line-height: var(--line-height);
        align-items: center;
        user-select: none;
        text-align: var(--text-align);
        white-space: nowrap;
        letter-spacing: var(--letter-spacing);
        opacity: var(--opacity);
        color: var(--color);
        max-width: 100%;
        text-overflow: ellipsis;
        height: max-content;
        display: flex;
        gap: 0.3rem;
    }
    
    .text.separator {
        width: 100%;
    }
    
    .text.allLower {
        text-transform: lowercase;
    }
    
    .text.allUpper {
        text-transform: uppercase;
    }
    
    .text.capitalize {
        text-transform: capitalize;
    }
    
    .text.italic {
        font-style: italic;
    }
    
    .text.monospace {
        font-family: "DM Mono", monospace;
    }
    
    .text.underline {
        text-decoration: underline;
    }
    
    .text.wrap {
        white-space: normal;
    }
    
    .text.fillWidth {
        width: 100%;
    }
    
    .text.comfoorta {
        font-family: "Comfortaa", "Poppins", sans-serif;
    }
    
    .text.shadow {
        text-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.5);
    }
    
    .text.underlineOnHover:hover {
        text-decoration: underline;
    }
    
    .text.selectable {
        user-select: text;
    }

</style>