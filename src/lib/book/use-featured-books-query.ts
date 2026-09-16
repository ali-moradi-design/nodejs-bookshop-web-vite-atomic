import { useQuery } from '@tanstack/react-query';
import { bookKeys, fetchFeaturedBooks } from '@/lib/book/book-api';

export function useFeaturedBooksQuery() {
  return useQuery({
    queryKey: bookKeys.featured(),
    queryFn: async () => (await fetchFeaturedBooks()).data,
  });
}
