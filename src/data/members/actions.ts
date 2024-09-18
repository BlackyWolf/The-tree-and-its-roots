import { BulkMemberInsert, getTree, Member, NewMember, SqlMember, useDb } from "~data";

export async function addMember(userId: string, newMember: NewMember): Promise<Member | null> {
    const db = await useDb();

    const tree = await getTree(userId, newMember.treeId);

    if (!tree) return null;

    const result = await db.queryObject<Member>(
        `INSERT INTO members (
            name, description, birth_year, death_year, alt_names, parent_id,
            parent_relationship, spouse_id, spouse_relationship, tree_id
        ) VALUES (
            $NAME, $DESCRIPTION, $BIRTH_YEAR, $DEATH_YEAR, $ALT_NAMES, $PARENT_ID,
            $PARENT_RELATIONSHIP, $SPOUSE_ID, $SPOUSE_RELATIONSHIP, $TREE_ID
        ) RETURNING id`,
        {
            name: newMember.name,
            description: newMember.description,
            birth_year: newMember.birthYear,
            death_year: newMember.deathYear,
            alt_names: newMember.altNames,
            parent_id: newMember.parentId,
            parent_relationship: newMember.parentRelationship,
            spouse_id: newMember.spouseId,
            spouse_relationship: newMember.spouseRelationship,
            tree_id: newMember.treeId
        }
    );

    return result.rows[0];
}

export async function addMembers(userId: string, newMembers: BulkMemberInsert): Promise<void> {
    const db = await useDb();

    const tree = await getTree(userId, newMembers.treeId);

    if (!tree) return;

    let sql = `INSERT INTO members (
            name, parent_id, parent_relationship, tree_id, spouse_id
        ) VALUES `;

    for (const name of newMembers.names) {
        sql += `('${name}', ${newMembers.parentId}, '${newMembers.parentRelationship}', ${newMembers.treeId}, NULL),`;
    }

    sql = sql.slice(0, -1) + ';';

    await db.queryObject(sql);
}

export async function getTreeMembers(userId: string, treeId: bigint): Promise<Member[]> {
    const db = await useDb();

    const result = await db.queryObject<SqlMember>(
        `SELECT m.*
        FROM members m
        LEFT JOIN trees t ON t.id = m.tree_id AND t.user_id = $USER_ID
        WHERE m.tree_id = $TREE_ID`,
        {
            tree_id: treeId,
            user_id: userId
        }
    );

    return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description || undefined,
        altNames: row.alt_names || [],
        birthYear: row.birth_year || row.birth_year === 0 ? row.birth_year : undefined,
        deathYear: row.death_year || row.death_year === 0 ? row.death_year : undefined,
        parentId: row.parent_id || undefined,
        parentRelationship: row.parent_relationship || undefined,
        spouseId: row.spouse_id || undefined,
        spouseRelationship: row.spouse_relationship || undefined,
        treeId: row.tree_id
    }));
}
