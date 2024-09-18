import { Alert } from "~components";
import { joinCss } from "~utils/css.ts";
import { FormErrors } from "~utils/forms.ts";

interface Properties {
    alert?: boolean;
    class?: string;
    errors?: FormErrors;
    name: string;
}

export const ErrorMessage = ({ alert, class: _class, errors, name }: Properties) => {
    if (!errors || !errors[name]) return null;

    if (!alert) {
        return <div class={joinCss("font-medium text-red-600", _class)}>
            {errors[name]}
        </div>;
    }

    return (
        <Alert color="red" class={_class}>
            {errors[name]}
        </Alert>
    );
};
