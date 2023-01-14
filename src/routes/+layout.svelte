<script lang="ts">
    import { Toast } from "@features/toast";
    import { Confirm } from "@features/confirm";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { LoadingSpinner, Text } from "@components";
    import { blur } from "svelte/transition";

    const IDLE_TIMEOUT = 1000 * 60 * 2; // 5 minutes

    let loading = true;
    let isIdle = false;
    let idleTimeout: NodeJS.Timer | null = null;

    const handleBlur = async () => {
        idleTimeout = setTimeout(() => {
            isIdle = true;
        }, IDLE_TIMEOUT);
    };

    const handleFocus = () => {
        isIdle = false;
        clearTimeout(idleTimeout as any);
    };

    onMount(async () => {
        if (!browser) return;
        await goto("/auth");
        loading = false;
    });
</script>

<svelte:window on:blur="{handleBlur}" on:focus|once="{() => (isIdle = false)}" />

<svelte:head>
    {#if isIdle}
        <meta name="robots" content="noindex" />
        <title>IDLE - KeepSafe</title>
    {:else}
        <title>KeepSafe</title>
    {/if}
</svelte:head>

<div class="layout">
    <Toast />
    <Confirm />

    {#if loading}
        <div class="center">
            <LoadingSpinner size="6xl" />
            <Text size="s" opacity="{0.5}">Getting things ready...</Text>
        </div>
    {:else}
        {#if isIdle}
            <button class="idle" on:click="{handleFocus}" transition:blur="{{ duration: 80 }}">
                <Text size="xl" icon="key" iconColor="var(--clr-secondary)" iconFilled weight="medium">KeepSafe</Text>
                <Text size="m">For your security, your notes have been hidden.</Text>
                <Text size="s" opacity="{0.5}">Click anywhere to reveal</Text>
            </button>
        {:else}
            <slot />
        {/if}
    {/if}
</div>

<style>
    @import "../app.css";

    .layout {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .idle {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.45);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2rem;
    }

</style>
