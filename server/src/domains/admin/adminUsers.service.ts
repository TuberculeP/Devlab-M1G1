import { pg } from "../../config/db.config";
import { PgUser } from "../../../../types/users";
import {
  GET_ADMIN_USERS_QUERY,
  UPDATE_ADMIN_PASSWORD_QUERY,
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

export { getAdminUsers, updatePassword };
