import { pg } from "../../config/db.config";
import { PgUser } from "../../../../types/users";
import {
  GET_ADMIN_USERS_QUERY,
  UPDATE_ADMIN_PASSWORD_QUERY,
  CREATE_ADMIN_USER_QUERY,
} from "./adminUsers.query";
import { createHash } from "crypto";

async function getAdminUsers() {
  const { rows } = await pg.query<PgUser>(GET_ADMIN_USERS_QUERY);
  return rows;
}

async function updatePassword(user_id: string, password: string) {
  const encryptedPassword = createHash("sha256").update(password).digest("hex");
  await pg.query<PgUser>(UPDATE_ADMIN_PASSWORD_QUERY, [
    encryptedPassword,
    user_id,
  ]);
}

async function createUser(first_name: string, last_name: string, email: string, password: string) {
  const encryptedPassword = createHash("sha256").update(password).digest("hex");
  const { rows } = await pg.query<PgUser>(CREATE_ADMIN_USER_QUERY, [
    first_name,
    last_name,
    email,
    encryptedPassword,
  ]);
  return rows[0];
}

export { getAdminUsers, updatePassword, createUser };
