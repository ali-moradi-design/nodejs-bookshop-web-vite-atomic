import { useQuery } from '@tanstack/react-query';
import { reportKeys, fetchIssues } from '@/lib/report/report-api';

export function useIssuesQuery() {
  return useQuery({
    queryKey: reportKeys.issues(),
    queryFn: async () => (await fetchIssues()).data,
  });
}
