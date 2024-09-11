import { Tree } from "~data";

interface Properties {
    selected?: bigint;
    trees: Tree[];
}

export const TreeNamesSelect = ({ selected, trees }: Properties) => {
    function changeTree(event: Event) {
        const select = event.target as HTMLSelectElement;
        const id = select.value;

        if (id) window.location.href = `/trees/${id}`;
        else window.location.href = "/trees";
    }

    return (
        <select
            class="bg-white/10 border-0 font-semibold uppercase font-mono text-sm focus:ring-0 *:text-black *:font-sans *:normal-case"
            onInput={changeTree}
        >
            <option value="">Select a tree</option>
            {trees.map(({ id, name }) => (
                <option key={name} value={id as never} selected={selected === id}>
                    {name}
                </option>
            ))}
        </select>
    );
};
