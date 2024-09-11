import { Signal } from "@preact/signals";
import { ComponentChildren } from "preact";

interface Properties {
    children: ComponentChildren;
    class?: string;
    show: Signal<boolean>;
}

export const DialogShow = ({
    children,
    class: _class,
    show
}: Properties) => {
    return (
        <button class={_class} onClick={() => show.value = true}>
            {children}
        </button>
    );
};
