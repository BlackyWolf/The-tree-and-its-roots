import { assign, boolean, date, defaulted, Infer, object, omit, optional, pick, string } from "@superstruct/core";

export const User = object({
    id: string(),
    username: string(),
    password: string(),
    email: optional(string()),
    name: optional(string()),
    enabled: defaulted(boolean(), true),
    createdAt: date(),
});
export type User = Infer<typeof User>;

export const NewUser = assign(
    omit(User, ["createdAt", "enabled", "id"]),
    object({ confirmPassword: string() })
);
export type NewUser = Infer<typeof NewUser>;

export const UpdateUser = omit(User, ["createdAt", "password"]);
export type UpdateUser = Infer<typeof UpdateUser>;

export const SessionUser = pick(User, ["enabled", "id", "username"]);
export type SessionUser = Infer<typeof SessionUser>;

export const LoginUser = pick(User, ["password", "username"]);
export type LoginUser = Infer<typeof LoginUser>;
