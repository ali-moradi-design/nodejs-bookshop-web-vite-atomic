import { useQuery } from '@tanstack/react-query';
import { orderKeys, fetchOrders } from '@/lib/order/order-api';

export function useOrdersQuery() {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: async () => (await fetchOrders()).data,
  });
}
