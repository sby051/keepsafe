<script lang="ts">
    import { slide } from "svelte/transition";
    import { Button, Icon, IconButton, Text } from "@components";
    import { clickoutside } from "@utils/actions";
    import type { Note } from "./types";
    import { createNote } from "./notes";
    import { handleKeydown } from "@utils/handlers";
    import type { KeyboardShortcut } from "@types";
    
    export let active = false;
    
    let draft: Note = {
        id: "",
        title: "",
        content: "",
    }
    
    const handleCreateNote = () => {
        createNote(draft);
        resetDraft();
    };
    
    const resetDraft = () => {
        draft = {
            id: "",
            title: "",
            content: "",
        }
        active = false;
    };
    
    const SHORTCUTS: KeyboardShortcut[] = [
        {
            key: "Escape",
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            action: resetDraft,
        },
        {
            key: "Enter",
            ctrlKey: true,
            shiftKey: false,
            altKey: false,
            action: handleCreateNote,
        },
    ];
    
    $: changed = !!(draft?.title || draft?.content);
</script>

<svelte:window on:keydown={(e) => handleKeydown(e, SHORTCUTS)}/>

<div class="note-editor-inline" on:clickoutside={() => active = false} use:clickoutside>
    <div class="note-editor-inline__title">
        <Icon filled name="draw" opacity={0.5} size="m"/>
        <input
            bind:value={draft.title}
            on:focus={() => active = true}
            placeholder={active ? "Title" : "Take a note.."}
            type="text"
        />
        {#if draft.title}
            <IconButton
                icon="close"
                filled
                tooltip="Close"
                on:click={resetDraft}
            />
        {/if}
    </div>
    
    {#if active}
        <textarea
            bind:value={draft.content}
            transition:slide
            placeholder="Take a note.."
            class="note-editor-inline__content"
        ></textarea>
        
        {#if changed}
            <div class="note-editor-inline__actions" transition:slide>
                <Button fillWidth icon="add" disabled={!draft.title} on:click={handleCreateNote}>Create note</Button>
                <Text
                    size="s"
                    icon={!draft.title ? "error" : "lightbulb"}
                    color={!draft.title ? "var(--clr-danger)" : "var(--clr-secondary)"}
                >
                    {#if draft.title}
                        Tip: Press <kbd>CTRL</kbd>+<kbd>ENTER</kbd> to save
                    {:else}
                        Enter a title to save
                    {/if}
                </Text>
            </div>
        {/if}
    {/if}
</div>

<style>
    .note-editor-inline {
        display: flex;
        flex-direction: column;
        width: 50rem;
        border-radius: var(--br-more);
        transition: all 0.2s ease-in-out;
        outline: 0 solid transparent;
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .note-editor-inline {
            width: 100%;
        }
    }
    
    .note-editor-inline:hover, .note-editor-inline:focus-within {
        box-shadow: var(--shdw-medium-normal);
    }
    
    .note-editor-inline:focus-within {
        outline: var(--brdr-thin-light);
    }
    
    .note-editor-inline__title {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
        padding: 1.5rem;
        background: var(--clr-black-3);
        transition: all 0.2s ease-in-out;
    }
    
    .note-editor-inline__title > input {
        width: 100%;
        font-weight: 600;
        background: none;
        outline: none;
        border: none;
    }
    
    .note-editor-inline__content {
        font-size: var(--fs-s);
        padding: 2rem;
        background: var(--clr-black-3);
        outline: none;
        border: none;
        border-top: var(--brdr-thin-light);
        font-family: inherit;
        height: 30rem;
        transition: var(--ts-smooth);
        box-shadow: 0 2rem var(--clr-black-3);
        resize: none;
        overflow: scroll;
    }
    
    .note-editor-inline__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--clr-black-3);
        padding: 2rem;
        flex-direction: column;
        gap: 1rem;
    }
</style>