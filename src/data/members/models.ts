import { array, bigint, enums, Infer, integer, object, omit, optional, string } from "@superstruct/core";

export const ParentRelationship = enums(["father", "mother"]);
export type ParentRelationship = Infer<typeof ParentRelationship>;

export const SpouseRelationship = enums(["husband", "wife"]);
export type SpouseRelationship = Infer<typeof SpouseRelationship>;

export const SqlMember = object({
    id: bigint(),
    name: string(),
    description: optional(string()),
    birth_year: optional(integer()),
    death_year: optional(integer()),
    alt_names: optional(array(string())),
    parent_id: optional(bigint()),
    parent_relationship: optional(ParentRelationship),
    spouse_id: optional(bigint()),
    spouse_relationship: optional(SpouseRelationship),
    tree_id: bigint(),
});
export type SqlMember = Infer<typeof SqlMember>;

export const Member = object({
    id: bigint(),
    name: string(),
    description: optional(string()),
    birthYear: optional(integer()),
    deathYear: optional(integer()),
    altNames: optional(array(string())),
    parentId: optional(bigint()),
    parentRelationship: optional(ParentRelationship),
    spouseId: optional(bigint()),
    spouseRelationship: optional(SpouseRelationship),
    treeId: bigint(),
});
export type Member = Infer<typeof Member>;

export const NewMember = omit(Member, ["id"]);
export type NewMember = Infer<typeof NewMember>;



export const BulkMemberInsert = object({
    names: array(string()),
    parentId: bigint(),
    parentRelationship: ParentRelationship,
    treeId: bigint(),
});
export type BulkMemberInsert = Infer<typeof BulkMemberInsert>;
