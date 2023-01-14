<script lang="ts">
    import type { PageData } from "./$types";
    import { Flex, Icon, Modal, SearchInput, Text } from "@components";
    import type { Note } from "@features/notes/types";
    import {
        activeNote,
        changedWhilePaused,
        createNote,
        NoteCard,
        NoteEditorInline,
        NoteEditorModal,
        notes,
        pauseResumeSync,
        syncing,
        syncPaused
    } from "@features/notes";
    import { tooltip } from "@features/tooltip";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    
    export let data: PageData;

    let screenWidth = 0;
    let ctrlPressed = false;
    let searchQuery = "";
    let mainElement: HTMLElement;

    const newBlankNote = () => createNote({ title: "New Note", content: "" });
    const handleKeyup = (e: KeyboardEvent) => ctrlPressed = e.key === "Control" ? false : ctrlPressed;
    const handleBackToTop = () => mainElement.scrollTo({ top: 0, behavior: "smooth" });
    const handleSearch = (note: Note, query: string) => note.title.toLowerCase().includes(query.toLowerCase());
    const handleKeydown = (e: KeyboardEvent) => {
        ctrlPressed = e.ctrlKey;
        if (e.shiftKey && e.key === "N") newBlankNote();
    }

    $: modalOpen = $activeNote !== null;
    $: scrolled = mainElement && mainElement.scrollTop > 0;
    
    onMount(() => window.fetch = data.fetch);

</script>

<svelte:window bind:innerWidth={screenWidth} on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<header>
    <Text icon="key" iconColor="var(--clr-secondary)" iconFilled weight="medium">
        KeepSafe
    </Text>
    
    <span class="note-editor__inline">
        <NoteEditorInline/>
    </span>
    
    <Flex centerX position="relative">
        {#if $syncing}
            <div class="syncing-icon">
                <Icon name="sync" color="var(--clr-secondary)" size="m"/>
            </div>
            <Text color="var(--clr-secondary)" weight="medium" size="s">
                Syncing
            </Text>
        {:else}
            {#if $syncPaused}
                {#if $changedWhilePaused}
                    <div class="changes-made" on:click={pauseResumeSync}>
                        <Text wrap weight="medium" size="s" icon="warning" iconFilled>
                            Unsaved changes, click to sync
                        </Text>
                    </div>
                {:else}
                    <div
                        class="tooltip"
                        use:tooltip
                        on:click={pauseResumeSync}
                        data-tooltip={"Your notes are not being synced. Any changes you make will be lost."}
                        data-tooltip-position="left"
                    >
                        <Text
                            color="var(--clr-danger)"
                            weight="medium"
                            icon="play_arrow"
                            iconFilled
                            size="s"
                        >
                            Resume Sync
                        </Text>
                    </div>
                {/if}
            {:else}
                <div
                    class="tooltip"
                    use:tooltip
                    on:click={pauseResumeSync}
                    data-tooltip={"Click to pause"}
                    data-tooltip-position="left"
                >
                    <Text
                        color="var(--clr-primary)"
                        weight="medium"
                        icon="check_circle"
                        iconFilled
                        size="s"
                    >
                        Synced
                    </Text>
                </div>
            {/if}
        {/if}
    </Flex>
</header>

<Modal bind:open={modalOpen} on:close={() => activeNote.set(null)}>
    <NoteEditorModal bind:note={$notes[$activeNote]}/>
</Modal>

<main bind:this={mainElement} on:dblclick={newBlankNote}>
    {#if $notes.length > 0}
        <SearchInput bind:value={searchQuery}/>
        <Flex centerX wrap gap="2rem">
            {#each $notes as note, index}
                {#if handleSearch(note, searchQuery)}
                    <NoteCard bind:note={note} {index}/>
                {/if}
            {/each}
        </Flex>
    {:else}
        <Flex centerX centerY column fullH fullW gap="1.5rem">
            <Icon name="notes" opacity="0.5" size="4xl"/>
            <Text opacity={0.5}>
                When you save notes, they'll appear here.
            </Text>
            {#if screenWidth > 768}
                <Text size="xs" color="var(--clr-secondary)">
                    You can also create a new note by pressing
                    <kbd>SHIFT</kbd>+<kbd>N</kbd>
                </Text>
            {/if}
        </Flex>
    {/if}
    
    {#if scrolled}
        <button class="back-to-top" transition:fly={{y: -100}} on:click={handleBackToTop}>
            <Icon name="arrow_upward" size="l"/>
        </button>
    {/if}
</main>

<style>
    .changes-made {
        background: var(--clr-danger);
        padding: 0.8rem;
        border-radius: var(--br);
        display: flex;
    }
    
    header {
        width: 100%;
        display: flex;
        padding: 2.5rem;
        background: var(--clr-black-1);
        align-items: center;
        justify-content: space-between;
        gap: 2.5rem;
        position: sticky;
        box-shadow: var(--shdw-large-normal);
        border-bottom: var(--brdr-thin-dark);
        z-index: 20;
    }
    
    @media (max-width: 600px) {
        header {
            padding: 2.5rem;
            flex-direction: column;
        }
    }
    
    main {
        display: flex;
        padding: 2.5rem;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    
    .back-to-top {
        position: fixed;
        top: 9rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--clr-primary);
        border-radius: 50%;
        padding: 0.5rem;
        cursor: pointer;
        width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5rem;
        transition: var(--ts-bounce);
        box-shadow: var(--shdw-large-soft);
    }
    
    .back-to-top:active {
        opacity: 0.8;
    }
    
    .syncing-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 0.5rem;
        animation: spin 1s linear infinite;
    }
    
    .note-editor__inline {
        position: absolute;
        top: 0.8rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
    }
    
    @media (max-width: 600px) {
        .note-editor__inline {
            position: static;
            transform: none;
            width: 100%;
        }
    }
</style>
