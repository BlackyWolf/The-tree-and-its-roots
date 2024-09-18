import { ComponentChildren, JSX } from "preact";
import { Color } from "~utils/colors.ts";
import { joinCss } from "~utils/css.ts";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

function getColorCss(color: Color, disabled: boolean = false, outline: boolean = false) {
    if (disabled) return "bg-gray-300 text-gray-500 cursor-not-allowed";

    if (outline) {
        switch (color) {
            case "amber": return "border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white";
            case "black": return "border-black text-black hover:bg-gray-800 hover:bg-white";
            case "blue": return "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
            case "cyan": return "border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white";
            case "emerald": return "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white";
            case "fuchsia": return "border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white";
            case "gray": return "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white";
            case "green": return "border-green-600 text-green-600 hover:bg-green-600 hover:text-white";
            case "indigo": return "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white";
            case "lime": return "border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white";
            case "neutral": return "border-neutral-600 text-neutral-600 hover:bg-neutral-600 hover:text-white";
            case "orange": return "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white";
            case "pink": return "border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white";
            case "primary": return "border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white";
            case "purple": return "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white";
            case "red": return "border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
            case "rose": return "border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white";
            case "sky": return "border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white";
            case "slate": return "border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white";
            case "stone": return "border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-white";
            case "teal": return "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white";
            case "violet": return "border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white";
            case "white": return "border-white text-white hover:bg-white hover:text-black";
            case "yellow": return "border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white";
            case "zinc": return "border-zinc-600 text-zinc-600 hover:bg-zinc-600 hover:text-white";

            default: return "border-black text-black hover:bg-gray-800 hover:bg-white";
        }
    }

    switch (color) {
        case "amber": return "bg-amber-600 text-white hover:bg-amber-700";
        case "black": return "bg-black text-white hover:bg-gray-800";
        case "blue": return "bg-blue-600 text-white hover:bg-blue-700";
        case "cyan": return "bg-cyan-600 text-white hover:bg-cyan-700";
        case "emerald": return "bg-emerald-600 text-white hover:bg-emerald-700";
        case "fuchsia": return "bg-fuchsia-600 text-white hover:bg-fuchsia-700";
        case "gray": return "bg-gray-600 text-white hover:bg-gray-700";
        case "green": return "bg-green-600 text-white hover:bg-green-700";
        case "indigo": return "bg-indigo-600 text-white hover:bg-indigo-700";
        case "lime": return "bg-lime-600 text-white hover:bg-lime-700";
        case "neutral": return "bg-neutral-600 text-white hover:bg-neutral-700";
        case "orange": return "bg-orange-600 text-white hover:bg-orange-700";
        case "pink": return "bg-pink-600 text-white hover:bg-pink-700";
        case "primary": return "bg-primary-600 text-white hover:bg-primary-700";
        case "purple": return "bg-purple-600 text-white hover:bg-purple-700";
        case "red": return "bg-red-600 text-white hover:bg-red-700";
        case "rose": return "bg-rose-600 text-white hover:bg-rose-700";
        case "sky": return "bg-sky-600 text-white hover:bg-sky-700";
        case "slate": return "bg-slate-600 text-white hover:bg-slate-700";
        case "stone": return "bg-stone-600 text-white hover:bg-stone-700";
        case "teal": return "bg-teal-600 text-white hover:bg-teal-700";
        case "violet": return "bg-violet-600 text-white hover:bg-violet-700";
        case "white": return "bg-white text-black hover:bg-gray-200";
        case "yellow": return "bg-yellow-600 text-white hover:bg-yellow-700";
        case "zinc": return "bg-zinc-600 text-white hover:bg-zinc-700";

        default: return "bg-black text-white hover:bg-gray-800";
    }
}

function getSizeCss(size: ButtonSize) {
    switch (size) {
        case "xs": return "rounded py-1 px-2 text-xs";
        case "sm": return "rounded py-1 px-2 text-sm";
        case "md": return "rounded-md py-2 px-4 text-sm";
        case "lg": return "rounded-md py-3 px-6 text-sm";
        case "xl": return "rounded-lg py-4 px-8 text-base";
    }
}

interface Properties {
    children: ComponentChildren;
    class?: string;
    color: Color;
    disabled?: boolean;
    full?: boolean;
    onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
    outline?: boolean;
    size?: ButtonSize;
    type?: "button" | "submit" | "reset";
}

export const Button = ({
    children,
    class: _class,
    color,
    disabled,
    full,
    onClick,
    outline,
    size = "md",
    type = "button"
}: Properties) => {
    const css = joinCss(
        "font-semibold focus:outline-none focus:shadow-outline transition duration-150",
        outline ? "border" : undefined,
        getColorCss(color, disabled, outline),
        getSizeCss(size),
        full ? "w-full" : undefined,
        _class
    );

    return (
        <button type={type} class={css} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};
