import { defineLayout } from "$fresh/server.ts";
import { AppState, Tree } from "~data";
import { Icon } from "~components";
import { getTreeNames } from "~data";
import { TreeNamesSelect } from "~islands";

export default defineLayout<AppState>(async (_request, context) => {
    const Component = context.Component;
    const { user } = context.state;
    const { tid } = context.params;

    const trees: Tree[] = user?.id ? await getTreeNames(user.id) : [];

    return (
        <div class="flex flex-col flex-grow">
            <header class="bg-yellow-950 px-8 border-b-4 border-yellow-700">
                <nav class="text-white flex items-stretch">
                    {user?.id ? (
                        <>
                            <a href="/" class="font-semibold text-sm font-mono uppercase py-2 px-4 hover:underline hover:bg-white/10 flex items-center mr-6">
                                Main Menu
                            </a>

                            <TreeNamesSelect trees={trees} selected={tid ? BigInt(tid) : undefined} />

                            <span class="bg-white text-black px-1 font-medium ml-auto flex items-center border-x-2 border-yellow-700">
                                <Icon name="user" />
                            </span>
                            <span class="bg-amber-100 text-black px-6 font-medium flex items-center border-r-2 border-yellow-700">
                                {user.username}
                            </span>
                        </>
                    ) : (
                        <>
                            <a href="/auth/login" class="font-semibold text-sm font-mono uppercase py-2 px-4 hover:underline hover:bg-white/10 flex items-center">
                                Login
                            </a>
                            <a href="/auth/register" class="font-semibold text-sm font-mono uppercase py-2 px-4 hover:underline hover:bg-white/10 flex items-center">
                                Register
                            </a>
                        </>
                    )}
                </nav>
            </header>

            <div class="flex flex-col flex-grow bg-grid-lines-dark overflow-auto p-4">
                <Component />
            </div>

            <footer class="bg-yellow-950 px-8 border-t-4 border-yellow-700">
                <p class="text-white text-xs font-semibold py-1">Copyright &copy; BlackyWolf. All rights reserved.</p>
            </footer>
        </div>
    );
});
