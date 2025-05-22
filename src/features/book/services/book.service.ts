import api from '@/api/axios';
import type { IBookQuery } from '@/types/interfaces/book.interface';

export const getBooks = async (params: IBookQuery) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  });

  const response = await api.get(`/books?${query.toString()}`);
  return response.data;
};