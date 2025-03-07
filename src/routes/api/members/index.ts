import { Handlers } from "$fresh/server.ts";
import { addMember, AppState, NewMember } from "~data";
import { assertJson, isJsonRequest } from "~utils";

export const handler: Handlers<unknown, AppState> = {
    async POST(request, _context) {
        if (!isJsonRequest(request)) return new Response(null, { status: 404 });

        const { user } = _context.state;

        const member = await request.json();

        const { errors, model } = assertJson({
            ...member,
            birthYear: member.birthYear || member.birthYear === 0 ? parseInt(member.birthYear) : undefined,
            deathYear: member.deathYear ? parseInt(member.deathYear) : undefined,
            parentId: member.parentId ? BigInt(member.parentId) : undefined,
            parentRelationship: member.parentRelationship || undefined,
            spouseId: member.spouseId ? BigInt(member.spouseId) : undefined,
            spouseRelationship: member.spouseRelationship || undefined,
            treeId: BigInt(member.treeId),
        }, NewMember);

        if (Object.keys(errors).length > 0) {
            return new Response(JSON.stringify({ errors, formData: model }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400,
            });
        }

        await addMember(user.id, model);

        return new Response(null, {
            status: 200
        });
    }
};
