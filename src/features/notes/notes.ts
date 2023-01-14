import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import { confirm } from "@features/confirm";
import { authedFetchPost, getRandomUUID } from "@utils/helpers";
import type { Note } from "./types";

let _key_cache: string;
let _paused_queue: Note[] = [];

export const notes = writable<Note[]>([]);
export const activeNote = writable<number | null>(null);
export const syncing = writable<boolean>(false);
export const syncPaused = writable<boolean>(false);
export const changedWhilePaused = writable<boolean>(false);

// When sync is paused, we store the notes in a queue, and when sync is resumed, we update the notes store with the queue
syncPaused.subscribe((paused: boolean) => {
    if (!paused && _paused_queue.length > 0) {
        notes.update(n => _paused_queue);
        _paused_queue = [];
    }
});

// Syncs changes to the notes store to local storage
notes.subscribe(async (notes: Note[]) => {
    if (!browser || !_key_cache) return;

    const paused = get(syncPaused);
    if (paused) {
        _paused_queue = notes;
        changedWhilePaused.set(true);
        return;
    }

    changedWhilePaused.set(false);

    syncing.set(true);

    const encryptedVault = await _encrypt_vault(JSON.stringify(notes), _key_cache);

    if (encryptedVault) _safely_save_vault_to_ls(encryptedVault);

    setTimeout(() => syncing.set(false), 1000);
});

// Creates a new vault if one doesn't exist, and decrypts the vault if it does
export const getNotes = async (password: string): Promise<boolean> => {
    if (!_safely_check_if_vault_exists()) await _create_vault(password);

    const encryptedVault = _safely_get_vault_from_ls() as string; // vault is guaranteed to exist at this point
    const decryptedVault = await _decrypt_vault(encryptedVault, password);

    if (!decryptedVault) return false;

    notes.set(decryptedVault);

    if (!_key_cache) _key_cache = password;

    return true;
};

export const createNote = (note: Note) => {
    notes.update((notes: Note[]) => [
        ...notes,
        {
            id: getRandomUUID(),
            ...note
        }
    ]);
};

export const deleteNote = async (noteIndex: number) => {
    const result = await confirm("Are you sure you want to delete this note?", {
        message: "This cannot be undone.",
        icon: "exclamation-triangle",
        buttons: {
            confirm: {
                text: "Delete note",
                color: "danger",
                icon: "delete"
            },
            cancel: {
                text: "Never-mind",
                color: "primary"
            }
        }
    });

    if (!result) return;

    notes.update((notes: Note[]) => {
        const notesBefore = notes.slice(0, noteIndex);
        const notesAfter = notes.slice(noteIndex + 1);
        return [...notesBefore, ...notesAfter];
    });

    activeNote.set(null);
};

export const resetVault = async () => {
    _safely_delete_vault_from_ls();
    notes.set([]);
    activeNote.set(null);
    _key_cache = "";
};

export const attemptBruteforce = async (): Promise<string | null> => {
    const BRUTEFORCE_ENDPOINT = `/api/v2/crypto/bruteforce?text=${_safely_get_vault_from_ls()}`;
    const response = await fetch(BRUTEFORCE_ENDPOINT);
    if (!response.ok) return null;

    return await response.text();
};

export const pauseResumeSync = (): void => syncPaused.update(paused => !paused);

// Private helper functions
const _encrypt_vault = async (vaultStr: string, password: string): Promise<string | null> => {
    const response = await authedFetchPost("/api/v2/crypto", password, {
        text: vaultStr,
        operation: "encrypt"
    });

    if (!response.ok) return null;

    return await response.text();
};

const _decrypt_vault = async (vaultStr: string, password: string): Promise<Note[] | null> => {
    const response = await authedFetchPost("/api/v2/crypto", password, {
        text: vaultStr,
        operation: "decrypt"
    });

    if (!response.ok) return null;

    return await JSON.parse(await response.text());
};

const _create_vault = async (password: string): Promise<void> => {
    const vault = await _encrypt_vault(JSON.stringify([]), password);
    if (vault) _safely_save_vault_to_ls(vault);
};

const _safely_get_vault_from_ls = (): string | null => {
    if (!browser) return null;
    return localStorage.getItem("vault");
};

const _safely_save_vault_to_ls = (vaultStr: string): void => {
    if (!browser) return;
    localStorage.setItem("vault", vaultStr);
};

const _safely_check_if_vault_exists = (): boolean => {
    if (!browser) return false;
    return !!localStorage.getItem("vault");
};

const _safely_delete_vault_from_ls = (): void => {
    if (!browser) return;
    localStorage.removeItem("vault");
};
