<script lang="ts">
    import { Button, Modal, Text } from "@components";
    import { confirmData, submitConfirm } from "./confirm";
    import { enter } from "@utils/actions";
    
    const handleEnter = () => {
        if ($confirmData) submitConfirm(true);
    }

    $: confirmVisible = !!($confirmData);
</script>

<svelte:window on:enter={handleEnter} use:enter/>

<Modal on:close={() => submitConfirm(false)} open={confirmVisible}>
    <div class="confirm">

        <Text color="white" size="l" weight="semiBold" wrap>{$confirmData.title}</Text>

        {#if $confirmData.message}
            <Text lineHeight={1.4} alignment="center" size="s" wrap opacity={0.6}>{$confirmData.message}</Text>
        {/if}

        <div class="confirm__buttons">
            <Button
                on:click={() => submitConfirm(false)}
                style="outlined"
                color={$confirmData.buttons.cancel.color}
                icon={$confirmData.buttons.cancel.icon}
                fillWidth
            >
                {$confirmData.buttons.cancel.text}
            </Button>
    
            <Button
                on:click={() => submitConfirm(true)}
                fillWidth
                color={$confirmData.buttons.confirm.color}
                icon={$confirmData.buttons.confirm.icon}
            >
                {$confirmData.buttons.confirm.text}
            </Button>
        </div>
    </div>
</Modal>

<style>
    .confirm {
        z-index: 128;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        gap: 3rem;
        max-width: 50rem;
    }
    
    .confirm__buttons {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }
</style>
