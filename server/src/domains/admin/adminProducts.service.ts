import { pg } from "../../config/db.config";
import { PgProduct } from "../../../../types/products";
import { UPDATE_PRODUCT_STATUS_QUERY } from "./adminProducts.query";

export async function updateProductStatus(id: string, status: string) {
  console.log(
    "\x1b[44m%s\x1b[0m",
    "server/src/domains/admin/adminProducts.service.ts:6 status, id",
    status,
    id
  );
  const result = await pg.query<PgProduct>(UPDATE_PRODUCT_STATUS_QUERY, [
    status,
    id,
  ]);
  console.log(
    "\x1b[44m%s\x1b[0m",
    "server/src/domains/admin/adminProducts.service.ts:10 result",
    result
  );
  return result.rows[0];
}
