import { JSX } from "preact";
import { ErrorMessage } from "~components";
import { joinCss } from "~utils/css.ts";
import { FormErrors } from "~utils/forms.ts";

interface Properties extends JSX.HTMLAttributes<HTMLSelectElement> {
    class?: string;
    errors?: FormErrors;
    label: string;
    options: { value?: string; label: string }[];
}

export const Select = ({
    class: _class,
    errors,
    id,
    label,
    name,
    options,
    required,
    ...rest
}: Properties) => {
    const inputCss = joinCss(
        "block w-full rounded border-0 py-2 text-gray-900 ring-2",
        "ring-inset ring-yellow-950 placeholder:text-gray-400 focus:ring-2",
        "focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6",
    );

    return (
        <div class={_class}>
            <label class="text-sm font-semibold leading-6 text-gray-900 flex items-center" for={id || name}>
                {label}
                {!required && <span class="ml-auto text-xs text-gray-400">(optional)</span>}
            </label>

            <div class="relative mt-2 rounded-md shadow-sm">
                <select
                    class={inputCss}
                    id={id || name}
                    name={name}
                    required={required}
                    {...rest}
                >
                    <option value="">Select...</option>
                    {options.map((option) => (
                        <option value={option.value || option.label}>{option.label}</option>
                    ))}
                </select>
            </div>

            <ErrorMessage errors={errors} name={name as string} class="my-1 text-sm" />
        </div>
    );
};
