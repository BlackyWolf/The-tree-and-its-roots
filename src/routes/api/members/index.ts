import { Handlers } from "$fresh/server.ts";
import { isJsonRequest } from "~utils";

export const handler: Handlers = {
    async POST(request, _context) {
        if (!isJsonRequest(request)) return new Response(null, { status: 404 });

        const member = await request.json();

        console.log(member);

        return new Response(null, {
            status: 200
        });
    }
};
