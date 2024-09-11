import { boolean, coerce, defaulted, string } from "@superstruct/core";
import { SessionUser } from "~data";

export const CheckboxBoolean = coerce(defaulted(boolean(), false), string(), (value) => value === "on");

export interface AppState extends Record<string, unknown> {
    user: SessionUser;
}
