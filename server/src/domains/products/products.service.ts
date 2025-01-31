import { pg } from "../../config/db.config";
import { GET_PRODUCT_FROM_DIGEST_ID_QUERY } from "./products.query";
import type { PgProduct } from "../../../../types/products";

const getProductFromDigestId = async (digestId: string) => {
  const { rows } = await pg.query<PgProduct>(GET_PRODUCT_FROM_DIGEST_ID_QUERY, [
    digestId,
  ]);
  return rows[0];
};

export { getProductFromDigestId };
