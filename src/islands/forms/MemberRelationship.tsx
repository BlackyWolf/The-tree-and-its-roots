import { Member } from "~data";
import { Select } from "~components";

interface Properties {
    class?: string;
    label: string;
    members: Member[];
    name: string;
    relationships: { value: string; label: string }[];
}

export const MemberRelationship = ({
    class: _class,
    label,
    members,
    name,
    relationships,
}: Properties) => {
    function getParentName(parentId?: bigint, birthYear?: number) {
        if (birthYear === 0) return 'The Lord';

        const parent = members.find(x => x.id === parentId);

        return parent ? parent.name : '-';
    }

    return (
        <div class={_class}>
            <Select
                class="mb-2"
                label={label}
                name={name + 'Id'}
                options={members.map(x => ({
                    value: x.id.toString(),
                    label: `${x.name} [${getParentName(x.parentId, x.birthYear)}] (${x.birthYear}-${x.deathYear})`
                }))}
            />

            <Select
                label="Relationship"
                name={name + 'Relationship'}
                options={relationships}
            />
        </div>
    );
};
