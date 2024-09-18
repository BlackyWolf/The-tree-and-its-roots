import { ComponentChildren } from "preact";
import { joinCss } from "~utils/css.ts";
import { Color } from "~utils/colors.ts";

interface Properties {
    children: ComponentChildren;
    class?: string;
    color: Color;
}

function getColor(color: Color) {
    switch (color) {
        case "amber": return "bg-amber-100 text-amber-700 border-amber-300";
        case "blue": return "bg-blue-100 text-blue-700 border-blue-300";
        case "black": return "bg-black text-white border-black ring-white ring-inset ring-1";
        case "cyan": return "bg-cyan-100 text-cyan-700 border-cyan-300";
        case "red": return "bg-red-100 text-red-700 border-red-300";
    }
}

export const Alert = ({ children, class: _class, color }: Properties) => {
    const css = joinCss(
        "border rounded p-4",
        getColor(color),
        _class
    );

    return (
        <div class={css}>
            {children}
        </div>
    );
};
