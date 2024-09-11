import { FormErrors, joinCss } from "~utils";
import { JSX } from "preact";
import { ErrorMessage } from "~components";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Properties extends JSX.HTMLAttributes<HTMLTextAreaElement> {
    class?: string;
    errors?: FormErrors;
    id?: string;
    // icon?: IconProp;
    label: string;
    name: string;
    required?: boolean;
}

export const TextArea = ({
    autocomplete,
    class: _class,
    errors,
    // icon,
    id,
    label,
    name,
    required,
    rows = 6,
    type,
    ...rest
}: Properties) => {
    const inputCss = joinCss(
        "block w-full rounded border-0 py-2 text-gray-900 ring-2",
        "ring-inset ring-yellow-950 placeholder:text-gray-400 focus:ring-2",
        "focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6",
        // icon ? "pl-10" : undefined
    );

    return (
        <div class={_class}>
            <label class="text-sm font-semibold leading-6 text-gray-900 flex items-center" htmlFor={id || name}>
                {label}
                {!required && <span class="ml-auto text-xs text-gray-400">(optional)</span>}
            </label>

            <div class="relative mt-2 rounded-md shadow-sm">
                {/* {icon && (
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon icon={icon} class="text-primary-500" aria-hidden="true" />
                    </div>
                )} */}

                <textarea
                    autocomplete={autocomplete}
                    class={inputCss}
                    id={id || name}
                    name={name}
                    required={required}
                    rows={rows}
                    type={type}
                    {...rest}
                ></textarea>
            </div>

            <ErrorMessage errors={errors} name={name} class="my-1 text-sm" />
        </div>
    );
};
