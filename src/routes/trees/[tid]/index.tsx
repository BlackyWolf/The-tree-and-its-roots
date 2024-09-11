import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import { H, Icon, Input } from "~components";
import { AppState, getTree, Tree } from "~data";
import { Dialog, DialogShow, Form } from "~islands";

interface PageData {
    tree?: Tree;
}

export const handler: Handlers<PageData, AppState> = {
    async GET(_request, context) {
        const { user } = context.state;
        const { tid } = context.params;

        const tree = await getTree(user.id, BigInt(tid));

        return context.render({ tree });
    }
};

export default function GetTree({ data }: PageProps<PageData, AppState>) {
    const showNewMemberForm = useSignal(true);

    const { tree } = data;

    return (
        <>
            <H size="1" class="font-cursive text-yellow-950/80">{tree?.name}</H>

            <div class="my-6">
                <DialogShow
                    class="bg-white font-semibold border-2 rounded border-emerald-600 pl-1 text-sm pr-6 py-1 hover:bg-amber-950/10 flex items-center"
                    show={showNewMemberForm}
                >
                    <Icon name="add" class="mr-4" />
                    New Member
                </DialogShow>
            </div>

            <Dialog show={showNewMemberForm}>
                <Form method="POST" api="/api/members">
                    <Input name="name" label="Name" required />
                    <Input type="number" name="birthYear" label="Born" required />

                    <button type="submit">Add</button>
                </Form>
            </Dialog>
        </>
    );
}
