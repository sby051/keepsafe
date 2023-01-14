export const clickoutside = (node: HTMLElement, extraNodes?: HTMLElement[]): { destroy(): void } => {
    const handleClick = (e: MouseEvent) => {
        let outsideExtraNodes = true;

        if (extraNodes?.length) {
            extraNodes.map(extraNode => {
                if (extraNode && extraNode?.contains(e.target as Node)) {
                    outsideExtraNodes = false;
                }
            });
        }
        if (!outsideExtraNodes) return;

        if (!node?.contains(e.target as Node)) node.dispatchEvent(new CustomEvent("clickoutside"));
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("contextmenu", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
};

type ModifierKey = "shift" | "ctrl" | "alt";
export const modifierkey = (node: HTMLElement, key: ModifierKey) => {

    let parsedKey: "Shift" | "Control" | "Alt";

    switch (key) {
        case "shift":
            parsedKey = "Shift";
            break;
        case "ctrl":
            parsedKey = "Control";
            break;
        case "alt":
            parsedKey = "Alt";
            break;
        default:
            throw new Error("Invalid modifier key");
    }

    let modifierOn = false;

    const handleKeydown = (e: KeyboardEvent) => modifierOn = e.key === key;
    const handleKeyup = (e: KeyboardEvent) => modifierOn = !e.key === key;

    document.addEventListener("keydown", handleKeydown, true);
    document.addEventListener("keyup", handleKeyup, true);

    return {
        update(newKey: ModifierKey): void {
            key = newKey;
        },
        destroy(): void {
            document.removeEventListener("keydown", handleKeydown, true);
            document.removeEventListener("keyup", handleKeyup, true);
        }
    };
};

export const escape = (node: HTMLElement): { destroy(): void } => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            node.dispatchEvent(new CustomEvent("escape"));
        }
    };

    document.addEventListener("keydown", handleKeydown, true);

    return {
        destroy() {
            document.removeEventListener("keydown", handleKeydown, true);
        }
    };
};

export const enter = (node: HTMLElement): { destroy(): void } => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            node.dispatchEvent(new CustomEvent("enter"));
        }
    };

    document.addEventListener("keydown", handleKeydown, true);

    return {
        destroy() {
            document.removeEventListener("keydown", handleKeydown, true);
        }
    };
};