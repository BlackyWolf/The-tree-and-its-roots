import { create, Struct, StructError } from "@superstruct/core";

export interface FormErrors {
    [key: string]: string;
}

export interface FormResult<T> {
    errors: FormErrors;
    formData: T;
}

export interface AssertResult<T> {
    model: T;
    errors: FormErrors;
}

export function assertFormData<T, S>(value: FormData, struct: Struct<T, S>): AssertResult<T> {
    const data = Object.fromEntries(value);

    try {

        return { errors: {}, model: create(data, struct) };
    } catch (error) {
        console.error(error);

        if (error instanceof StructError) {
            const failures = error.failures();

            const errors: FormErrors = {};

            for (const failure of failures) {
                errors[failure.key] = failure.message;
            }

            return { errors: {}, model: data as T };
        }

        throw error;
    }
}
