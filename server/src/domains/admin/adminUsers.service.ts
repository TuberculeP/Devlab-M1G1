import { pg } from "../../config/db.config";
import { PgUser } from "../../../../types/users";
import { GET_ADMIN_USERS_QUERY } from "./adminUsers.query";

async function getAdminUsers() {
  const { rows } = await pg.query<PgUser>(GET_ADMIN_USERS_QUERY);
  return rows;
}

export { getAdminUsers };
