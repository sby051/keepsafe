export type FontSize =
    "2xs"
    | "xs"
    | "s"
    | "r"
    | "rm"
    | "m"
    | "l"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "inherit";
export type ID = string;
export type FontWeight =
    "thin"
    | "light"
    | "regular"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold"
    | "black"
    | "inherit";
export type TextAlignment = "left" | "center" | "right";
export type CSSVariable = `var(--${string})`;
export type CSSUnit = `${number}${"px" | "em" | "rem" | "%" | "vw" | "vh" | "vmin" | "vmax"}`;
export type CSSPercentage = `${number}%`;
export type CSSColor =
    "auto"
    | "transparent"
    | "none"
    | `#${string}`
    | `rgb(${number}, ${number}, ${number})`
    | `rgba(${number}, ${number}, ${number}, ${number})`
    | `hsl(${number}, ${number}%, ${number}%)`
    | `hsla(${number}, ${number}%, ${number}%, ${number})`;

export interface KeyboardShortcut {
    key: string;
    keyCode?: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    action: () => void;
}