import { FreshContext, Handlers } from "$fresh/server.ts";
import { CheckBox, ErrorMessage, H, Input, TextArea } from "~components";
import { assertFormData, FormResult, isFormRequest } from "~utils";
import { addTree, AppState, getTree, UpdateTree } from "~data";

export const handler: Handlers<unknown, AppState> = {
    GET: async (_request, context) => await context.render({ errors: {}, formData: {} }),
    async POST(request, context) {
        if (!isFormRequest(request)) return new Response(null, { status: 404 });

        const { errors, model } = assertFormData(await request.formData(), UpdateTree);

        if (Object.keys(errors).length > 0) {
            return await context.render({ errors, formData: model });
        }

        const tree = await updateTree({ ...model, userId: context.state.user.id });

        return new Response(null, {
            headers: {
                Location: `/trees/${tree.id}`,
            },
            status: 303,
        });
    },
};

export default async function (_request: Request, context: FreshContext<AppState, FormResult<UpdateTree>>) {
    const { user } = context.state;
    const { tid } = context.params;
    const { errors, formData } = context.data;

    const tree = await getTree(user.id, BigInt(tid));

    return (
        <form method="POST" class="m-auto bg-white border-4 border-yellow-950 rounded p-8 space-y-6 md:min-w-[600px]">
            <H size="1">Edit Tree</H>

            <ErrorMessage errors={errors} name="_" class="font-medium text-sm" alert />

            <Input
                autocomplete="name"
                defaultValue={formData.name || tree.name}
                label="Name"
                name="name"
                required
            />

            <CheckBox
                defaultChecked={formData.public || tree.public}
                label="Public"
                name="public"
            />

            <TextArea
                defaultValue={formData.description || tree.description}
                label="Description"
                name="description"
            />

            <div class="flex items-center justify-between">
                <button type="submit" class="font-semibold bg-amber-700 px-4 py-2 rounded text-white hover:bg-yellow-900">
                    Submit
                </button>

                <a href="/" class="text-blue-700 font-semibold underline hover:no-underline">
                    Cancel
                </a>
            </div>
        </form>
    );
}
