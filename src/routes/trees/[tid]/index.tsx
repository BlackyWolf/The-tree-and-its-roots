import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import { H, Icon, Input, TextArea } from "~components";
import { AppState, getTree, getTreeMembers, Member, Tree } from "~data";
import { Dialog, DialogShow, Form, MemberRelationship, Tags } from "~islands";
import { Lord } from "../../../components/Lord.tsx";

const parentRelationships = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
];

const spouseRelationships = [
    { value: "husband", label: "Husband" },
    { value: "wife", label: "Wife" },
];

interface PageData {
    members: Member[];
    tree?: Tree;
}

export const handler: Handlers<PageData, AppState> = {
    async GET(_request, context) {
        const { user } = context.state;
        const { tid } = context.params;

        const tree = await getTree(user.id, BigInt(tid));

        const members = await getTreeMembers(user.id, BigInt(tid)) || [];

        return context.render({ members, tree });
    }
};

function getAge(member: Member) {
    const birthYearMissing = member.birthYear === undefined || member.birthYear === null;
    const deathYearMissing = member.deathYear === undefined || member.deathYear === null;

    if (birthYearMissing || deathYearMissing) return "";

    return `{${member.deathYear! - member.birthYear!}y}`;
}

function getBirthDeath(member: Member) {
    const birthYearMissing = member.birthYear === undefined || member.birthYear === null;
    const deathYearMissing = member.deathYear === undefined || member.deathYear === null;

    if (birthYearMissing && deathYearMissing) return "";

    if (member.birthYear && deathYearMissing) return `(${member.birthYear} - ?)`;
    if (birthYearMissing && member.deathYear) return `(? - ${member.deathYear})`;

    return `(${member.birthYear} - ${member.deathYear})`;
}

export default function GetTree({ data }: PageProps<PageData, AppState>) {
    const showNewMemberForm = useSignal(false);
    const showBulkInsertForm = useSignal(false);

    const { members, tree } = data;

    const sortedMembers = members.toSorted(x => {
        if (x.birthYear || x.birthYear === 0) return -1;

        return 1;
    });

    const adam = members.find(m => m.birthYear === 0);

    function buildMemberList(member?: Member) {
        if (!member) return null;

        const spouses = members.filter(m => m.spouseId === member.id);
        const children = sortedMembers.filter(m => m.parentId === member.id);

        return (
            <li>
                {member.name} {getBirthDeath(member)}<sup class="font-medium">{getAge(member)}</sup> {spouses.length > 0 ? spouses.map(x => ` & ${x.name}`) : ""}

                {/* <DialogShow
                    show={showNewChildForm}
                    class="font-mono bg-green-600 text-white font-semibold border-2 border-green-700 px-1 rounded ml-2"
                >
                    +
                </DialogShow> */}

                {children.length > 0 && (
                    <ul class="pl-6 list-disc">
                        {children.map(m => buildMemberList(m))}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <>
            <H size="1" class="font-cursive text-yellow-950/80">{tree?.name}</H>

            <div class="my-6 flex items-center gap-x-6">
                <DialogShow
                    class="bg-white font-semibold border-2 rounded border-emerald-600 pl-1 text-sm pr-6 py-1 hover:bg-amber-950/10 flex items-center"
                    show={showNewMemberForm}
                >
                    <Icon name="add" class="mr-4" />
                    New Member
                </DialogShow>
                <DialogShow
                    class="bg-white font-semibold border-2 rounded border-indigo-600 pl-1 text-sm pr-6 py-1 hover:bg-amber-950/10 flex items-center"
                    show={showBulkInsertForm}
                >
                    <Icon name="add" class="mr-4" />
                    Bulk Insert
                </DialogShow>
            </div>

            <Dialog show={showNewMemberForm}>
                <Form method="POST" api="/api/members" class="space-y-6 min-w-96 max-w-xl">
                    <Input name="name" label="Name" required />

                    <TextArea name="description" label="About" />

                    <div class="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="-2681 or 75" name="birthYear" label="Born" />
                        <Input type="number" placeholder="-2606 or 121" name="deathYear" label="Death" />
                    </div>

                    <Tags name="altNames" label="Alternative Names" />

                    <div class="grid grid-cols-2 items-start gap-4">
                        <MemberRelationship name="parent" label="Parent" members={members} relationships={parentRelationships} />
                        <MemberRelationship name="spouse" label="Spouse" members={members} relationships={spouseRelationships} />
                    </div>

                    <div>
                        <input type="hidden" name="treeId" value={tree?.id.toString()} />

                        <button type="submit" class="bg-yellow-950 text-white font-semibold hover:bg-yellow-700 rounded px-4 py-2">
                            Add
                        </button>
                    </div>
                </Form>
            </Dialog>

            <p class="mb-6">Adam's Father was The <Lord /> God Almighty.</p>

            <ul class="pl-6 list-disc max-h-[950px] bg-white/70 border-y-4 border-yellow-950 overflow-auto">
                {buildMemberList(adam)}
            </ul>

            <Dialog show={showBulkInsertForm}>
                <Form method="POST" api="/api/members/bulk" class="space-y-6 min-w-96 max-w-xl">
                    <Tags name="names" label="Names" />

                    <MemberRelationship name="parent" label="Parent" members={members} relationships={parentRelationships} />

                    <div>
                        <input type="hidden" name="treeId" value={tree?.id.toString()} />

                        <button type="submit" class="bg-yellow-950 text-white font-semibold hover:bg-yellow-700 rounded px-4 py-2">
                            Add
                        </button>
                    </div>
                </Form>
            </Dialog>
        </>
    );
}
