import { JSX } from "preact";
import { FormErrors } from "~utils";

interface Properties extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "type"> {
    class?: string;
    errors?: FormErrors;
    // icon?: IconProp;
    label: string;
}

export const CheckBox = ({
    class: _class,
    id,
    label,
    name,
    ...rest
}: Properties) => {
    return (
        <div class={_class}>
            <div class="flex items-center">
                <input
                    class="h-5 w-5 rounded border-2 border-gray-400 text-yellow-950 focus:ring-yellow-950"
                    id={id || name}
                    name={name}
                    type="checkbox"
                    {...rest}
                />

                <label for={id || name} class="ml-3 block font-medium text-sm text-gray-900">
                    {label}
                </label>
            </div>
        </div>
    );
};
