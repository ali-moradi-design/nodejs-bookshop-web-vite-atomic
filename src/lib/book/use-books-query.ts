import { useQuery } from '@tanstack/react-query';
import { bookKeys, fetchBooks } from '@/lib/book/book-api';
import type { BookListParams } from '@/lib/book/types';

type Options = {
  enabled?: boolean;
};

export function useBooksQuery(params: BookListParams = {}, options: Options = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: bookKeys.list(params),
    queryFn: () => fetchBooks(params),
    enabled,
  });
}
