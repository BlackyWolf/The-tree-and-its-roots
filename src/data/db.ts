import { Client } from "postgres";
import { dbUrl } from "~utils";

let db: Client;

export async function useDb() {
    if (db) {
        if (!db.connected) await db.connect();

        return db;
    }

    db = new Client(dbUrl());

    await db.connect();

    return db;
}
