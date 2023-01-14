<script lang="ts">
    import { Icon, IconButton, Text } from "@components";
    import type { CSSVariable } from "@types";
    import { backInOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import type { ToastType } from "./toast";
    import { dismissToast, toastData } from "./toast";
    
    interface ToastStyle {
        color: CSSVariable;
        icon?: string;
    }
    
    const TOAST_STYLES: Record<ToastType, ToastStyle> = ({
        success: {
            color: "var(--clr-primary)",
            icon: "check_circle",
        },
        warning: {
            color: "var(--clr-warning)",
            icon: "warning",
        },
        error: {
            color: "var(--clr-danger)",
            icon: "error",
        },
        info: {
            color: "var(--clr-info)",
            icon: "info",
        },
        notification: {
            color: "var(--clr-primary)",
            icon: "bell",
        },
    });
</script>

{#if $toastData}
    <div
        class="toast"
        transition:fly={{ x: -80, duration: 500, easing: backInOut }}
    >
        <Icon
            name={TOAST_STYLES[$toastData.type].icon}
            size="l"
            color={TOAST_STYLES[$toastData.type].color}
        />
        
        <div class="toast__content">
            <Text
                size="s"
                lineHeight={1.2}
                weight="medium"
            >
                {@html $toastData.title}
            </Text>
            {#if $toastData.message}
                <Text
                    lineHeight={1.2}
                    wrap
                    size="xs"
                    opacity={0.8}
                >
                    {@html $toastData.message}
                </Text>
            {/if}
        </div>
        
        <div class="toast__dismiss-button">
            <IconButton icon="close" on:click={dismissToast}/>
        </div>
    </div>
{/if}

<style>
    .toast {
        position: fixed;
        z-index: var(--z-top);
        bottom: 2rem;
        left: 2rem;
        display: flex;
        justify-content: space-between;
        min-width: 25rem;
        max-width: 50vw;
        align-items: center;
        overflow: hidden;
        box-shadow: var(--shdw-medium-normal);
        padding: 1.2rem;
        background: white;
        gap: 1.5rem;
        border-radius: var(--br-more);
        outline: var(--brdr-thin-light);
        background: var(--clr-black-3);
    }
    
    .toast__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
    }
</style>
