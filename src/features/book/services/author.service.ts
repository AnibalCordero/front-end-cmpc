import api from '@/api/axios';

export const getAuthors = async () => {
  const res = await api.get('/authors');
  return res.data;
};