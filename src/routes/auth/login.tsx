import { encodeBase64Url } from "@std/encoding";
import { setCookie } from "@std/http";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ErrorMessage, H, Input } from "~components";
import { appUrl, assertFormData, FormResult, isFormRequest } from "~utils";
import { LoginUser, verifyUserCredentials } from "~data";

function sanitizeData(data?: LoginUser): LoginUser {
    return {
        username: data?.username || "",
        password: "",
    };
}

export const handler: Handlers = {
    GET: async (_request, context) => await context.render({ errors: {}, formData: {} }),
    async POST(request, context) {
        if (!isFormRequest(request)) return new Response(null, { status: 404 });

        const { errors, model } = assertFormData(await request.formData(), LoginUser);

        if (Object.keys(errors).length > 0) {
            return await context.render({ errors, formData: sanitizeData(model) });
        }

        const user = await verifyUserCredentials(model);

        if (!user) {
            return await context.render({ errors: { _: "Invalid username or password" }, formData: sanitizeData(model) });
        }

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

export default function Login({ data }: PageProps<FormResult<LoginUser>>) {
    const { errors, formData } = data;

    return (
        <form method="POST" class="m-auto bg-white border-4 border-yellow-950 rounded p-8 space-y-6 md:min-w-96">
            <H size="1">Login</H>

            <ErrorMessage errors={errors} name="_" class="font-medium text-sm" alert />

            <Input
                autocomplete="username"
                defaultValue={formData.username}
                label="Username"
                name="username"
                required
            />

            <Input
                autocomplete="current-password"
                label="Password"
                name="password"
                required
                type="password"
            />

            <div class="flex items-center justify-between">
                <button type="submit" class="font-semibold bg-yellow-950 px-4 py-2 rounded text-white hover:bg-yellow-900">
                    Login
                </button>

                <a href="/auth/register" class="text-blue-700 font-semibold underline hover:no-underline">
                    Register
                </a>
            </div>
        </form>
    );
}
