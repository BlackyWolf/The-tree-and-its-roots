import { NewTree, Tree, UpdateTree, useDb } from "~data";

export async function addTree(newTree: NewTree): Promise<Tree> {
    const db = await useDb();

    const result = await db.queryObject<Tree>(
        `INSERT INTO trees (name, description, public, user_id)
        VALUES ($NAME, $DESCRIPTION, $PUBLIC, $USER_ID)
        RETURNING id`,
        {
            name: newTree.name,
            description: newTree.description,
            public: newTree.public,
            user_id: newTree.userId,
        }
    );

    return result.rows[0];
}

export async function deleteTree(userId: string, id: bigint): Promise<void> {
    const db = await useDb();

    await db.queryObject(
        "DELETE FROM trees WHERE id = $ID AND user_id = $USER_ID",
        { id, user_id: userId }
    );
}

export async function getTree(userId: string, id: bigint): Promise<Tree> {
    const db = await useDb();

    const result = await db.queryObject<Tree>(
        "SELECT * FROM trees WHERE id = $ID AND user_id = $USER_ID LIMIT 1",
        { id, user_id: userId }
    );

    return result.rows[0];
}

export async function getTrees(userId: string): Promise<Tree[]> {
    const db = await useDb();

    const result = await db.queryObject<Tree>(
        "SELECT * FROM trees WHERE user_id = $USER_ID",
        { user_id: userId }
    );

    return result.rows;
}

export async function getTreeNames(userId: string): Promise<Tree[]> {
    const db = await useDb();

    const result = await db.queryObject<Tree>(
        "SELECT id, name FROM trees WHERE user_id = $USER_ID",
        { user_id: userId }
    );

    return result.rows;
}

export async function updateTree(userId: string, updatedTree: UpdateTree): Promise<Tree> {
    const db = await useDb();

    const result = await db.queryObject<Tree>(
        "UPDATE trees "
        + "SET name = $NAME, description = $DESCRIPTION, public = $PUBLIC "
        + "WHERE id = $ID AND user_id = $USER_ID ",
        {
            id: updatedTree.id,
            name: updatedTree.name,
            description: updatedTree.description,
            public: updatedTree.public,
            user_id: userId,
        }
    );

    return result.rows[0];
}
