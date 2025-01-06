import { Profile } from "passport";
import { pg } from "../../config/db.config";
import type { PgUser } from "../../../../types/users";
import { createHash } from "node:crypto";

async function findOrCreateGoogleUser(profile: Profile): Promise<PgUser> {
  // check if user exists
  const { rows } = await pg.query<PgUser>(`SELECT * FROM users WHERE $ = $1`, [
    profile.id,
  ]);
  if (rows.length && rows[0]?.google_id === profile.id) {
    return rows[0];
  }
  // else create one from profile with display name as pseudo
  const { id, name, photos } = profile;
  const { familyName, givenName } = name || {};
  const { value: picture_url } = photos?.[0] || { value: null };
  const { rows: newRows } = await pg.query<PgUser>(
    `INSERT INTO users (google_id, first_name, last_name, picture_url) VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, givenName, familyName, picture_url]
  );
  return newRows[0];
}

async function findLocalUser(params: {
  email: string;
  password: string;
}): Promise<PgUser | false> {
  const { email, password } = params;
  if (!email) throw new Error("Invalid email");
  if (!password) throw new Error("Invalid password");
  const { rows } = await pg.query<PgUser>(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  if (rows.length) {
    const hashedPassword = createHash("sha256").update(password).digest("hex");
    if (rows[0].password === hashedPassword) {
      return rows[0];
    } else {
      throw new Error("Invalid password");
    }
  } else {
    return false;
  }
}

async function findById(id: string): Promise<PgUser> {
  const { rows } = await pg.query<PgUser>(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

const usersService = { findOrCreateGoogleUser, findById, findLocalUser };

export default usersService;
