export const GET_PRODUCT_FROM_DIGEST_ID_QUERY = `
    SELECT *,
    products.name as product_name,
    collect_points.name as collect_point_name,
    products.description as product_description,
    collect_points.description as collect_point_description
    FROM products
    JOIN collect_points
    ON products.collect_point = collect_points.id 
    WHERE digest_id = $1
    AND status != 'recycled';
`;
