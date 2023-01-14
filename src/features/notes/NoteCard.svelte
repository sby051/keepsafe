<script lang="ts">
    import { IconButton, Separator, Text } from "@components";
    import type { Note } from "./types";
    import { activeNote, deleteNote } from "./notes";
    import { fly } from "svelte/transition"
    import type { KeyboardShortcut } from "@types";
    import { handleKeydown } from "@utils/handlers";
    
    export let note: Note;
    export let index: number = 0;
    
    let actionsVisible = false;
    
    const handleClick = () => $activeNote = index;
    const SHORTCUTS: KeyboardShortcut[] = [
        {
            key: "Delete",
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            action: () => deleteNote(index)
        }
    ];
    
</script>

<svelte:window on:keydown={(e) => handleKeydown(e, SHORTCUTS)}/>

<div
    class="note-card"
    on:click={handleClick}
    on:mouseenter={() => actionsVisible = true}
    on:mouseleave={() => actionsVisible = false}
>
    <Text size="m" weight="bold">
        {note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
    </Text>
    <Separator/>
    
    {#key actionsVisible}
        <div class="note-editor-inline__actions" transition:fly={{ x: 80, duration: 150 }}>
            {#if actionsVisible}
                <IconButton
                    size="l"
                    icon="draw"
                    on:click={handleClick}
                    tooltip="Edit"
                />
                <IconButton
                    size="l"
                    icon="delete"
                    color="var(--clr-danger)"
                    on:click={() => deleteNote(note.id)}
                    tooltip="Delete"
                    tooltipOptions={{ position: "top" }}
                />
            {/if}
        </div>
    {/key}
    
    <span class="note-editor-modal__content">{note.content}</span>
</div>

<style>
    .note-card {
        display: flex;
        padding: 2rem;
        flex-direction: column;
        max-width: 30rem;
        gap: 1.5rem;
        position: relative;
        flex: 1;
        height: 30rem;
        min-width: 20rem;
        background: var(--clr-black-3);
        overflow: hidden;
        border-radius: var(--br-more);
        transition: var(--ts-quick);
        outline: 0 solid transparent;
    }
    
    @media (max-width: 768px) {
        .note-card {
            max-width: 100%;
            min-width: 100%;
        }
    }
    
    .note-editor-modal__content {
        font-size: var(--fs-s);
        display: flex;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    .note-editor-inline__actions {
        display: flex;
        gap: 0.5rem;
        position: absolute;
        top: 2rem;
        right: 2rem;
    }
    
    .selected {
        border: 3px solid var(--clr-primary);
        scale: 1.02;
    }
    
    .note-card:hover {
        box-shadow: var(--shdw-small-normal);
        outline: var(--brdr-thin-light);
    }
    
    .note-card:active {
        transition: var(--ts-quicker);
    }
</style>