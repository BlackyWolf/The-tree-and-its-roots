import { Handlers } from "$fresh/server.ts";
import { addMembers, AppState, BulkMemberInsert } from "~data";
import { assertJson, isJsonRequest } from "~utils";

export const handler: Handlers<unknown, AppState> = {
    async POST(request, _context) {
        if (!isJsonRequest(request)) return new Response(null, { status: 404 });

        const { user } = _context.state;

        const bulkInsert = await request.json();

        const { errors, model } = assertJson({
            ...bulkInsert,
            treeId: BigInt(bulkInsert.treeId),
            parentId: BigInt(bulkInsert.parentId),
        }, BulkMemberInsert);

        if (Object.keys(errors).length > 0) {
            return new Response(JSON.stringify({ errors, formData: model }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400,
            });
        }

        await addMembers(user.id, model);

        return new Response(null, {
            status: 200
        });
    }
};
