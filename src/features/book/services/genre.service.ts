import api from '@/api/axios';

export const getGenres = async () => {
  const res = await api.get('/genres');
  return res.data;
};