<script lang="ts">
    import { Button, Flex, IconButton, Separator, Text } from "@components";
    import { attemptBruteforce, getNotes, resetVault } from "@features/notes";
    import { goto } from "$app/navigation";
    import { toast } from "@features/toast"
    import { onMount } from "svelte";
    import { confirm } from "@features/confirm";
    
    let password: string | null = null;
    let newUser: boolean | null = null;
    
    const handleUnlock = async () => {
        if (!password) return;
    
        const result = await getNotes(password);
        if (!result) {
            toast.error("Incorrect password");
            return;
        }
    
        await goto("/");
    }
    
    const handleBruteforce = async (e: MouseEvent) => {
        const password = await attemptBruteforce();
    
        if (!password) {
            toast.warning("Bruteforce failed", {
                message: "No password could be found in the dictionary, you'll have to reset your vault"
            });
            return;
        }
    
        toast.success("Bruteforce successful", {
            message: "Password copied to clipboard",
            duration: 10000,
        });
    
        await handleUnlock();
    }

    const handleReset = async () => {
        const result = await confirm("Reset vault", {
            message: "Are you sure you want to reset your vault? This will delete all your notes.",
            buttons: {
                cancel: {
                    text: "Never-mind",
                    color: "primary",
                },
                confirm: {
                    text: "Reset",
                    color: "danger",
                    icon: "undo"
                },
            },
        });
        if (!result) return;
        await resetVault();
        window.location.reload();
    }

    onMount(() => newUser = !localStorage.getItem("vault"));
</script>

<form class="center">
    <Text
        icon="key"
        iconFilled
        size="xl"
        weight="medium"
        iconColor="var(--clr-secondary)"
    >
        KeepSafe
    </Text>
    
    <div class="password">
        <input
            bind:value={password}
            placeholder="Type your password here.."
            type="password"
        />
        <IconButton
            color="var(--clr-secondary)"
            disabled={!password}
            icon="start"
            on:click={handleUnlock}
            size="l"
            tooltip="Unlock"
            tooltipPosition="left"
        />
    </div>
    
    {#if newUser}
        <Text
            size="s"
            opacity={0.8}
            wrap
        >
            Choose a password above to create your new vault with
        </Text>
    {:else}
        <Flex centerX gap="1rem" fullW>
            <Separator/>
            <Text size="xs" opacity={0.5}>or, if you've forgotten it</Text>
            <Separator/>
        </Flex>
        
        <Flex centerX gap="1rem" fullW>
            <Button icon="gavel" on:click={handleBruteforce} fillWidth>
                Bruteforce
            </Button>
            <Button icon="undo" color="danger" on:click={handleReset} fillWidth>
                Reset
            </Button>
        </Flex>
    {/if}
</form>

<style>
    .password {
        border: none;
        border-radius: var(--br-more);
        padding: 1rem 1.5rem;
        width: 100%;
        max-width: 40rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        background: none;
        background: var(--clr-black-3);
        outline: 0 solid transparent;
        transition: all 0.2s ease;
    }
    
    .password > input {
        border: none;
        outline: none;
        background: none;
        color: var(--clr-white);
        font-size: 1.5rem;
        font-weight: 500;
        flex: 1;
    }
</style>