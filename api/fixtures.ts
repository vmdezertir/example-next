import axios from 'axios';

export const getDayFixtures = async () => {
  const { data } = await axios.get('/api/proxy/fixtures?date=2024-06-27');
  return data;
};
