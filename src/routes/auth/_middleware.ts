import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";
import { getCookies } from "@std/http";
import { isStaticContent } from "~utils";

export const handler: MiddlewareHandler[] = [
    async function checkAuth(request: Request, context: FreshContext) {
        if (isStaticContent(request.url)) return context.next();

        const cookies = getCookies(request.headers);

        if (cookies["auth"]) {
            return new Response(null, {
                headers: {
                    "Location": "/",
                },
                status: 302,
            });
        }

        return await context.next();
    }
];
