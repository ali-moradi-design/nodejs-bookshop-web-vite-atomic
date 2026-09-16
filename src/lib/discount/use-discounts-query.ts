import { useQuery } from '@tanstack/react-query';
import { discountKeys, fetchDiscounts } from '@/lib/discount/discount-api';

export function useDiscountsQuery() {
  return useQuery({
    queryKey: discountKeys.list(),
    queryFn: async () => (await fetchDiscounts()).data,
  });
}
