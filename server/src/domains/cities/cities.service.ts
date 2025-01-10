import { pg } from "../../config/db.config";

export interface City {
  id: number;
  name: string;
  coordinates: string;
}

async function getAllCities(): Promise<City[]> {
  const { rows } = await pg.query<City>(
    'SELECT * FROM cities ORDER BY name ASC'
  );
  return rows;
}

async function getCityById(id: number): Promise<City | null> {
  const { rows } = await pg.query<City>(
    'SELECT * FROM cities WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function createCity(data: Omit<City, 'id'>): Promise<City> {
  const { rows } = await pg.query<City>(
    'INSERT INTO cities (name, coordinates) VALUES ($1, $2) RETURNING *',
    [data.name, data.coordinates]
  );
  return rows[0];
}

async function updateCity(id: number, data: Partial<Omit<City, 'id'>>): Promise<City | null> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(data.name);
    paramCount++;
  }
  if (data.coordinates !== undefined) {
    updates.push(`coordinates = $${paramCount}`);
    values.push(data.coordinates);
    paramCount++;
  }

  if (updates.length === 0) return null;

  values.push(id);
  const { rows } = await pg.query<City>(
    `UPDATE cities SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function deleteCity(id: number): Promise<boolean> {
  const { rowCount } = await pg.query(
    'DELETE FROM cities WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}

const citiesService = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
};

export default citiesService;
