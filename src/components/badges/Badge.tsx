import { ComponentChildren } from "preact";
import { Color, joinCss } from "~utils";

function getColor(color: Color) {
    switch (color) {
        case "amber": return "bg-amber-600 text-white";
        case "black": return "bg-black text-white";
        case "blue": return "bg-blue-600 text-white";
        case "cyan": return "bg-cyan-600 text-white";
        case "emerald": return "bg-emerald-600 text-white";
        case "fuchsia": return "bg-fuchsia-600 text-white";
        case "gray": return "bg-gray-600 text-white";
        case "green": return "bg-green-600 text-white";
        case "indigo": return "bg-indigo-600 text-white";
        case "lime": return "bg-lime-600 text-white";
        case "neutral": return "bg-neutral-600 text-white";
        case "orange": return "bg-orange-600 text-white";
        case "pink": return "bg-pink-600 text-white";
        case "primary": return "bg-primary-600 text-white";
        case "purple": return "bg-purple-600 text-white";
        case "red": return "bg-red-600 text-white";
        case "rose": return "bg-rose-600 text-white";
        case "sky": return "bg-sky-600 text-white";
        case "slate": return "bg-slate-600 text-white";
        case "stone": return "bg-stone-600 text-white";
        case "teal": return "bg-teal-600 text-white";
        case "violet": return "bg-violet-600 text-white";
        case "white": return "bg-white text-black";
        case "yellow": return "bg-yellow-600 text-white";
        case "zinc": return "bg-zinc-600 text-white";

        default: return "bg-black text-white";
    }
}

interface Properties {
    children: ComponentChildren;
    class?: string;
    color: Color;
}

export const Badge = ({ children, class: _class, color }: Properties) => {
    const css = joinCss(
        "font-semibold py-0.5 px-1.5 text-sm uppercase font-mono rounded",
        getColor(color),
        _class
    );

    return (
        <span className={css}>{children}</span>
    );
};
