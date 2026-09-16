import { useQuery } from '@tanstack/react-query';
import { userKeys, fetchUsers } from '@/lib/user/user-api';

export function useUsersQuery() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => (await fetchUsers()).data,
  });
}
