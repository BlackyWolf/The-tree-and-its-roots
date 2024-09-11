import { bigint, Infer, object, omit, optional, string } from "@superstruct/core";
import { CheckboxBoolean } from "~data";

export const Tree = object({
    id: bigint(),
    name: string(),
    description: optional(string()),
    public: CheckboxBoolean,
    userId: string(),
});
export type Tree = Infer<typeof Tree>;

export const NewTree = omit(Tree, ["id"]);
export type NewTree = Infer<typeof NewTree>;

export const UpdateTree = omit(Tree, ["userId"]);
export type UpdateTree = Infer<typeof UpdateTree>;
