import { LoginUser, NewUser, useDb, User } from "~data";
import { hashPassword, verifyPassword } from "~utils";

export async function addUser(newUser: NewUser): Promise<User> {
    const db = await useDb();

    const user: User = {
        ...newUser,
        createdAt: new Date(),
        enabled: true,
        id: crypto.randomUUID(),
        password: await hashPassword(newUser.password)
    };

    db.queryObject(
        "INSERT INTO users (id, username, password, email, name, enabled, created_at"
        + "VALUES ($ID, $USERNAME, $PASSWORD, $EMAIL, $NAME, $ENABLED, $CREATED_AT)",
        {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            name: user.name,
            enabled: user.enabled,
            created_at: user.createdAt
        }
    );

    return user;
}

export async function verifyUserCredentials({ password, username }: LoginUser): Promise<User | undefined> {
    const db = await useDb();

    const result = await db.queryObject<User>(
        "SELECT * FROM users WHERE username = $USERNAME LIMIT 1",
        { username, }
    );

    if (!result?.rowCount) return;

    const user = result.rows[0];

    const verifiedPassword = await verifyPassword(user.password, password);

    if (!verifiedPassword) return;

    return user;
}
