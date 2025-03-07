import { formDataToObject } from "@blackywolf/formdata-to-object";
import { ComponentChildren } from "preact";

interface Properties {
    api: string;
    children: ComponentChildren;
    class?: string;
    method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
}

export const Form = ({
    api,
    children,
    class: _class,
    method = "GET",
}: Properties) => {
    async function handleSubmit(event: Event) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const data = formDataToObject(formData);

        await fetch(api, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            method,
        });

        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit} class={_class}>
            {children}
        </form>
    );
};
