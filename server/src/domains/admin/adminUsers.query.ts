export const GET_ADMIN_USERS_QUERY = `SELECT * FROM users`;

export const UPDATE_ADMIN_PASSWORD_QUERY = `UPDATE users SET password = $1 WHERE id = $2`;
