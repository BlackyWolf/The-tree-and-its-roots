import { hash, Variant, verify } from "@felix/argon2";
import { encodeBase64 } from "@std/encoding";
import { hashLength, /*hashSecret,*/ iterations, memoryCost, parallelism } from "~utils";

let csrfKey: CryptoKey;

export async function generateCsrfToken(userId: string): Promise<string> {
    if (!csrfKey) {
        csrfKey = await crypto.subtle.generateKey(
            { name: "HMAC", hash: "SHA-256" },
            true,
            ["sign", "verify"],
        );
    }

    const timestamp = Temporal.Now.instant().epochMilliseconds;
    const mac = timestamp + userId;
    const hmac = await crypto.subtle.sign("HMAC", csrfKey, new TextEncoder().encode(mac));

    return encodeBase64(hmac);
}

export async function hashPassword(password: string) {
    return await hash(password, {
        hashLength: hashLength(),
        lanes: parallelism(),
        memoryCost: memoryCost(),
        // secret: new TextEncoder().encode(hashSecret()),
        timeCost: iterations(),
        variant: Variant.Argon2id,
    });
}

export async function verifyPassword(hash: string, password: string) {
    // return await verify(hash, password, {
    //     secret: new TextEncoder().encode(hashSecret()),
    // });

    return await verify(hash, password);
}
