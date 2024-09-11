import { FormErrors, joinCss } from "~utils";
import { Alert } from "~components";

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
