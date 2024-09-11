import { Handlers, PageProps } from "$fresh/server.ts";
import { ErrorMessage, H, Input } from "~components";
import { addUser, NewUser } from "~data";
import { appUrl, isFormRequest } from "~utils";
import { assertFormData, FormResult } from "~utils";
import { setCookie } from "@std/http";
import { encodeBase64Url } from "@std/encoding";

function sanitizeData(data?: NewUser): NewUser {
    return {
        username: data?.username || "",
        password: "",
        confirmPassword: "",
        email: data?.email,
        name: data?.name,
    };
}

export const handler: Handlers = {
    GET: async (_request, context) => await context.render({ errors: {}, formData: {} }),
    async POST(request, context) {
        if (!isFormRequest(request)) return new Response(null, { status: 404 });

        const { errors, model } = assertFormData(await request.formData(), NewUser);

        if (model.password !== model.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            return await context.render({ errors, formData: sanitizeData(model) });
        }

        const user = await addUser(model);

        const userCookieJson = JSON.stringify({ enabled: user.enabled, id: user.id, username: user.username });

        const headers: HeadersInit = new Headers({
            "Location": "/",
        });

        setCookie(headers, {
            domain: appUrl(),
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true,
            name: "auth",
            path: "/",
            sameSite: "Strict",
            value: encodeBase64Url(userCookieJson)
        });

        return new Response(null, {
            headers,
            status: 302,
        });
    },
};

export default function Register({ data }: PageProps<FormResult<NewUser>>) {
    const { errors, formData } = data;

    return (
        <form method="POST" class="m-auto bg-white border-4 border-yellow-950 rounded p-8 space-y-6 md:min-w-96">
            <H size="1">Register</H>

            <ErrorMessage errors={errors} name="_" class="font-medium text-sm" alert />

            <Input
                autocomplete="username"
                defaultValue={formData.username}
                errors={errors}
                label="Username"
                name="username"
                required
            />

            <Input
                autocomplete="new-password"
                errors={errors}
                label="Password"
                name="password"
                required
                type="password"
            />

            <Input
                autocomplete="new-password"
                errors={errors}
                label="Confirm Password"
                name="confirmPassword"
                required
                type="password"
            />

            <hr />

            <Input
                autocomplete="email"
                defaultValue={formData.email}
                errors={errors}
                label="Email"
                name="email"
            />

            <Input
                autocomplete="name"
                defaultValue={formData.name}
                errors={errors}
                label="Name"
                name="name"
            />

            <div class="flex items-center justify-between">
                <button type="submit" class="font-semibold bg-amber-700 px-4 py-2 rounded text-white hover:bg-yellow-900">
                    Register
                </button>

                <a href="/auth/login" class="text-blue-700 font-semibold underline hover:no-underline">
                    Login
                </a>
            </div>
        </form>
    );
}
