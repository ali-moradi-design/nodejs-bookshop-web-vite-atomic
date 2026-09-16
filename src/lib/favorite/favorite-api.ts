import { apiDelete, apiGet, apiPost } from '@/lib/api';
import type { ApiData, ApiMessage } from '@/lib/api';
import type { Favorite } from './types';

export const favoriteKeys = {
  all: ['favorites'] as const,
  list: () => [...favoriteKeys.all, 'list'] as const,
};

export const fetchFavorites = () => apiGet<ApiData<Favorite[]>>('/favorites');

export const addFavorite = (bookId: string) => apiPost<ApiData<Favorite>>('/favorites', { bookId });

export const removeFavorite = (bookId: string) => apiDelete<ApiMessage>(`/favorites/${bookId}`);
