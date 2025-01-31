export const UPDATE_PRODUCT_STATUS_QUERY = `
    UPDATE products
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `;
