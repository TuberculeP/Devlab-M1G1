export const GET_ADMIN_USERS_QUERY = `SELECT * FROM users`;

export const UPDATE_ADMIN_PASSWORD_QUERY = `UPDATE users SET password = $1 WHERE id = $2`;

export const CREATE_ADMIN_USER_QUERY = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
