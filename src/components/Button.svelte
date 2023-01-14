<script lang="ts">
    import { Icon, LoadingSpinner } from "@components";
    import type { TooltipParams } from "@features/tooltip";
    import { tooltip as tt } from "@features/tooltip";
    
    type ButtonColor = "primary" | "secondary" | "danger" | "neutral";
    type ButtonSize = "s" | "m" | "l";
    
    interface ButtonColors {
        [key: ButtonColor]: {
            background: string;
            color: string;
        }
    }
    
    interface ButtonSizes {
        [key: ButtonSize]: {
            padding: string;
            fontSize: string;
        }
    }
    
    export let type: "text" | "iconSquare" | "iconCircle" | "floatingAction" = "text";
    export let icon: string | undefined = undefined;
    export let size: ButtonSize = "s";
    export let color: ButtonColor = "primary";
    export let style: "solid" | "outline" | "ghost" = "solid";
    export let href: string | undefined = undefined;
    export let tooltip: TooltipParams | undefined = undefined;
    export let iconOnRight = false;
    export let disabled = false;
    export let loading = false;
    export let fillWidth: boolean = false;
    export let noPadding = false;
    
    const BUTTON_COLORS: ButtonColors = {
        primary: {
            background: "var(--clr-primary)",
            color: "var(--clr-white)",
        },
        secondary: {
            background: "var(--clr-secondary)",
            color: "var(--clr-white)",
        },
        danger: {
            background: "var(--clr-danger)",
            color: "var(--clr-white)",
        },
        neutral: {
            background: "rgba(255, 255, 255, 0.08)",
            color: "var(--clr-grey-4)",
        },
    };
    const BUTTON_SIZES: ButtonSizes = {
        s: {
            padding: "1.1rem 2rem",
            fontSize: "var(--fs-s)",
        },
        m: {
            padding: "1.3rem 4rem",
            fontSize: "var(--fs-s)",
        },
        l: {
            padding: "1.6rem 8rem",
            fontSize: "var(--fs-r)",
        },
    };
    const BUTTON_RADIUS = {
        text: "var(--br-more)",
        iconSquare: "0.8rem",
        iconCircle: "50%",
        floatingAction: "50%",
    };
    const computeStyle = (): string => {
        const solid = style === "solid"; // extracted as check is done multiple times
        return `
            --background: ${BUTTON_COLORS[color].background};
            --color: ${BUTTON_COLORS[color].color};
            --padding: ${type === "text" ? BUTTON_SIZES[size].padding : BUTTON_SIZES[size].padding.split(" ")[0]};
            --font-size: ${BUTTON_SIZES[size].fontSize};
            --border-radius: ${BUTTON_RADIUS[type]};
            --width: ${fillWidth ? "100%" : "auto"};
        `
    };
</script>

<button
    class:ghost={style === "ghost"}
    class:icon={type !== "text"}
    class:noPadding
    class:outlined={style === "outlined"}
    {disabled}
    {href}
    on:click|preventDefault|stopPropagation
    on:dblclick
    on:mouseenter
    on:mouseleave
    style={computeStyle()}
    use:tt={tooltip}
>
    {#if loading}
        <LoadingSpinner size="s"/>
    {:else}
        {#if icon && !iconOnRight}
            <Icon name={icon} customSize="calc({BUTTON_SIZES[size].fontSize} + 4px)"/>
        {/if}
        
        {#if type === "text"}
            <span class="button-text"><slot/></span>
        {/if}
        
        {#if icon && iconOnRight}
            <Icon name={icon} customSize="calc({BUTTON_SIZES[size].fontSize} + 4px)"/>
        {/if}
    {/if}
</button>

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: var(--ts-quicker);
        user-select: none;
        background: var(--background);
        color: var(--color);
        padding: var(--padding);
        font-size: var(--font-size);
        font-weight: var(--fw-medium);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        width: var(--width);
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    button.toggled {
        transition: var(--ts-bounce);
        transform: scale(1.1);
        color: white;
    }
    
    button.outlined {
        background: transparent;
        color: var(--background);
        border: 2px solid var(--background);
        box-shadow: none;
    }
    
    button:not(:disabled, .outlined, .ghost):hover {
        filter: brightness(0.9);
    }
    
    button.outlined:not(:disabled):hover {
        background: var(--background);
        color: var(--color);
        box-shadow: var(--box-shadow);
    }
    
    button.ghost:not(:disabled) {
        background: transparent;
        color: var(--color);
        box-shadow: none;
        filter: brightness(0.8);
    }
    
    button.ghost:not(:disabled):hover {
        background: var(--background);
        filter: brightness(1);
    }
    
    button:not(:disabled):active {
        filter: brightness(0.7);
    }
    
    button:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
    
    button.noPadding {
        padding: 0;
    }
</style>