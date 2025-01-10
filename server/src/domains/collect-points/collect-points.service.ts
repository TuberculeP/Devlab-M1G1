import { pg } from "../../config/db.config";
import { CollectPoint, CollectPointInput, CollectPointType } from "../../types/collect-points.types";

interface GetAllParams {
  type?: CollectPointType;
  cityId?: number;
  page?: number;
  limit?: number;
}

async function getAll(params: GetAllParams = {}): Promise<{ data: CollectPoint[]; total: number }> {
  const { type, cityId, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const queryParams: any[] = [];
  let whereClause = '';

  if (type) {
    queryParams.push(type);
    whereClause += ` WHERE type = $${queryParams.length}`;
  }
  if (cityId) {
    queryParams.push(cityId);
    whereClause += whereClause ? ' AND' : ' WHERE';
    whereClause += ` city_id = $${queryParams.length}`;
  }

  queryParams.push(limit, offset);
  const query = `
    SELECT * FROM collect_points${whereClause}
    LIMIT $${queryParams.length - 1}
    OFFSET $${queryParams.length}
  `;

  const countQuery = `
    SELECT COUNT(*) FROM collect_points${whereClause}
  `;

  const [{ rows }, { rows: countRows }] = await Promise.all([
    pg.query<CollectPoint>(query, queryParams),
    pg.query<{ count: string }>(countQuery, queryParams.slice(0, -2))
  ]);

  return {
    data: rows,
    total: parseInt(countRows[0]?.count || '0'),
  };
}

async function getById(id: number): Promise<CollectPoint | null> {
  const { rows } = await pg.query<CollectPoint>(
    'SELECT * FROM collect_points WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function create(data: CollectPointInput): Promise<CollectPoint> {
  const { rows } = await pg.query<CollectPoint>(
    `INSERT INTO collect_points (
      name,
      address,
      city_id,
      phone_number,
      url_location,
      type
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      data.name,
      data.address,
      data.city_id,
      data.phone_number,
      data.url_location,
      data.type
    ]
  );
  return rows[0];
}

async function update(id: number, data: Partial<CollectPointInput>): Promise<CollectPoint | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(data.name);
    paramCount++;
  }
  if (data.address !== undefined) {
    updates.push(`address = $${paramCount}`);
    values.push(data.address);
    paramCount++;
  }
  if (data.city_id !== undefined) {
    updates.push(`city_id = $${paramCount}`);
    values.push(data.city_id);
    paramCount++;
  }
  if (data.phone_number !== undefined) {
    updates.push(`phone_number = $${paramCount}`);
    values.push(data.phone_number);
    paramCount++;
  }
  if (data.url_location !== undefined) {
    updates.push(`url_location = $${paramCount}`);
    values.push(data.url_location);
    paramCount++;
  }
  if (data.type !== undefined) {
    updates.push(`type = $${paramCount}`);
    values.push(data.type);
    paramCount++;
  }

  if (updates.length === 0) return null;

  values.push(id);
  const { rows } = await pg.query<CollectPoint>(
    `UPDATE collect_points SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function remove(id: number): Promise<boolean> {
  const { rowCount } = await pg.query(
    'DELETE FROM collect_points WHERE id = $1',
    [id]
  );
  return (rowCount ?? 0) > 0;
}

const collectPointsService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default collectPointsService;
