import type { KeyboardShortcut } from "@types";

export type EventHandler<T, V> = (event: T, obj?: V) => void;

export const handleKeydown: EventHandler<KeyboardEvent, KeyboardShortcut[]> = (e, shortcuts): void => {
    for (const shortcut of shortcuts as KeyboardShortcut[]) {
        if (e.ctrlKey !== shortcut.ctrlKey) continue;
        if (e.altKey !== shortcut.altKey) continue;
        if (e.shiftKey !== shortcut.shiftKey) continue;
        if (e.key !== shortcut.key) continue;

        e.preventDefault();
        e.stopPropagation();
        shortcut.action();
    }
}