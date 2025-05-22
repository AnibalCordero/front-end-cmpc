import api from '@/api/axios';

export const getEditorials = async () => {
  const res = await api.get('/editorials');
  return res.data;
};