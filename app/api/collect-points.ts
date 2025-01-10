import { CollectPoint } from '@/types/collect-points';

export async function getCollectPoints(params?: {
  type?: 'collect_point' | 'purchase_point' | 'repairer';
  cityId?: number;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.type) searchParams.append('type', params.type);
  if (params?.cityId) searchParams.append('cityId', params.cityId.toString());
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());

  const response = await fetch(`/api/collect-points?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch collect points');
  }
  return response.json() as Promise<{ data: CollectPoint[]; total: number }>;
}
