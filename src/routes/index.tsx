import { Icon } from "~components";

export default function Home() {
    return (
        <div class="m-auto">
            <nav class="flex flex-col gap-y-2 font-semibold text-sm">
                <a href="/trees/new" class="flex items-center gap-x-4 bg-white pl-1 pr-6 py-1 rounded border-2 border-yellow-950 hover:bg-amber-950/10">
                    <Icon name="add" />

                    New family tree
                </a>
                <a href="/trees" class="flex items-center gap-x-4 bg-white pl-1 pr-6 py-1 rounded border-2 border-yellow-950 hover:bg-amber-950/10">
                    <Icon name="network-tree" />

                    View all trees
                </a>
                <a href="/settings" class="flex items-center gap-x-4 bg-white pl-1 pr-6 py-1 rounded border-2 border-yellow-950 hover:bg-amber-950/10">
                    <Icon name="setting" />

                    Settings
                </a>
            </nav>
        </div>
    );
}
