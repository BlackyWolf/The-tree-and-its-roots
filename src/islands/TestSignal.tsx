import { Signal } from "@preact/signals";

interface Properties {
    signal: Signal<any>;
}

export const TestSignal = ({ signal }: Properties) => (
    <div>
        {
            signal.value
                ? signal.value === true
                    ? "true"
                    : signal.value
                : signal.value === false
                    ? "false"
                    : signal.value
        }
    </div>
);
