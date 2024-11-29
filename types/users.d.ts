export interface PgUser {
  id: string;
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture_url?: string;
}

export interface LoginDataUser {
  email: string,
  password: string
}