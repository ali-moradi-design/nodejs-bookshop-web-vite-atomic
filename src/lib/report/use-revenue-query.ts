import { useQuery } from '@tanstack/react-query';
import { reportKeys, fetchRevenue } from '@/lib/report/report-api';

export function useRevenueQuery(from?: string, to?: string) {
  return useQuery({
    queryKey: reportKeys.revenue(from, to),
    queryFn: async () => (await fetchRevenue(from, to)).data,
  });
}
