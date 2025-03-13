export type CollectPointType = 'collect_point' | 'purchase_point' | 'repairer';

export interface CollectPoint {
  id: number;
  name: string;
  address: string;
  url_location: string;
  phone_number: string;
  city_id: number;
  type: CollectPointType;
  city: string;
  supported_devices?: string[];
}
