import { useQuery } from '@tanstack/react-query';
import { reportKeys, fetchOrdersByStatus } from '@/lib/report/report-api';

export function useOrdersByStatusQuery() {
  return useQuery({
    queryKey: reportKeys.ordersByStatus(),
    queryFn: async () => (await fetchOrdersByStatus()).data,
  });
}
