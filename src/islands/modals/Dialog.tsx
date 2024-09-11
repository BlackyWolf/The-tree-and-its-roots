import { Signal } from "@preact/signals";
import { createRef, ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

interface Properties {
    children: ComponentChildren;
    show: Signal<boolean>;
}

export const Dialog = ({
    children,
    show,
}: Properties) => {
    const ref = createRef<HTMLDialogElement>();

    useEffect(() => {
        if (show.value) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [show.value]);

    return (
        <dialog
            class="p-8 rounded border-4 border-yellow-950"
            onCancel={() => show.value = false}
            ref={ref}
        >
            <div class="flex flex-col">
                <button
                    class="ml-auto bg-red-600 text-white text-sm font-mono uppercase rounded px-2 py-1 font-medium"
                    onClick={() => show.value = false}
                >
                    Close
                </button>

                {children}
            </div>
        </dialog>
    );
};
