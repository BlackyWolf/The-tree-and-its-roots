import { Handlers, PageProps } from "$fresh/server.ts";
import { CheckBox, ErrorMessage, H, Input, TextArea } from "~components";
import { assertFormData, FormResult, isFormRequest } from "~utils";
import { addTree, AppState, NewTree } from "~data";
import { Infer, omit } from "@superstruct/core";

const NewTreeRequest = omit(NewTree, ["userId"]);
export type NewTreeRequest = Infer<typeof NewTreeRequest>;

export const handler: Handlers<unknown, AppState> = {
    GET: async (_request, context) => await context.render({ errors: {}, formData: {} }),
    async POST(request, context) {
        if (!isFormRequest(request)) return new Response(null, { status: 404 });

        const { errors, model } = assertFormData(await request.formData(), NewTreeRequest);

        if (Object.keys(errors).length > 0) {
            return await context.render({ errors, formData: model });
        }

        const tree = await addTree({ ...model, userId: context.state.user.id });

        return new Response(null, {
            headers: {
                Location: `/trees/${tree.id}`,
            },
            status: 303,
        });
    },
};

export default function ({ data }: PageProps<FormResult<NewTree>>) {
    const { errors, formData } = data;

    return (
        <form method="POST" class="m-auto bg-white border-4 border-yellow-950 rounded p-8 space-y-6 md:min-w-[600px]">
            <H size="1">New Tree</H>

            <ErrorMessage errors={errors} name="_" class="font-medium text-sm" alert />

            <Input
                autocomplete="name"
                defaultValue={formData.name}
                label="Name"
                name="name"
                required
            />

            <CheckBox
                label="Public"
                name="public"
            />

            <TextArea
                defaultValue={formData.description}
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
