import { getCookies } from "@std/http";
import { decodeBase64Url } from "@std/encoding";
import { MiddlewareHandler } from "$fresh/server.ts";
import { isStaticContent } from "~utils";

function isAuthPath(url: string) {
    const requestUrl = new URL(url);

    return requestUrl.pathname.startsWith("/auth");
}

// Middleware is FILO, first in, last out
export const handler: MiddlewareHandler[] = [
    function checkAuth(request, context) {
        if (isStaticContent(request.url)) return context.next();

        const cookies = getCookies(request.headers);

        if (!cookies["auth"] && !isAuthPath(request.url)) {
            return new Response(null, {
                headers: {
                    "Location": "/auth/login",
                },
                status: 302
            });
        }

        if (cookies["auth"]) {
            const json = new TextDecoder().decode(decodeBase64Url(cookies["auth"]));

            context.state.user = JSON.parse(json);
        }

        return context.next();
    },
];
