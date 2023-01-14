<script lang="ts">
    import { Icon, IconButton } from "@components";
    import type { Note } from "../notes";
    import { activeNote, deleteNote } from "../notes";
    import { toast } from "@features/toast";
    
    export let note: Note;
    
    const INITIAL_NOTE = structuredClone(note);
    
    const handleUndo = () => {
        note = INITIAL_NOTE;
        toast.success("Note restored", {
            message: "Your note has been restored to its original state.",
            duration: 2000,
        });
    }
    
    $: noteChanged = JSON.stringify(note) !== JSON.stringify(INITIAL_NOTE);
</script>

<div class="note-editor-modal">
    <div class="note-editor-modal__title">
        <Icon filled name="draw" opacity="0.5" size="l"/>
        <input
            bind:value={note.title}
            placeholder="Title"
            type="text"
        />
        {#if noteChanged}
            <IconButton tooltip="Undo changes" icon="undo" on:click={handleUndo} size="l"/>
        {/if}
        <IconButton color="var(--clr-danger)" icon="delete" on:click={() => deleteNote(note.id)} size="l"
                    tooltip="Delete"/>
        <IconButton icon="close" on:click={() => $activeNote = null} size="l" tooltip="Close"/>
    </div>
    
    <textarea
        bind:value={note.content}
        class="note-editor-modal__content"
        placeholder="Take a note.."
    ></textarea>
</div>

<style>
    .note-editor-modal {
        display: flex;
        flex-direction: column;
        width: 50vw;
        height: 50vh;
        border-radius: var(--br-more);
        transition: all 0.2s ease-in-out;
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .note-editor-modal {
            width: 80vw;
            height: 60vh;
        }
    }
    
    .note-editor-modal__title {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
        padding: 2.5rem;
        font-size: var(--fs-l);
        background: var(--clr-black-3);
        transition: all 0.2s ease-in-out;
    }
    
    .note-editor-modal__title > input {
        width: 100%;
        font-weight: 600;
        background: none;
        outline: none;
        border: none;
    }
    
    .note-editor-modal__content {
        padding: 2rem;
        background: var(--clr-black-3);
        outline: none;
        border: none;
        border-top: var(--brdr-thin-light);
        font-family: inherit;
        height: 100%;
        transition: var(--ts-smooth);
        box-shadow: 0 2rem var(--clr-black-3);
        resize: none;
        overflow: scroll;
    }
</style>