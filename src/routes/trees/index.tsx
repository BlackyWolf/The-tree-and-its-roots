import { FreshContext } from "$fresh/server.ts";
import { Badge, H, Icon } from "~components";
import { AppState, getTrees } from "~data";

export default async function Trees(_request: Request, context: FreshContext<AppState>) {
    const { user } = context.state;

    const trees = await getTrees(user.id);

    return (
        <>
            <H size="1" class="font-cursive text-yellow-950/80">Trees</H>

            <ul class="mt-6 space-y-2">
                {trees.map((tree) => (
                    <li class="bg-white rounded border-2 border-yellow-950 px-4 py-2 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 lg:grid-cols-16 items-center">
                        <div>
                            <Badge color={tree.public ? "black" : "amber"}>
                                {tree.public ? "public" : "private"}
                            </Badge>
                        </div>

                        <a href={`/trees/${tree.id}`} class="text-lg font-medium underline font-cursive sm:col-span-4 md:col-span-9 lg:col-span-14">
                            {tree.name}
                        </a>

                        <div class="flex">
                            <a href={`/trees/${tree.id}/delete`} class="ml-auto">
                                <Icon name="delete" />
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
