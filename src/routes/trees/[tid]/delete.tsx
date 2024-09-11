import { Handlers, PageProps } from "$fresh/server.ts";
import { H } from "~components";
import { AppState, deleteTree, getTree, Tree } from "~data";

interface PageData {
    tree: Tree;
}

export const handler: Handlers<PageData, AppState> = {
    async GET(_request, context) {
        const { user } = context.state;
        const { tid } = context.params;

        if (!user.id || !tid) return new Response(null, { status: 404 });

        const tree = await getTree(user.id, BigInt(tid));

        return context.render({ tree });
    },
    async POST(_request, context) {
        const { user } = context.state;
        const { tid } = context.params;

        if (!user.id || !tid) return new Response(null, { status: 404 });

        await deleteTree(user.id, BigInt(tid));

        return new Response(null, {
            headers: { location: "/trees" },
            status: 301,
        });
    }
};

export default function DeleteTree({ data }: PageProps<PageData>) {
    const { tree } = data;

    return (
        <>
            <H size="1" class="font-cursive text-yellow-950/80">
                Delete <span class="underline">{tree?.name}</span>
            </H>

            <form method="POST" class="my-6">
                <button class="bg-white border-2 border-red-600 text-red-600 hover:ring-2 hover:ring-red-400 hover:ring-inset hover:underline font-medium rounded px-4 py-2">
                    Confirm
                </button>
            </form>
        </>
    );
}
