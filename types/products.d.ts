export interface PgProduct {
  id: string;
  digest_id?: string;
  name: string;
  description: string;
  collect_point: string;
  collect_point_name: string;
  collect_point_description: string;
  customer_email?: string;
  customer_mail?: string;
  picture_url?: string;
  status:
    | "recovered" // Récupéré par le point de collecte
    | "collected" // Récupéré par Emaeus
    | "recycled"; // Recyclé par Emaeus
}
